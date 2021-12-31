/// <reference types="node" />
import { EventEmitter } from 'events';
import { RoomConnectOptions, RoomOptions } from '../options';
import LocalParticipant from './participant/LocalParticipant';
import Participant from './participant/Participant';
import RemoteParticipant from './participant/RemoteParticipant';
import RTCEngine from './RTCEngine';
export declare enum RoomState {
    Disconnected = "disconnected",
    Connected = "connected",
    Reconnecting = "reconnecting"
}
/**
 * In LiveKit, a room is the logical grouping for a list of participants.
 * Participants in a room can publish tracks, and subscribe to others' tracks.
 *
 * a Room fires [[RoomEvent | RoomEvents]].
 *
 * @noInheritDoc
 */
declare class Room extends EventEmitter {
    state: RoomState;
    /** map of sid: [[RemoteParticipant]] */
    participants: Map<string, RemoteParticipant>;
    /**
     * list of participants that are actively speaking. when this changes
     * a [[RoomEvent.ActiveSpeakersChanged]] event is fired
     */
    activeSpeakers: Participant[];
    /** @internal */
    engine: RTCEngine;
    /** server assigned unique room id */
    sid: string;
    /** user assigned name, derived from JWT token */
    name: string;
    /** the current participant */
    localParticipant: LocalParticipant;
    /** room metadata */
    metadata: string | undefined;
    /** options of room */
    options: RoomOptions;
    private audioEnabled;
    private audioContext?;
    /**
     * Creates a new Room, the primary construct for a LiveKit session.
     * @param options
     */
    constructor(options?: RoomOptions);
    private createEngine;
    /**
     * getLocalDevices abstracts navigator.mediaDevices.enumerateDevices.
     * In particular, it handles Chrome's unique behavior of creating `default`
     * devices. When encountered, it'll be removed from the list of devices.
     * The actual default device will be placed at top.
     * @param kind
     * @returns a list of available local devices
     */
    static getLocalDevices(kind: MediaDeviceKind): Promise<MediaDeviceInfo[]>;
    connect: (url: string, token: string, opts?: RoomConnectOptions | undefined) => Promise<Room | undefined>;
    /**
     * disconnects the room, emits [[RoomEvent.Disconnected]]
     */
    disconnect: (stopTracks?: boolean) => void;
    private onBeforeUnload;
    /**
     * Browsers have different policies regarding audio playback. Most requiring
     * some form of user interaction (click/tap/etc).
     * In those cases, audio will be silent until a click/tap triggering one of the following
     * - `startAudio`
     * - `getUserMedia`
     */
    startAudio(): Promise<void>;
    /**
     * Returns true if audio playback is enabled
     */
    get canPlaybackAudio(): boolean;
    /**
     * Switches all active device used in this room to the given device.
     *
     * Note: setting AudioOutput is not supported on some browsers. See [setSinkId](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/setSinkId#browser_compatibility)
     *
     * @param kind use `videoinput` for camera track,
     *  `audioinput` for microphone track,
     *  `audiooutput` to set speaker for all incoming audio tracks
     * @param deviceId
     */
    switchActiveDevice(kind: MediaDeviceKind, deviceId: string): Promise<void>;
    private onTrackAdded;
    private handleDisconnect;
    private handleParticipantUpdates;
    private handleParticipantDisconnected;
    private handleActiveSpeakersUpdate;
    private handleSpeakersChanged;
    private handleDataPacket;
    private handleAudioPlaybackStarted;
    private handleAudioPlaybackFailed;
    private handleDeviceChange;
    private handleRoomUpdate;
    private handleConnectionQualityUpdate;
    private acquireAudioContext;
    private getOrCreateParticipant;
    /** @internal */
    emit(event: string | symbol, ...args: any[]): boolean;
}
export default Room;
