"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenSharePresets = exports.VideoPresets43 = exports.VideoPresets = exports.AudioPresets = exports.VideoPreset = void 0;
class VideoPreset {
    constructor(width, height, maxBitrate, maxFramerate) {
        this.width = width;
        this.height = height;
        this.encoding = {
            maxBitrate,
            maxFramerate,
        };
    }
    get resolution() {
        return {
            width: this.width,
            height: this.height,
            frameRate: this.encoding.maxFramerate,
            aspectRatio: this.width / this.height,
        };
    }
}
exports.VideoPreset = VideoPreset;
var AudioPresets;
(function (AudioPresets) {
    AudioPresets.telephone = {
        maxBitrate: 12000,
    };
    AudioPresets.speech = {
        maxBitrate: 20000,
    };
    AudioPresets.music = {
        maxBitrate: 32000,
    };
})(AudioPresets = exports.AudioPresets || (exports.AudioPresets = {}));
/**
 * Sane presets for video resolution/encoding
 */
exports.VideoPresets = {
    qvga: new VideoPreset(320, 180, 120000, 10),
    vga: new VideoPreset(640, 360, 300000, 20),
    qhd: new VideoPreset(960, 540, 600000, 25),
    hd: new VideoPreset(1280, 720, 2000000, 30),
    fhd: new VideoPreset(1920, 1080, 3000000, 30),
};
/**
 * Four by three presets
 */
exports.VideoPresets43 = {
    qvga: new VideoPreset(240, 180, 90000, 10),
    vga: new VideoPreset(480, 360, 225000, 20),
    qhd: new VideoPreset(720, 540, 450000, 25),
    hd: new VideoPreset(960, 720, 1500000, 30),
    fhd: new VideoPreset(1440, 1080, 2800000, 30),
};
exports.ScreenSharePresets = {
    vga: new VideoPreset(640, 360, 200000, 3),
    hd_8: new VideoPreset(1280, 720, 400000, 5),
    hd_15: new VideoPreset(1280, 720, 1000000, 15),
    fhd_15: new VideoPreset(1920, 1080, 1500000, 15),
    fhd_30: new VideoPreset(1920, 1080, 3000000, 30),
};
//# sourceMappingURL=options.js.map