import { Track } from './Track';
export default class LocalTrack extends Track {
    /** @internal */
    sender?: RTCRtpSender;
    protected constraints: MediaTrackConstraints;
    protected constructor(mediaTrack: MediaStreamTrack, kind: Track.Kind, constraints?: MediaTrackConstraints);
    get id(): string;
    get dimensions(): Track.Dimensions | undefined;
    /**
     * @returns DeviceID of the device that is currently being used for this track
     */
    getDeviceId(): Promise<string | undefined>;
    mute(): Promise<LocalTrack>;
    unmute(): Promise<LocalTrack>;
    protected restart(constraints?: MediaTrackConstraints): Promise<LocalTrack>;
    protected setTrackMuted(muted: boolean): void;
    private handleEnded;
}
