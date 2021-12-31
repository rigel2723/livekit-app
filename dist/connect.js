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
exports.connect = exports.version = void 0;
const logger_1 = __importStar(require("./logger"));
const errors_1 = require("./room/errors");
const events_1 = require("./room/events");
const Room_1 = __importDefault(require("./room/Room"));
var version_1 = require("./version");
Object.defineProperty(exports, "version", { enumerable: true, get: function () { return version_1.version; } });
/**
 * Connects to a LiveKit room, shorthand for `new Room()` and [[Room.connect]]
 *
 * ```typescript
 * connect('wss://myhost.livekit.io', token, {
 *   // publish audio and video tracks on joining
 *   audio: true,
 *   video: true,
 *   captureDefaults: {
 *    facingMode: 'user',
 *   },
 * })
 * ```
 * @param url URL to LiveKit server
 * @param token AccessToken, a JWT token that includes authentication and room details
 * @param options
 */
function connect(url, token, options) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        options !== null && options !== void 0 ? options : (options = {});
        logger_1.setLogLevel((_a = options.logLevel) !== null && _a !== void 0 ? _a : logger_1.LogLevel.warn);
        const config = (_b = options.rtcConfig) !== null && _b !== void 0 ? _b : {};
        if (options.iceServers) {
            config.iceServers = options.iceServers;
        }
        const room = new Room_1.default(options);
        // connect to room
        yield room.connect(url, token, options);
        const publishAudio = (_c = options.audio) !== null && _c !== void 0 ? _c : false;
        const publishVideo = (_d = options.video) !== null && _d !== void 0 ? _d : false;
        if (publishAudio || publishVideo) {
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                // if publishing both
                let err;
                if (publishAudio && publishVideo) {
                    try {
                        yield room.localParticipant.enableCameraAndMicrophone();
                    }
                    catch (e) {
                        const errKind = errors_1.MediaDeviceFailure.getFailure(e);
                        logger_1.default.warn('received error while creating media', errKind);
                        if (e instanceof Error) {
                            logger_1.default.warn(e.message);
                        }
                        // when it's a device issue, try to publish the other kind
                        if (errKind === errors_1.MediaDeviceFailure.NotFound
                            || errKind === errors_1.MediaDeviceFailure.DeviceInUse) {
                            try {
                                yield room.localParticipant.setMicrophoneEnabled(true);
                            }
                            catch (audioErr) {
                                err = audioErr;
                            }
                        }
                        else {
                            err = e;
                        }
                    }
                }
                else if (publishAudio) {
                    try {
                        yield room.localParticipant.setMicrophoneEnabled(true);
                    }
                    catch (e) {
                        err = e;
                    }
                }
                else if (publishVideo) {
                    try {
                        yield room.localParticipant.setCameraEnabled(true);
                    }
                    catch (e) {
                        err = e;
                    }
                }
                if (err) {
                    room.emit(events_1.RoomEvent.MediaDevicesError, err);
                    logger_1.default.error('could not create media', err);
                }
            }));
        }
        return room;
    });
}
exports.connect = connect;
//# sourceMappingURL=connect.js.map