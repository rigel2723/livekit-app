"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../logger"));
const livekit_rtc_1 = require("../../proto/livekit_rtc");
const errors_1 = require("../errors");
const events_1 = require("../events");
const LocalAudioTrack_1 = __importDefault(require("../track/LocalAudioTrack"));
const LocalTrackPublication_1 = __importDefault(require("../track/LocalTrackPublication"));
const LocalVideoTrack_1 = __importStar(require("../track/LocalVideoTrack"));
const options_1 = require("../track/options");
const Track_1 = require("../track/Track");
const utils_1 = require("../track/utils");
const Participant_1 = __importDefault(require("./Participant"));
const publishUtils_1 = require("./publishUtils");
const RemoteParticipant_1 = __importDefault(require("./RemoteParticipant"));
class LocalParticipant extends Participant_1.default {
    /** @internal */
    constructor(sid, identity, engine, options) {
        super(sid, identity);
        this.pendingPublishing = new Set();
        /** @internal */
        this.onTrackUnmuted = (track) => {
            this.onTrackMuted(track, false);
        };
        // when the local track changes in mute status, we'll notify server as such
        /** @internal */
        this.onTrackMuted = (track, muted) => {
            if (muted === undefined) {
                muted = true;
            }
            if (!track.sid) {
                logger_1.default.error('could not update mute status for unpublished track', track);
                return;
            }
            this.engine.updateMuteStatus(track.sid, muted);
        };
        this.audioTracks = new Map();
        this.videoTracks = new Map();
        this.tracks = new Map();
        this.engine = engine;
        this.roomOptions = options;
        this.engine.on(events_1.EngineEvent.RemoteMuteChanged, (trackSid, muted) => {
            const pub = this.tracks.get(trackSid);
            if (!pub || !pub.track) {
                return;
            }
            if (muted) {
                pub.mute();
            }
            else {
                pub.unmute();
            }
        });
    }
    get lastCameraError() {
        return this.cameraError;
    }
    get lastMicrophoneError() {
        return this.microphoneError;
    }
    getTrack(source) {
        const track = super.getTrack(source);
        if (track) {
            return track;
        }
    }
    getTrackByName(name) {
        const track = super.getTrackByName(name);
        if (track) {
            return track;
        }
    }
    /**
     * Enable or disable a participant's camera track.
     *
     * If a track has already published, it'll mute or unmute the track.
     */
    setCameraEnabled(enabled) {
        return this.setTrackEnabled(Track_1.Track.Source.Camera, enabled);
    }
    /**
     * Enable or disable a participant's microphone track.
     *
     * If a track has already published, it'll mute or unmute the track.
     */
    setMicrophoneEnabled(enabled) {
        return this.setTrackEnabled(Track_1.Track.Source.Microphone, enabled);
    }
    /**
     * Start or stop sharing a participant's screen
     */
    setScreenShareEnabled(enabled) {
        return this.setTrackEnabled(Track_1.Track.Source.ScreenShare, enabled);
    }
    /**
     * Enable or disable publishing for a track by source. This serves as a simple
     * way to manage the common tracks (camera, mic, or screen share)
     */
    setTrackEnabled(source, enabled) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.debug('setTrackEnabled', source, enabled);
            const track = this.getTrack(source);
            if (enabled) {
                if (track) {
                    yield track.unmute();
                }
                else {
                    let localTrack;
                    if (this.pendingPublishing.has(source)) {
                        // no-op it's already been requested
                        return;
                    }
                    this.pendingPublishing.add(source);
                    try {
                        switch (source) {
                            case Track_1.Track.Source.Camera:
                                [localTrack] = yield this.createTracks({
                                    video: true,
                                });
                                break;
                            case Track_1.Track.Source.Microphone:
                                [localTrack] = yield this.createTracks({
                                    audio: true,
                                });
                                break;
                            case Track_1.Track.Source.ScreenShare:
                                [localTrack] = yield this.createScreenTracks({ audio: false });
                                break;
                            default:
                                throw new errors_1.TrackInvalidError(source);
                        }
                        yield this.publishTrack(localTrack);
                    }
                    catch (e) {
                        if (e instanceof Error && !(e instanceof errors_1.TrackInvalidError)) {
                            this.emit(events_1.ParticipantEvent.MediaDevicesError, e);
                        }
                        throw e;
                    }
                    finally {
                        this.pendingPublishing.delete(source);
                    }
                }
            }
            else if (track && track.track) {
                // screenshare cannot be muted, unpublish instead
                if (source === Track_1.Track.Source.ScreenShare) {
                    this.unpublishTrack(track.track);
                }
                else {
                    yield track.mute();
                }
            }
        });
    }
    /**
     * Publish both camera and microphone at the same time. This is useful for
     * displaying a single Permission Dialog box to the end user.
     */
    enableCameraAndMicrophone() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.pendingPublishing.has(Track_1.Track.Source.Camera)
                || this.pendingPublishing.has(Track_1.Track.Source.Microphone)) {
                // no-op it's already been requested
                return;
            }
            this.pendingPublishing.add(Track_1.Track.Source.Camera);
            this.pendingPublishing.add(Track_1.Track.Source.Microphone);
            try {
                const tracks = yield this.createTracks({
                    audio: true,
                    video: true,
                });
                yield Promise.all(tracks.map((track) => this.publishTrack(track)));
            }
            finally {
                this.pendingPublishing.delete(Track_1.Track.Source.Camera);
                this.pendingPublishing.delete(Track_1.Track.Source.Microphone);
            }
        });
    }
    /**
     * Create local camera and/or microphone tracks
     * @param options
     * @returns
     */
    createTracks(options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const opts = utils_1.mergeDefaultOptions(options, (_a = this.roomOptions) === null || _a === void 0 ? void 0 : _a.audioCaptureDefaults, (_b = this.roomOptions) === null || _b === void 0 ? void 0 : _b.videoCaptureDefaults);
            const constraints = utils_1.constraintsForOptions(opts);
            let stream;
            try {
                stream = yield navigator.mediaDevices.getUserMedia(constraints);
            }
            catch (err) {
                if (err instanceof Error) {
                    if (constraints.audio) {
                        this.microphoneError = err;
                    }
                    if (constraints.video) {
                        this.cameraError = err;
                    }
                }
                throw err;
            }
            if (constraints.audio) {
                this.microphoneError = undefined;
            }
            if (constraints.video) {
                this.cameraError = undefined;
            }
            return stream.getTracks().map((mediaStreamTrack) => {
                const isAudio = mediaStreamTrack.kind === 'audio';
                let trackOptions = isAudio ? options.audio : options.video;
                if (typeof trackOptions === 'boolean' || !trackOptions) {
                    trackOptions = {};
                }
                let trackConstraints;
                const conOrBool = isAudio ? constraints.audio : constraints.video;
                if (typeof conOrBool !== 'boolean') {
                    trackConstraints = conOrBool;
                }
                const track = publishUtils_1.mediaTrackToLocalTrack(mediaStreamTrack, trackConstraints);
                if (track.kind === Track_1.Track.Kind.Video) {
                    track.source = Track_1.Track.Source.Camera;
                }
                else if (track.kind === Track_1.Track.Kind.Audio) {
                    track.source = Track_1.Track.Source.Microphone;
                }
                return track;
            });
        });
    }
    /**
     * Creates a screen capture tracks with getDisplayMedia().
     * A LocalVideoTrack is always created and returned.
     * If { audio: true }, and the browser supports audio capture, a LocalAudioTrack is also created.
     */
    createScreenTracks(options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (options === undefined) {
                options = {};
            }
            if (options.resolution === undefined) {
                options.resolution = options_1.VideoPresets.fhd.resolution;
            }
            let videoConstraints = true;
            if (options.resolution) {
                videoConstraints = {
                    width: options.resolution.width,
                    height: options.resolution.height,
                };
            }
            // typescript definition is missing getDisplayMedia: https://github.com/microsoft/TypeScript/issues/33232
            // @ts-ignore
            const stream = yield navigator.mediaDevices.getDisplayMedia({
                audio: (_a = options.audio) !== null && _a !== void 0 ? _a : false,
                video: videoConstraints,
            });
            const tracks = stream.getVideoTracks();
            if (tracks.length === 0) {
                throw new errors_1.TrackInvalidError('no video track found');
            }
            const screenVideo = new LocalVideoTrack_1.default(tracks[0]);
            screenVideo.source = Track_1.Track.Source.ScreenShare;
            const localTracks = [screenVideo];
            if (stream.getAudioTracks().length > 0) {
                const screenAudio = new LocalAudioTrack_1.default(stream.getAudioTracks()[0]);
                screenAudio.source = Track_1.Track.Source.ScreenShareAudio;
                localTracks.push(screenAudio);
            }
            return localTracks;
        });
    }
    /**
     * Publish a new track to the room
     * @param track
     * @param options
     */
    publishTrack(track, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function* () {
            const opts = Object.assign(Object.assign({}, (_a = this.roomOptions) === null || _a === void 0 ? void 0 : _a.publishDefaults), options);
            // convert raw media track into audio or video track
            if (track instanceof MediaStreamTrack) {
                switch (track.kind) {
                    case 'audio':
                        track = new LocalAudioTrack_1.default(track);
                        break;
                    case 'video':
                        track = new LocalVideoTrack_1.default(track);
                        break;
                    default:
                        throw new errors_1.TrackInvalidError(`unsupported MediaStreamTrack kind ${track.kind}`);
                }
            }
            // is it already published? if so skip
            let existingPublication;
            this.tracks.forEach((publication) => {
                if (!publication.track) {
                    return;
                }
                if (publication.track === track) {
                    existingPublication = publication;
                }
            });
            if (existingPublication)
                return existingPublication;
            if (opts.source) {
                track.source = opts.source;
            }
            if (opts.stopMicTrackOnMute && track instanceof LocalAudioTrack_1.default) {
                track.stopOnMute = true;
            }
            // handle track actions
            track.on(events_1.TrackEvent.Muted, this.onTrackMuted);
            track.on(events_1.TrackEvent.Unmuted, this.onTrackUnmuted);
            track.on(events_1.TrackEvent.Ended, () => {
                this.unpublishTrack(track);
            });
            // create track publication from track
            const req = livekit_rtc_1.AddTrackRequest.fromPartial({
                // get local track id for use during publishing
                cid: track.mediaStreamTrack.id,
                name: options === null || options === void 0 ? void 0 : options.name,
                type: Track_1.Track.kindToProto(track.kind),
                muted: track.isMuted,
                source: Track_1.Track.sourceToProto(track.source),
                disableDtx: !((_b = opts === null || opts === void 0 ? void 0 : opts.dtx) !== null && _b !== void 0 ? _b : true),
            });
            // compute encodings and layers for video
            let encodings;
            if (track.kind === Track_1.Track.Kind.Video) {
                // TODO: support react native, which doesn't expose getSettings
                const settings = track.mediaStreamTrack.getSettings();
                const width = (_c = settings.width) !== null && _c !== void 0 ? _c : (_d = track.dimensions) === null || _d === void 0 ? void 0 : _d.width;
                const height = (_e = settings.height) !== null && _e !== void 0 ? _e : (_f = track.dimensions) === null || _f === void 0 ? void 0 : _f.height;
                // width and height should be defined for video
                req.width = width !== null && width !== void 0 ? width : 0;
                req.height = height !== null && height !== void 0 ? height : 0;
                encodings = publishUtils_1.computeVideoEncodings(track.source === Track_1.Track.Source.ScreenShare, width, height, opts);
                req.layers = LocalVideoTrack_1.videoLayersFromEncodings(req.width, req.height, encodings);
            }
            else if (track.kind === Track_1.Track.Kind.Audio && opts.audioBitrate) {
                encodings = [
                    {
                        maxBitrate: opts.audioBitrate,
                    },
                ];
            }
            const ti = yield this.engine.addTrack(req);
            const publication = new LocalTrackPublication_1.default(track.kind, ti, track);
            track.sid = ti.sid;
            if (!this.engine.publisher) {
                throw new errors_1.UnexpectedConnectionState('publisher is closed');
            }
            logger_1.default.debug('publishing with encodings', encodings);
            const transceiverInit = { direction: 'sendonly' };
            if (encodings) {
                transceiverInit.sendEncodings = encodings;
            }
            const transceiver = this.engine.publisher.pc.addTransceiver(track.mediaStreamTrack, transceiverInit);
            this.engine.negotiate();
            // store RTPSender
            track.sender = transceiver.sender;
            const disableLayerPause = (_h = (_g = this.roomOptions) === null || _g === void 0 ? void 0 : _g.expDisableLayerPause) !== null && _h !== void 0 ? _h : false;
            if (track instanceof LocalVideoTrack_1.default && !disableLayerPause) {
                track.startMonitor(this.engine.client);
            }
            if (opts.videoCodec) {
                this.setPreferredCodec(transceiver, track.kind, opts.videoCodec);
            }
            this.addTrackPublication(publication);
            // send event for publication
            this.emit(events_1.ParticipantEvent.LocalTrackPublished, publication);
            return publication;
        });
    }
    unpublishTrack(track) {
        var _a, _b;
        // look through all published tracks to find the right ones
        const publication = this.getPublicationForTrack(track);
        logger_1.default.debug('unpublishTrack', 'unpublishing track', track);
        if (!publication) {
            logger_1.default.warn('unpublishTrack', 'track was not unpublished because no publication was found', track);
            return null;
        }
        if (track instanceof LocalAudioTrack_1.default || track instanceof LocalVideoTrack_1.default) {
            track.removeListener(events_1.TrackEvent.Muted, this.onTrackMuted);
            track.removeListener(events_1.TrackEvent.Unmuted, this.onTrackUnmuted);
        }
        if ((_b = (_a = this.roomOptions) === null || _a === void 0 ? void 0 : _a.stopLocalTrackOnUnpublish) !== null && _b !== void 0 ? _b : true) {
            track.stop();
        }
        let mediaStreamTrack;
        if (track instanceof MediaStreamTrack) {
            mediaStreamTrack = track;
        }
        else {
            mediaStreamTrack = track.mediaStreamTrack;
        }
        if (this.engine.publisher) {
            const senders = this.engine.publisher.pc.getSenders();
            senders.forEach((sender) => {
                var _a;
                if (sender.track === mediaStreamTrack) {
                    try {
                        (_a = this.engine.publisher) === null || _a === void 0 ? void 0 : _a.pc.removeTrack(sender);
                        this.engine.negotiate();
                    }
                    catch (e) {
                        logger_1.default.warn('unpublishTrack', 'failed to remove track', e);
                    }
                }
            });
        }
        // remove from our maps
        this.tracks.delete(publication.trackSid);
        switch (publication.kind) {
            case Track_1.Track.Kind.Audio:
                this.audioTracks.delete(publication.trackSid);
                break;
            case Track_1.Track.Kind.Video:
                this.videoTracks.delete(publication.trackSid);
                break;
            default:
                break;
        }
        this.emit(events_1.ParticipantEvent.LocalTrackUnpublished, publication);
        return publication;
    }
    unpublishTracks(tracks) {
        const publications = [];
        tracks.forEach((track) => {
            const pub = this.unpublishTrack(track);
            if (pub) {
                publications.push(pub);
            }
        });
        return publications;
    }
    get publisherMetrics() {
        return null;
    }
    /**
     * Publish a new data payload to the room. Data will be forwarded to each
     * participant in the room if the destination argument is empty
     *
     * @param data Uint8Array of the payload. To send string data, use TextEncoder.encode
     * @param kind whether to send this as reliable or lossy.
     * For data that you need delivery guarantee (such as chat messages), use Reliable.
     * For data that should arrive as quickly as possible, but you are ok with dropped
     * packets, use Lossy.
     * @param destination the participants who will receive the message
     */
    publishData(data, kind, destination) {
        return __awaiter(this, void 0, void 0, function* () {
            const dest = [];
            if (destination !== undefined) {
                destination.forEach((val) => {
                    if (val instanceof RemoteParticipant_1.default) {
                        dest.push(val.sid);
                    }
                    else {
                        dest.push(val);
                    }
                });
            }
            const packet = {
                kind,
                user: {
                    participantSid: this.sid,
                    payload: data,
                    destinationSids: dest,
                },
            };
            yield this.engine.sendDataPacket(packet, kind);
        });
    }
    getPublicationForTrack(track) {
        let publication;
        this.tracks.forEach((pub) => {
            const localTrack = pub.track;
            if (!localTrack) {
                return;
            }
            // this looks overly complicated due to this object tree
            if (track instanceof MediaStreamTrack) {
                if (localTrack instanceof LocalAudioTrack_1.default
                    || localTrack instanceof LocalVideoTrack_1.default) {
                    if (localTrack.mediaStreamTrack === track) {
                        publication = pub;
                    }
                }
            }
            else if (track === localTrack) {
                publication = pub;
            }
        });
        return publication;
    }
    setPreferredCodec(transceiver, kind, videoCodec) {
        if (!('getCapabilities' in RTCRtpSender)) {
            return;
        }
        const cap = RTCRtpSender.getCapabilities(kind);
        if (!cap)
            return;
        const selected = cap.codecs.find((c) => {
            const codec = c.mimeType.toLowerCase();
            const matchesVideoCodec = codec === `video/${videoCodec}`;
            // for h264 codecs that have sdpFmtpLine available, use only if the
            // profile-level-id is 42e01f for cross-browser compatibility
            if (videoCodec === 'h264' && c.sdpFmtpLine) {
                return matchesVideoCodec && c.sdpFmtpLine.includes('profile-level-id=42e01f');
            }
            return matchesVideoCodec || codec === 'audio/opus';
        });
        if (selected && 'setCodecPreferences' in transceiver) {
            // @ts-ignore
            transceiver.setCodecPreferences([selected]);
        }
    }
}
exports.default = LocalParticipant;
//# sourceMappingURL=LocalParticipant.js.map