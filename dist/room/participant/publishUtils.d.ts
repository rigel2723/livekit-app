import LocalAudioTrack from '../track/LocalAudioTrack';
import LocalVideoTrack from '../track/LocalVideoTrack';
import { TrackPublishOptions, VideoEncoding, VideoPreset } from '../track/options';
/** @internal */
export declare function mediaTrackToLocalTrack(mediaStreamTrack: MediaStreamTrack, constraints?: MediaTrackConstraints): LocalVideoTrack | LocalAudioTrack;
export declare const presets169: VideoPreset[];
export declare const presets43: VideoPreset[];
export declare const presetsScreenShare: VideoPreset[];
export declare function computeVideoEncodings(isScreenShare: boolean, width?: number, height?: number, options?: TrackPublishOptions): RTCRtpEncodingParameters[] | undefined;
export declare function determineAppropriateEncoding(isScreenShare: boolean, width: number, height: number): VideoEncoding;
export declare function presetsForResolution(isScreenShare: boolean, width: number, height: number): VideoPreset[];
