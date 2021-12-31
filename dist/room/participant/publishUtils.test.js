"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = require("../track/options");
const publishUtils_1 = require("./publishUtils");
describe('presetsForResolution', () => {
    it('handles screenshare', () => {
        expect(publishUtils_1.presetsForResolution(true, 600, 300)).toEqual(publishUtils_1.presetsScreenShare);
    });
    it('handles landscape', () => {
        expect(publishUtils_1.presetsForResolution(false, 600, 300)).toEqual(publishUtils_1.presets169);
        expect(publishUtils_1.presetsForResolution(false, 500, 500)).toEqual(publishUtils_1.presets43);
    });
    it('handles portrait', () => {
        expect(publishUtils_1.presetsForResolution(false, 300, 600)).toEqual(publishUtils_1.presets169);
        expect(publishUtils_1.presetsForResolution(false, 500, 500)).toEqual(publishUtils_1.presets43);
    });
});
describe('determineAppropriateEncoding', () => {
    it('uses higher encoding', () => {
        expect(publishUtils_1.determineAppropriateEncoding(false, 600, 300))
            .toEqual(options_1.VideoPresets.vga.encoding);
    });
    it('handles portrait', () => {
        expect(publishUtils_1.determineAppropriateEncoding(false, 300, 600))
            .toEqual(options_1.VideoPresets.vga.encoding);
    });
});
describe('computeVideoEncodings', () => {
    it('handles non-simulcast', () => {
        const encodings = publishUtils_1.computeVideoEncodings(false, 640, 480, {
            simulcast: false,
        });
        expect(encodings).toBeUndefined();
    });
    it('respects client defined bitrate', () => {
        const encodings = publishUtils_1.computeVideoEncodings(false, 640, 480, {
            simulcast: false,
            videoEncoding: {
                maxBitrate: 1024,
            },
        });
        expect(encodings).toHaveLength(1);
        expect(encodings[0].maxBitrate).toBe(1024);
    });
    it('returns three encodings for high-res simulcast', () => {
        const encodings = publishUtils_1.computeVideoEncodings(false, 960, 540, {
            simulcast: true,
        });
        expect(encodings).toHaveLength(3);
        // ensure they are what we expect
        expect(encodings[0].rid).toBe('q');
        expect(encodings[0].maxBitrate).toBe(options_1.VideoPresets.qvga.encoding.maxBitrate);
        expect(encodings[0].scaleResolutionDownBy).toBe(3);
        expect(encodings[1].rid).toBe('h');
        expect(encodings[1].scaleResolutionDownBy).toBe(1.5);
        expect(encodings[2].rid).toBe('f');
    });
    it('handles portrait simulcast', () => {
        const encodings = publishUtils_1.computeVideoEncodings(false, 540, 960, {
            simulcast: true,
        });
        expect(encodings).toHaveLength(3);
        expect(encodings[0].scaleResolutionDownBy).toBe(3);
        expect(encodings[1].scaleResolutionDownBy).toBe(1.5);
        expect(encodings[2].maxBitrate).toBe(options_1.VideoPresets.qhd.encoding.maxBitrate);
    });
    it('returns two encodings for lower-res simulcast', () => {
        const encodings = publishUtils_1.computeVideoEncodings(false, 640, 360, {
            simulcast: true,
        });
        expect(encodings).toHaveLength(2);
        // ensure they are what we expect
        expect(encodings[0].rid).toBe('q');
        expect(encodings[0].maxBitrate).toBe(options_1.VideoPresets.qvga.encoding.maxBitrate);
        expect(encodings[1].rid).toBe('h');
        expect(encodings[1].maxBitrate).toBe(options_1.VideoPresets.vga.encoding.maxBitrate);
    });
});
//# sourceMappingURL=publishUtils.test.js.map