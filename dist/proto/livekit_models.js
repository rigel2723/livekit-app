"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPacket = exports.SpeakerInfo = exports.ActiveSpeakerUpdate = exports.DataPacket = exports.VideoLayer = exports.TrackInfo = exports.ParticipantInfo = exports.Codec = exports.Room = exports.dataPacket_KindToJSON = exports.dataPacket_KindFromJSON = exports.DataPacket_Kind = exports.participantInfo_StateToJSON = exports.participantInfo_StateFromJSON = exports.ParticipantInfo_State = exports.connectionQualityToJSON = exports.connectionQualityFromJSON = exports.ConnectionQuality = exports.videoQualityToJSON = exports.videoQualityFromJSON = exports.VideoQuality = exports.trackSourceToJSON = exports.trackSourceFromJSON = exports.TrackSource = exports.trackTypeToJSON = exports.trackTypeFromJSON = exports.TrackType = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "livekit";
var TrackType;
(function (TrackType) {
    TrackType[TrackType["AUDIO"] = 0] = "AUDIO";
    TrackType[TrackType["VIDEO"] = 1] = "VIDEO";
    TrackType[TrackType["DATA"] = 2] = "DATA";
    TrackType[TrackType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(TrackType = exports.TrackType || (exports.TrackType = {}));
function trackTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "AUDIO":
            return TrackType.AUDIO;
        case 1:
        case "VIDEO":
            return TrackType.VIDEO;
        case 2:
        case "DATA":
            return TrackType.DATA;
        case -1:
        case "UNRECOGNIZED":
        default:
            return TrackType.UNRECOGNIZED;
    }
}
exports.trackTypeFromJSON = trackTypeFromJSON;
function trackTypeToJSON(object) {
    switch (object) {
        case TrackType.AUDIO:
            return "AUDIO";
        case TrackType.VIDEO:
            return "VIDEO";
        case TrackType.DATA:
            return "DATA";
        default:
            return "UNKNOWN";
    }
}
exports.trackTypeToJSON = trackTypeToJSON;
var TrackSource;
(function (TrackSource) {
    TrackSource[TrackSource["UNKNOWN"] = 0] = "UNKNOWN";
    TrackSource[TrackSource["CAMERA"] = 1] = "CAMERA";
    TrackSource[TrackSource["MICROPHONE"] = 2] = "MICROPHONE";
    TrackSource[TrackSource["SCREEN_SHARE"] = 3] = "SCREEN_SHARE";
    TrackSource[TrackSource["SCREEN_SHARE_AUDIO"] = 4] = "SCREEN_SHARE_AUDIO";
    TrackSource[TrackSource["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(TrackSource = exports.TrackSource || (exports.TrackSource = {}));
function trackSourceFromJSON(object) {
    switch (object) {
        case 0:
        case "UNKNOWN":
            return TrackSource.UNKNOWN;
        case 1:
        case "CAMERA":
            return TrackSource.CAMERA;
        case 2:
        case "MICROPHONE":
            return TrackSource.MICROPHONE;
        case 3:
        case "SCREEN_SHARE":
            return TrackSource.SCREEN_SHARE;
        case 4:
        case "SCREEN_SHARE_AUDIO":
            return TrackSource.SCREEN_SHARE_AUDIO;
        case -1:
        case "UNRECOGNIZED":
        default:
            return TrackSource.UNRECOGNIZED;
    }
}
exports.trackSourceFromJSON = trackSourceFromJSON;
function trackSourceToJSON(object) {
    switch (object) {
        case TrackSource.UNKNOWN:
            return "UNKNOWN";
        case TrackSource.CAMERA:
            return "CAMERA";
        case TrackSource.MICROPHONE:
            return "MICROPHONE";
        case TrackSource.SCREEN_SHARE:
            return "SCREEN_SHARE";
        case TrackSource.SCREEN_SHARE_AUDIO:
            return "SCREEN_SHARE_AUDIO";
        default:
            return "UNKNOWN";
    }
}
exports.trackSourceToJSON = trackSourceToJSON;
var VideoQuality;
(function (VideoQuality) {
    VideoQuality[VideoQuality["LOW"] = 0] = "LOW";
    VideoQuality[VideoQuality["MEDIUM"] = 1] = "MEDIUM";
    VideoQuality[VideoQuality["HIGH"] = 2] = "HIGH";
    VideoQuality[VideoQuality["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(VideoQuality = exports.VideoQuality || (exports.VideoQuality = {}));
function videoQualityFromJSON(object) {
    switch (object) {
        case 0:
        case "LOW":
            return VideoQuality.LOW;
        case 1:
        case "MEDIUM":
            return VideoQuality.MEDIUM;
        case 2:
        case "HIGH":
            return VideoQuality.HIGH;
        case -1:
        case "UNRECOGNIZED":
        default:
            return VideoQuality.UNRECOGNIZED;
    }
}
exports.videoQualityFromJSON = videoQualityFromJSON;
function videoQualityToJSON(object) {
    switch (object) {
        case VideoQuality.LOW:
            return "LOW";
        case VideoQuality.MEDIUM:
            return "MEDIUM";
        case VideoQuality.HIGH:
            return "HIGH";
        default:
            return "UNKNOWN";
    }
}
exports.videoQualityToJSON = videoQualityToJSON;
var ConnectionQuality;
(function (ConnectionQuality) {
    ConnectionQuality[ConnectionQuality["POOR"] = 0] = "POOR";
    ConnectionQuality[ConnectionQuality["GOOD"] = 1] = "GOOD";
    ConnectionQuality[ConnectionQuality["EXCELLENT"] = 2] = "EXCELLENT";
    ConnectionQuality[ConnectionQuality["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(ConnectionQuality = exports.ConnectionQuality || (exports.ConnectionQuality = {}));
function connectionQualityFromJSON(object) {
    switch (object) {
        case 0:
        case "POOR":
            return ConnectionQuality.POOR;
        case 1:
        case "GOOD":
            return ConnectionQuality.GOOD;
        case 2:
        case "EXCELLENT":
            return ConnectionQuality.EXCELLENT;
        case -1:
        case "UNRECOGNIZED":
        default:
            return ConnectionQuality.UNRECOGNIZED;
    }
}
exports.connectionQualityFromJSON = connectionQualityFromJSON;
function connectionQualityToJSON(object) {
    switch (object) {
        case ConnectionQuality.POOR:
            return "POOR";
        case ConnectionQuality.GOOD:
            return "GOOD";
        case ConnectionQuality.EXCELLENT:
            return "EXCELLENT";
        default:
            return "UNKNOWN";
    }
}
exports.connectionQualityToJSON = connectionQualityToJSON;
var ParticipantInfo_State;
(function (ParticipantInfo_State) {
    /** JOINING - websocket' connected, but not offered yet */
    ParticipantInfo_State[ParticipantInfo_State["JOINING"] = 0] = "JOINING";
    /** JOINED - server received client offer */
    ParticipantInfo_State[ParticipantInfo_State["JOINED"] = 1] = "JOINED";
    /** ACTIVE - ICE connectivity established */
    ParticipantInfo_State[ParticipantInfo_State["ACTIVE"] = 2] = "ACTIVE";
    /** DISCONNECTED - WS disconnected */
    ParticipantInfo_State[ParticipantInfo_State["DISCONNECTED"] = 3] = "DISCONNECTED";
    ParticipantInfo_State[ParticipantInfo_State["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(ParticipantInfo_State = exports.ParticipantInfo_State || (exports.ParticipantInfo_State = {}));
function participantInfo_StateFromJSON(object) {
    switch (object) {
        case 0:
        case "JOINING":
            return ParticipantInfo_State.JOINING;
        case 1:
        case "JOINED":
            return ParticipantInfo_State.JOINED;
        case 2:
        case "ACTIVE":
            return ParticipantInfo_State.ACTIVE;
        case 3:
        case "DISCONNECTED":
            return ParticipantInfo_State.DISCONNECTED;
        case -1:
        case "UNRECOGNIZED":
        default:
            return ParticipantInfo_State.UNRECOGNIZED;
    }
}
exports.participantInfo_StateFromJSON = participantInfo_StateFromJSON;
function participantInfo_StateToJSON(object) {
    switch (object) {
        case ParticipantInfo_State.JOINING:
            return "JOINING";
        case ParticipantInfo_State.JOINED:
            return "JOINED";
        case ParticipantInfo_State.ACTIVE:
            return "ACTIVE";
        case ParticipantInfo_State.DISCONNECTED:
            return "DISCONNECTED";
        default:
            return "UNKNOWN";
    }
}
exports.participantInfo_StateToJSON = participantInfo_StateToJSON;
var DataPacket_Kind;
(function (DataPacket_Kind) {
    DataPacket_Kind[DataPacket_Kind["RELIABLE"] = 0] = "RELIABLE";
    DataPacket_Kind[DataPacket_Kind["LOSSY"] = 1] = "LOSSY";
    DataPacket_Kind[DataPacket_Kind["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(DataPacket_Kind = exports.DataPacket_Kind || (exports.DataPacket_Kind = {}));
function dataPacket_KindFromJSON(object) {
    switch (object) {
        case 0:
        case "RELIABLE":
            return DataPacket_Kind.RELIABLE;
        case 1:
        case "LOSSY":
            return DataPacket_Kind.LOSSY;
        case -1:
        case "UNRECOGNIZED":
        default:
            return DataPacket_Kind.UNRECOGNIZED;
    }
}
exports.dataPacket_KindFromJSON = dataPacket_KindFromJSON;
function dataPacket_KindToJSON(object) {
    switch (object) {
        case DataPacket_Kind.RELIABLE:
            return "RELIABLE";
        case DataPacket_Kind.LOSSY:
            return "LOSSY";
        default:
            return "UNKNOWN";
    }
}
exports.dataPacket_KindToJSON = dataPacket_KindToJSON;
const baseRoom = {
    sid: "",
    name: "",
    emptyTimeout: 0,
    maxParticipants: 0,
    creationTime: 0,
    turnPassword: "",
    metadata: "",
    numParticipants: 0,
    activeRecording: false,
};
exports.Room = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.sid !== "") {
            writer.uint32(10).string(message.sid);
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        if (message.emptyTimeout !== 0) {
            writer.uint32(24).uint32(message.emptyTimeout);
        }
        if (message.maxParticipants !== 0) {
            writer.uint32(32).uint32(message.maxParticipants);
        }
        if (message.creationTime !== 0) {
            writer.uint32(40).int64(message.creationTime);
        }
        if (message.turnPassword !== "") {
            writer.uint32(50).string(message.turnPassword);
        }
        for (const v of message.enabledCodecs) {
            exports.Codec.encode(v, writer.uint32(58).fork()).ldelim();
        }
        if (message.metadata !== "") {
            writer.uint32(66).string(message.metadata);
        }
        if (message.numParticipants !== 0) {
            writer.uint32(72).uint32(message.numParticipants);
        }
        if (message.activeRecording === true) {
            writer.uint32(80).bool(message.activeRecording);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseRoom);
        message.enabledCodecs = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sid = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.emptyTimeout = reader.uint32();
                    break;
                case 4:
                    message.maxParticipants = reader.uint32();
                    break;
                case 5:
                    message.creationTime = longToNumber(reader.int64());
                    break;
                case 6:
                    message.turnPassword = reader.string();
                    break;
                case 7:
                    message.enabledCodecs.push(exports.Codec.decode(reader, reader.uint32()));
                    break;
                case 8:
                    message.metadata = reader.string();
                    break;
                case 9:
                    message.numParticipants = reader.uint32();
                    break;
                case 10:
                    message.activeRecording = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseRoom);
        message.enabledCodecs = [];
        if (object.sid !== undefined && object.sid !== null) {
            message.sid = String(object.sid);
        }
        else {
            message.sid = "";
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = "";
        }
        if (object.emptyTimeout !== undefined && object.emptyTimeout !== null) {
            message.emptyTimeout = Number(object.emptyTimeout);
        }
        else {
            message.emptyTimeout = 0;
        }
        if (object.maxParticipants !== undefined &&
            object.maxParticipants !== null) {
            message.maxParticipants = Number(object.maxParticipants);
        }
        else {
            message.maxParticipants = 0;
        }
        if (object.creationTime !== undefined && object.creationTime !== null) {
            message.creationTime = Number(object.creationTime);
        }
        else {
            message.creationTime = 0;
        }
        if (object.turnPassword !== undefined && object.turnPassword !== null) {
            message.turnPassword = String(object.turnPassword);
        }
        else {
            message.turnPassword = "";
        }
        if (object.enabledCodecs !== undefined && object.enabledCodecs !== null) {
            for (const e of object.enabledCodecs) {
                message.enabledCodecs.push(exports.Codec.fromJSON(e));
            }
        }
        if (object.metadata !== undefined && object.metadata !== null) {
            message.metadata = String(object.metadata);
        }
        else {
            message.metadata = "";
        }
        if (object.numParticipants !== undefined &&
            object.numParticipants !== null) {
            message.numParticipants = Number(object.numParticipants);
        }
        else {
            message.numParticipants = 0;
        }
        if (object.activeRecording !== undefined &&
            object.activeRecording !== null) {
            message.activeRecording = Boolean(object.activeRecording);
        }
        else {
            message.activeRecording = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.sid !== undefined && (obj.sid = message.sid);
        message.name !== undefined && (obj.name = message.name);
        message.emptyTimeout !== undefined &&
            (obj.emptyTimeout = message.emptyTimeout);
        message.maxParticipants !== undefined &&
            (obj.maxParticipants = message.maxParticipants);
        message.creationTime !== undefined &&
            (obj.creationTime = message.creationTime);
        message.turnPassword !== undefined &&
            (obj.turnPassword = message.turnPassword);
        if (message.enabledCodecs) {
            obj.enabledCodecs = message.enabledCodecs.map((e) => e ? exports.Codec.toJSON(e) : undefined);
        }
        else {
            obj.enabledCodecs = [];
        }
        message.metadata !== undefined && (obj.metadata = message.metadata);
        message.numParticipants !== undefined &&
            (obj.numParticipants = message.numParticipants);
        message.activeRecording !== undefined &&
            (obj.activeRecording = message.activeRecording);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const message = Object.assign({}, baseRoom);
        message.sid = (_a = object.sid) !== null && _a !== void 0 ? _a : "";
        message.name = (_b = object.name) !== null && _b !== void 0 ? _b : "";
        message.emptyTimeout = (_c = object.emptyTimeout) !== null && _c !== void 0 ? _c : 0;
        message.maxParticipants = (_d = object.maxParticipants) !== null && _d !== void 0 ? _d : 0;
        message.creationTime = (_e = object.creationTime) !== null && _e !== void 0 ? _e : 0;
        message.turnPassword = (_f = object.turnPassword) !== null && _f !== void 0 ? _f : "";
        message.enabledCodecs = [];
        if (object.enabledCodecs !== undefined && object.enabledCodecs !== null) {
            for (const e of object.enabledCodecs) {
                message.enabledCodecs.push(exports.Codec.fromPartial(e));
            }
        }
        message.metadata = (_g = object.metadata) !== null && _g !== void 0 ? _g : "";
        message.numParticipants = (_h = object.numParticipants) !== null && _h !== void 0 ? _h : 0;
        message.activeRecording = (_j = object.activeRecording) !== null && _j !== void 0 ? _j : false;
        return message;
    },
};
const baseCodec = { mime: "", fmtpLine: "" };
exports.Codec = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.mime !== "") {
            writer.uint32(10).string(message.mime);
        }
        if (message.fmtpLine !== "") {
            writer.uint32(18).string(message.fmtpLine);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseCodec);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.mime = reader.string();
                    break;
                case 2:
                    message.fmtpLine = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseCodec);
        if (object.mime !== undefined && object.mime !== null) {
            message.mime = String(object.mime);
        }
        else {
            message.mime = "";
        }
        if (object.fmtpLine !== undefined && object.fmtpLine !== null) {
            message.fmtpLine = String(object.fmtpLine);
        }
        else {
            message.fmtpLine = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.mime !== undefined && (obj.mime = message.mime);
        message.fmtpLine !== undefined && (obj.fmtpLine = message.fmtpLine);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseCodec);
        message.mime = (_a = object.mime) !== null && _a !== void 0 ? _a : "";
        message.fmtpLine = (_b = object.fmtpLine) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
const baseParticipantInfo = {
    sid: "",
    identity: "",
    state: 0,
    metadata: "",
    joinedAt: 0,
    hidden: false,
    recorder: false,
};
exports.ParticipantInfo = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.sid !== "") {
            writer.uint32(10).string(message.sid);
        }
        if (message.identity !== "") {
            writer.uint32(18).string(message.identity);
        }
        if (message.state !== 0) {
            writer.uint32(24).int32(message.state);
        }
        for (const v of message.tracks) {
            exports.TrackInfo.encode(v, writer.uint32(34).fork()).ldelim();
        }
        if (message.metadata !== "") {
            writer.uint32(42).string(message.metadata);
        }
        if (message.joinedAt !== 0) {
            writer.uint32(48).int64(message.joinedAt);
        }
        if (message.hidden === true) {
            writer.uint32(56).bool(message.hidden);
        }
        if (message.recorder === true) {
            writer.uint32(64).bool(message.recorder);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseParticipantInfo);
        message.tracks = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sid = reader.string();
                    break;
                case 2:
                    message.identity = reader.string();
                    break;
                case 3:
                    message.state = reader.int32();
                    break;
                case 4:
                    message.tracks.push(exports.TrackInfo.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.metadata = reader.string();
                    break;
                case 6:
                    message.joinedAt = longToNumber(reader.int64());
                    break;
                case 7:
                    message.hidden = reader.bool();
                    break;
                case 8:
                    message.recorder = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseParticipantInfo);
        message.tracks = [];
        if (object.sid !== undefined && object.sid !== null) {
            message.sid = String(object.sid);
        }
        else {
            message.sid = "";
        }
        if (object.identity !== undefined && object.identity !== null) {
            message.identity = String(object.identity);
        }
        else {
            message.identity = "";
        }
        if (object.state !== undefined && object.state !== null) {
            message.state = participantInfo_StateFromJSON(object.state);
        }
        else {
            message.state = 0;
        }
        if (object.tracks !== undefined && object.tracks !== null) {
            for (const e of object.tracks) {
                message.tracks.push(exports.TrackInfo.fromJSON(e));
            }
        }
        if (object.metadata !== undefined && object.metadata !== null) {
            message.metadata = String(object.metadata);
        }
        else {
            message.metadata = "";
        }
        if (object.joinedAt !== undefined && object.joinedAt !== null) {
            message.joinedAt = Number(object.joinedAt);
        }
        else {
            message.joinedAt = 0;
        }
        if (object.hidden !== undefined && object.hidden !== null) {
            message.hidden = Boolean(object.hidden);
        }
        else {
            message.hidden = false;
        }
        if (object.recorder !== undefined && object.recorder !== null) {
            message.recorder = Boolean(object.recorder);
        }
        else {
            message.recorder = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.sid !== undefined && (obj.sid = message.sid);
        message.identity !== undefined && (obj.identity = message.identity);
        message.state !== undefined &&
            (obj.state = participantInfo_StateToJSON(message.state));
        if (message.tracks) {
            obj.tracks = message.tracks.map((e) => e ? exports.TrackInfo.toJSON(e) : undefined);
        }
        else {
            obj.tracks = [];
        }
        message.metadata !== undefined && (obj.metadata = message.metadata);
        message.joinedAt !== undefined && (obj.joinedAt = message.joinedAt);
        message.hidden !== undefined && (obj.hidden = message.hidden);
        message.recorder !== undefined && (obj.recorder = message.recorder);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g;
        const message = Object.assign({}, baseParticipantInfo);
        message.sid = (_a = object.sid) !== null && _a !== void 0 ? _a : "";
        message.identity = (_b = object.identity) !== null && _b !== void 0 ? _b : "";
        message.state = (_c = object.state) !== null && _c !== void 0 ? _c : 0;
        message.tracks = [];
        if (object.tracks !== undefined && object.tracks !== null) {
            for (const e of object.tracks) {
                message.tracks.push(exports.TrackInfo.fromPartial(e));
            }
        }
        message.metadata = (_d = object.metadata) !== null && _d !== void 0 ? _d : "";
        message.joinedAt = (_e = object.joinedAt) !== null && _e !== void 0 ? _e : 0;
        message.hidden = (_f = object.hidden) !== null && _f !== void 0 ? _f : false;
        message.recorder = (_g = object.recorder) !== null && _g !== void 0 ? _g : false;
        return message;
    },
};
const baseTrackInfo = {
    sid: "",
    type: 0,
    name: "",
    muted: false,
    width: 0,
    height: 0,
    simulcast: false,
    disableDtx: false,
    source: 0,
};
exports.TrackInfo = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.sid !== "") {
            writer.uint32(10).string(message.sid);
        }
        if (message.type !== 0) {
            writer.uint32(16).int32(message.type);
        }
        if (message.name !== "") {
            writer.uint32(26).string(message.name);
        }
        if (message.muted === true) {
            writer.uint32(32).bool(message.muted);
        }
        if (message.width !== 0) {
            writer.uint32(40).uint32(message.width);
        }
        if (message.height !== 0) {
            writer.uint32(48).uint32(message.height);
        }
        if (message.simulcast === true) {
            writer.uint32(56).bool(message.simulcast);
        }
        if (message.disableDtx === true) {
            writer.uint32(64).bool(message.disableDtx);
        }
        if (message.source !== 0) {
            writer.uint32(72).int32(message.source);
        }
        for (const v of message.layers) {
            exports.VideoLayer.encode(v, writer.uint32(82).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseTrackInfo);
        message.layers = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sid = reader.string();
                    break;
                case 2:
                    message.type = reader.int32();
                    break;
                case 3:
                    message.name = reader.string();
                    break;
                case 4:
                    message.muted = reader.bool();
                    break;
                case 5:
                    message.width = reader.uint32();
                    break;
                case 6:
                    message.height = reader.uint32();
                    break;
                case 7:
                    message.simulcast = reader.bool();
                    break;
                case 8:
                    message.disableDtx = reader.bool();
                    break;
                case 9:
                    message.source = reader.int32();
                    break;
                case 10:
                    message.layers.push(exports.VideoLayer.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseTrackInfo);
        message.layers = [];
        if (object.sid !== undefined && object.sid !== null) {
            message.sid = String(object.sid);
        }
        else {
            message.sid = "";
        }
        if (object.type !== undefined && object.type !== null) {
            message.type = trackTypeFromJSON(object.type);
        }
        else {
            message.type = 0;
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = "";
        }
        if (object.muted !== undefined && object.muted !== null) {
            message.muted = Boolean(object.muted);
        }
        else {
            message.muted = false;
        }
        if (object.width !== undefined && object.width !== null) {
            message.width = Number(object.width);
        }
        else {
            message.width = 0;
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = Number(object.height);
        }
        else {
            message.height = 0;
        }
        if (object.simulcast !== undefined && object.simulcast !== null) {
            message.simulcast = Boolean(object.simulcast);
        }
        else {
            message.simulcast = false;
        }
        if (object.disableDtx !== undefined && object.disableDtx !== null) {
            message.disableDtx = Boolean(object.disableDtx);
        }
        else {
            message.disableDtx = false;
        }
        if (object.source !== undefined && object.source !== null) {
            message.source = trackSourceFromJSON(object.source);
        }
        else {
            message.source = 0;
        }
        if (object.layers !== undefined && object.layers !== null) {
            for (const e of object.layers) {
                message.layers.push(exports.VideoLayer.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.sid !== undefined && (obj.sid = message.sid);
        message.type !== undefined && (obj.type = trackTypeToJSON(message.type));
        message.name !== undefined && (obj.name = message.name);
        message.muted !== undefined && (obj.muted = message.muted);
        message.width !== undefined && (obj.width = message.width);
        message.height !== undefined && (obj.height = message.height);
        message.simulcast !== undefined && (obj.simulcast = message.simulcast);
        message.disableDtx !== undefined && (obj.disableDtx = message.disableDtx);
        message.source !== undefined &&
            (obj.source = trackSourceToJSON(message.source));
        if (message.layers) {
            obj.layers = message.layers.map((e) => e ? exports.VideoLayer.toJSON(e) : undefined);
        }
        else {
            obj.layers = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const message = Object.assign({}, baseTrackInfo);
        message.sid = (_a = object.sid) !== null && _a !== void 0 ? _a : "";
        message.type = (_b = object.type) !== null && _b !== void 0 ? _b : 0;
        message.name = (_c = object.name) !== null && _c !== void 0 ? _c : "";
        message.muted = (_d = object.muted) !== null && _d !== void 0 ? _d : false;
        message.width = (_e = object.width) !== null && _e !== void 0 ? _e : 0;
        message.height = (_f = object.height) !== null && _f !== void 0 ? _f : 0;
        message.simulcast = (_g = object.simulcast) !== null && _g !== void 0 ? _g : false;
        message.disableDtx = (_h = object.disableDtx) !== null && _h !== void 0 ? _h : false;
        message.source = (_j = object.source) !== null && _j !== void 0 ? _j : 0;
        message.layers = [];
        if (object.layers !== undefined && object.layers !== null) {
            for (const e of object.layers) {
                message.layers.push(exports.VideoLayer.fromPartial(e));
            }
        }
        return message;
    },
};
const baseVideoLayer = { quality: 0, width: 0, height: 0, bitrate: 0 };
exports.VideoLayer = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.quality !== 0) {
            writer.uint32(8).int32(message.quality);
        }
        if (message.width !== 0) {
            writer.uint32(16).uint32(message.width);
        }
        if (message.height !== 0) {
            writer.uint32(24).uint32(message.height);
        }
        if (message.bitrate !== 0) {
            writer.uint32(32).uint32(message.bitrate);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseVideoLayer);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.quality = reader.int32();
                    break;
                case 2:
                    message.width = reader.uint32();
                    break;
                case 3:
                    message.height = reader.uint32();
                    break;
                case 4:
                    message.bitrate = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseVideoLayer);
        if (object.quality !== undefined && object.quality !== null) {
            message.quality = videoQualityFromJSON(object.quality);
        }
        else {
            message.quality = 0;
        }
        if (object.width !== undefined && object.width !== null) {
            message.width = Number(object.width);
        }
        else {
            message.width = 0;
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = Number(object.height);
        }
        else {
            message.height = 0;
        }
        if (object.bitrate !== undefined && object.bitrate !== null) {
            message.bitrate = Number(object.bitrate);
        }
        else {
            message.bitrate = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.quality !== undefined &&
            (obj.quality = videoQualityToJSON(message.quality));
        message.width !== undefined && (obj.width = message.width);
        message.height !== undefined && (obj.height = message.height);
        message.bitrate !== undefined && (obj.bitrate = message.bitrate);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = Object.assign({}, baseVideoLayer);
        message.quality = (_a = object.quality) !== null && _a !== void 0 ? _a : 0;
        message.width = (_b = object.width) !== null && _b !== void 0 ? _b : 0;
        message.height = (_c = object.height) !== null && _c !== void 0 ? _c : 0;
        message.bitrate = (_d = object.bitrate) !== null && _d !== void 0 ? _d : 0;
        return message;
    },
};
const baseDataPacket = { kind: 0 };
exports.DataPacket = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.kind !== 0) {
            writer.uint32(8).int32(message.kind);
        }
        if (message.user !== undefined) {
            exports.UserPacket.encode(message.user, writer.uint32(18).fork()).ldelim();
        }
        if (message.speaker !== undefined) {
            exports.ActiveSpeakerUpdate.encode(message.speaker, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseDataPacket);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.kind = reader.int32();
                    break;
                case 2:
                    message.user = exports.UserPacket.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.speaker = exports.ActiveSpeakerUpdate.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseDataPacket);
        if (object.kind !== undefined && object.kind !== null) {
            message.kind = dataPacket_KindFromJSON(object.kind);
        }
        else {
            message.kind = 0;
        }
        if (object.user !== undefined && object.user !== null) {
            message.user = exports.UserPacket.fromJSON(object.user);
        }
        else {
            message.user = undefined;
        }
        if (object.speaker !== undefined && object.speaker !== null) {
            message.speaker = exports.ActiveSpeakerUpdate.fromJSON(object.speaker);
        }
        else {
            message.speaker = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.kind !== undefined &&
            (obj.kind = dataPacket_KindToJSON(message.kind));
        message.user !== undefined &&
            (obj.user = message.user ? exports.UserPacket.toJSON(message.user) : undefined);
        message.speaker !== undefined &&
            (obj.speaker = message.speaker
                ? exports.ActiveSpeakerUpdate.toJSON(message.speaker)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseDataPacket);
        message.kind = (_a = object.kind) !== null && _a !== void 0 ? _a : 0;
        if (object.user !== undefined && object.user !== null) {
            message.user = exports.UserPacket.fromPartial(object.user);
        }
        else {
            message.user = undefined;
        }
        if (object.speaker !== undefined && object.speaker !== null) {
            message.speaker = exports.ActiveSpeakerUpdate.fromPartial(object.speaker);
        }
        else {
            message.speaker = undefined;
        }
        return message;
    },
};
const baseActiveSpeakerUpdate = {};
exports.ActiveSpeakerUpdate = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.speakers) {
            exports.SpeakerInfo.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseActiveSpeakerUpdate);
        message.speakers = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.speakers.push(exports.SpeakerInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseActiveSpeakerUpdate);
        message.speakers = [];
        if (object.speakers !== undefined && object.speakers !== null) {
            for (const e of object.speakers) {
                message.speakers.push(exports.SpeakerInfo.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.speakers) {
            obj.speakers = message.speakers.map((e) => e ? exports.SpeakerInfo.toJSON(e) : undefined);
        }
        else {
            obj.speakers = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseActiveSpeakerUpdate);
        message.speakers = [];
        if (object.speakers !== undefined && object.speakers !== null) {
            for (const e of object.speakers) {
                message.speakers.push(exports.SpeakerInfo.fromPartial(e));
            }
        }
        return message;
    },
};
const baseSpeakerInfo = { sid: "", level: 0, active: false };
exports.SpeakerInfo = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.sid !== "") {
            writer.uint32(10).string(message.sid);
        }
        if (message.level !== 0) {
            writer.uint32(21).float(message.level);
        }
        if (message.active === true) {
            writer.uint32(24).bool(message.active);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseSpeakerInfo);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sid = reader.string();
                    break;
                case 2:
                    message.level = reader.float();
                    break;
                case 3:
                    message.active = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseSpeakerInfo);
        if (object.sid !== undefined && object.sid !== null) {
            message.sid = String(object.sid);
        }
        else {
            message.sid = "";
        }
        if (object.level !== undefined && object.level !== null) {
            message.level = Number(object.level);
        }
        else {
            message.level = 0;
        }
        if (object.active !== undefined && object.active !== null) {
            message.active = Boolean(object.active);
        }
        else {
            message.active = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.sid !== undefined && (obj.sid = message.sid);
        message.level !== undefined && (obj.level = message.level);
        message.active !== undefined && (obj.active = message.active);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseSpeakerInfo);
        message.sid = (_a = object.sid) !== null && _a !== void 0 ? _a : "";
        message.level = (_b = object.level) !== null && _b !== void 0 ? _b : 0;
        message.active = (_c = object.active) !== null && _c !== void 0 ? _c : false;
        return message;
    },
};
const baseUserPacket = { participantSid: "", destinationSids: "" };
exports.UserPacket = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.participantSid !== "") {
            writer.uint32(10).string(message.participantSid);
        }
        if (message.payload.length !== 0) {
            writer.uint32(18).bytes(message.payload);
        }
        for (const v of message.destinationSids) {
            writer.uint32(26).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseUserPacket);
        message.destinationSids = [];
        message.payload = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.participantSid = reader.string();
                    break;
                case 2:
                    message.payload = reader.bytes();
                    break;
                case 3:
                    message.destinationSids.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseUserPacket);
        message.destinationSids = [];
        message.payload = new Uint8Array();
        if (object.participantSid !== undefined && object.participantSid !== null) {
            message.participantSid = String(object.participantSid);
        }
        else {
            message.participantSid = "";
        }
        if (object.payload !== undefined && object.payload !== null) {
            message.payload = bytesFromBase64(object.payload);
        }
        if (object.destinationSids !== undefined &&
            object.destinationSids !== null) {
            for (const e of object.destinationSids) {
                message.destinationSids.push(String(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.participantSid !== undefined &&
            (obj.participantSid = message.participantSid);
        message.payload !== undefined &&
            (obj.payload = base64FromBytes(message.payload !== undefined ? message.payload : new Uint8Array()));
        if (message.destinationSids) {
            obj.destinationSids = message.destinationSids.map((e) => e);
        }
        else {
            obj.destinationSids = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseUserPacket);
        message.participantSid = (_a = object.participantSid) !== null && _a !== void 0 ? _a : "";
        message.payload = (_b = object.payload) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.destinationSids = [];
        if (object.destinationSids !== undefined &&
            object.destinationSids !== null) {
            for (const e of object.destinationSids) {
                message.destinationSids.push(e);
            }
        }
        return message;
    },
};
var globalThis = (() => {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
    throw "Unable to locate global object";
})();
const atob = globalThis.atob ||
    ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64) {
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
        arr[i] = bin.charCodeAt(i);
    }
    return arr;
}
const btoa = globalThis.btoa ||
    ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr) {
    const bin = [];
    for (const byte of arr) {
        bin.push(String.fromCharCode(byte));
    }
    return btoa(bin.join(""));
}
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    return long.toNumber();
}
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=livekit_models.js.map