"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.presetsForResolution = exports.determineAppropriateEncoding = exports.computeVideoEncodings = exports.presetsScreenShare = exports.presets43 = exports.presets169 = exports.mediaTrackToLocalTrack = void 0;
const logger_1 = __importDefault(require("../../logger"));
const errors_1 = require("../errors");
const LocalAudioTrack_1 = __importDefault(require("../track/LocalAudioTrack"));
const LocalVideoTrack_1 = __importDefault(require("../track/LocalVideoTrack"));
const options_1 = require("../track/options");
/** @internal */
function mediaTrackToLocalTrack(mediaStreamTrack, constraints) {
    switch (mediaStreamTrack.kind) {
        case 'audio':
            return new LocalAudioTrack_1.default(mediaStreamTrack, constraints);
        case 'video':
            return new LocalVideoTrack_1.default(mediaStreamTrack, constraints);
        default:
            throw new errors_1.TrackInvalidError(`unsupported track type: ${mediaStreamTrack.kind}`);
    }
}
exports.mediaTrackToLocalTrack = mediaTrackToLocalTrack;
/* @internal */
exports.presets169 = [
    options_1.VideoPresets.qvga,
    options_1.VideoPresets.vga,
    options_1.VideoPresets.qhd,
    options_1.VideoPresets.hd,
    options_1.VideoPresets.fhd,
];
/* @internal */
exports.presets43 = [
    options_1.VideoPresets43.qvga,
    options_1.VideoPresets43.vga,
    options_1.VideoPresets43.qhd,
    options_1.VideoPresets43.hd,
    options_1.VideoPresets43.fhd,
];
/* @internal */
exports.presetsScreenShare = [
    options_1.ScreenSharePresets.vga,
    options_1.ScreenSharePresets.hd_8,
    options_1.ScreenSharePresets.hd_15,
    options_1.ScreenSharePresets.fhd_15,
    options_1.ScreenSharePresets.fhd_30,
];
const videoRids = ['q', 'h', 'f'];
/* @internal */
function computeVideoEncodings(isScreenShare, width, height, options) {
    let videoEncoding = options === null || options === void 0 ? void 0 : options.videoEncoding;
    if (isScreenShare) {
        videoEncoding = options === null || options === void 0 ? void 0 : options.screenShareEncoding;
    }
    const useSimulcast = !isScreenShare && (options === null || options === void 0 ? void 0 : options.simulcast);
    if ((!videoEncoding && !useSimulcast) || !width || !height) {
        // don't set encoding when we are not simulcasting and user isn't restricting
        // encoding parameters
        return;
    }
    if (!videoEncoding) {
        // find the right encoding based on width/height
        videoEncoding = determineAppropriateEncoding(isScreenShare, width, height);
        logger_1.default.debug('using video encoding', videoEncoding);
    }
    if (!useSimulcast) {
        return [videoEncoding];
    }
    const presets = presetsForResolution(isScreenShare, width, height);
    let midPreset;
    const lowPreset = presets[0];
    if (presets.length > 1) {
        [, midPreset] = presets;
    }
    const original = new options_1.VideoPreset(width, height, videoEncoding.maxBitrate, videoEncoding.maxFramerate);
    // NOTE:
    //   1. Ordering of these encodings is important. Chrome seems
    //      to use the index into encodings to decide which layer
    //      to disable when CPU constrained.
    //      So encodings should be ordered in increasing spatial
    //      resolution order.
    //   2. ion-sfu translates rids into layers. So, all encodings
    //      should have the base layer `q` and then more added
    //      based on other conditions.
    const size = Math.max(width, height);
    if (size >= 960 && midPreset) {
        return encodingsFromPresets(width, height, [
            lowPreset, midPreset, original,
        ]);
    }
    if (size >= 500) {
        return encodingsFromPresets(width, height, [
            lowPreset, original,
        ]);
    }
    return encodingsFromPresets(width, height, [
        original,
    ]);
}
exports.computeVideoEncodings = computeVideoEncodings;
/* @internal */
function determineAppropriateEncoding(isScreenShare, width, height) {
    const presets = presetsForResolution(isScreenShare, width, height);
    let { encoding } = presets[0];
    // handle portrait by swapping dimensions
    const size = Math.max(width, height);
    for (let i = 0; i < presets.length; i += 1) {
        const preset = presets[i];
        encoding = preset.encoding;
        if (preset.width >= size) {
            break;
        }
    }
    return encoding;
}
exports.determineAppropriateEncoding = determineAppropriateEncoding;
/* @internal */
function presetsForResolution(isScreenShare, width, height) {
    if (isScreenShare) {
        return exports.presetsScreenShare;
    }
    const aspect = width > height ? width / height : height / width;
    if (Math.abs(aspect - 16.0 / 9) < Math.abs(aspect - 4.0 / 3)) {
        return exports.presets169;
    }
    return exports.presets43;
}
exports.presetsForResolution = presetsForResolution;
// presets should be ordered by low, medium, high
function encodingsFromPresets(width, height, presets) {
    const encodings = [];
    presets.forEach((preset, idx) => {
        if (idx >= videoRids.length) {
            return;
        }
        const size = Math.min(width, height);
        const rid = videoRids[idx];
        encodings.push({
            rid,
            scaleResolutionDownBy: size / preset.height,
            maxBitrate: preset.encoding.maxBitrate,
            /* @ts-ignore */
            maxFramerate: preset.encoding.maxFramerate,
        });
    });
    return encodings;
}
//# sourceMappingURL=publishUtils.js.map