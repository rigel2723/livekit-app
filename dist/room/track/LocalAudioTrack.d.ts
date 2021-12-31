import LocalTrack from './LocalTrack';
import { AudioCaptureOptions } from './options';
export default class LocalAudioTrack extends LocalTrack {
    sender?: RTCRtpSender;
    /** @internal */
    stopOnMute: boolean;
    /** @internal */
    constructor(mediaTrack: MediaStreamTrack, constraints?: MediaTrackConstraints);
    setDeviceId(deviceId: string): Promise<void>;
    mute(): Promise<LocalAudioTrack>;
    unmute(): Promise<LocalAudioTrack>;
    restartTrack(options?: AudioCaptureOptions): Promise<void>;
}
