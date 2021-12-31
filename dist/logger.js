"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLogLevel = exports.LogLevel = void 0;
const loglevel_1 = __importDefault(require("loglevel"));
var LogLevel;
(function (LogLevel) {
    LogLevel["trace"] = "trace";
    LogLevel["debug"] = "debug";
    LogLevel["info"] = "info";
    LogLevel["warn"] = "warn";
    LogLevel["error"] = "error";
    LogLevel["silent"] = "silent";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
const livekitLogger = loglevel_1.default.getLogger('livekit');
exports.default = livekitLogger;
function setLogLevel(level) {
    livekitLogger.setLevel(level);
}
exports.setLogLevel = setLogLevel;
//# sourceMappingURL=logger.js.map