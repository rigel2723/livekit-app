"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constraintsForOptions = exports.mergeDefaultOptions = void 0;
function mergeDefaultOptions(options, audioDefaults, videoDefaults) {
    const opts = Object.assign({}, options);
    if (opts.audio === true)
        opts.audio = {};
    if (opts.video === true)
        opts.video = {};
    // use defaults
    if (opts.audio) {
        mergeObjectWithoutOverwriting(opts.audio, audioDefaults);
    }
    if (opts.video) {
        mergeObjectWithoutOverwriting(opts.video, videoDefaults);
    }
    return opts;
}
exports.mergeDefaultOptions = mergeDefaultOptions;
function mergeObjectWithoutOverwriting(mainObject, objectToMerge) {
    Object.keys(objectToMerge).forEach((key) => {
        if (mainObject[key] === undefined)
            mainObject[key] = objectToMerge[key];
    });
    return mainObject;
}
function constraintsForOptions(options) {
    const constraints = {};
    if (options.video) {
        // default video options
        if (typeof options.video === 'object') {
            const videoOptions = {};
            const target = videoOptions;
            const source = options.video;
            Object.keys(source).forEach((key) => {
                switch (key) {
                    case 'resolution':
                        // flatten VideoResolution fields
                        mergeObjectWithoutOverwriting(target, source.resolution);
                        break;
                    default:
                        target[key] = source[key];
                }
            });
            constraints.video = videoOptions;
        }
        else {
            constraints.video = options.video;
        }
    }
    else {
        constraints.video = false;
    }
    if (options.audio) {
        if (typeof options.audio === 'object') {
            constraints.audio = options.audio;
        }
        else {
            constraints.audio = true;
        }
    }
    else {
        constraints.audio = false;
    }
    return constraints;
}
exports.constraintsForOptions = constraintsForOptions;
//# sourceMappingURL=utils.js.map