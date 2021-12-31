import { AudioCaptureOptions, CreateLocalTracksOptions, VideoCaptureOptions } from './options';
export declare function mergeDefaultOptions(options?: CreateLocalTracksOptions, audioDefaults?: AudioCaptureOptions, videoDefaults?: VideoCaptureOptions): CreateLocalTracksOptions;
export declare function constraintsForOptions(options: CreateLocalTracksOptions): MediaStreamConstraints;
