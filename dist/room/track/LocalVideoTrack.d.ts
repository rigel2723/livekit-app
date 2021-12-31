import { SignalClient } from '../../api/SignalClient';
import { VideoLayer, VideoQuality } from '../../proto/livekit_models';
import { VideoSenderStats } from '../stats';
import LocalTrack from './LocalTrack';
import { VideoCaptureOptions } from './options';
export default class LocalVideoTrack extends LocalTrack {
    signalClient?: SignalClient;
    private prevStats?;
    private lastQualityChange?;
    private lastExplicitQualityChange?;
    private encodings?;
    constructor(mediaTrack: MediaStreamTrack, constraints?: MediaTrackConstraints);
    get isSimulcast(): boolean;
    startMonitor(signalClient: SignalClient): void;
    stop(): void;
    mute(): Promise<LocalVideoTrack>;
    unmute(): Promise<LocalVideoTrack>;
    getSenderStats(): Promise<VideoSenderStats[]>;
    setPublishingQuality(maxQuality: VideoQuality): void;
    setDeviceId(deviceId: string): Promise<void>;
    restartTrack(options?: VideoCaptureOptions): Promise<void>;
    private monitorSender;
    private checkAndUpdateSimulcast;
}
export declare function videoQualityForRid(rid: string): VideoQuality;
export declare function videoLayersFromEncodings(width: number, height: number, encodings?: RTCRtpEncodingParameters[]): VideoLayer[];
