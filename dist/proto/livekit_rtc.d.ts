import _m0 from "protobufjs/minimal";
import { TrackType, TrackSource, Room, ParticipantInfo, TrackInfo, VideoQuality, ConnectionQuality, VideoLayer, SpeakerInfo } from "./livekit_models";
export declare const protobufPackage = "livekit";
export declare enum SignalTarget {
    PUBLISHER = 0,
    SUBSCRIBER = 1,
    UNRECOGNIZED = -1
}
export declare function signalTargetFromJSON(object: any): SignalTarget;
export declare function signalTargetToJSON(object: SignalTarget): string;
export declare enum StreamState {
    ACTIVE = 0,
    PAUSED = 1,
    UNRECOGNIZED = -1
}
export declare function streamStateFromJSON(object: any): StreamState;
export declare function streamStateToJSON(object: StreamState): string;
export interface SignalRequest {
    /** initial join exchange, for publisher */
    offer?: SessionDescription | undefined;
    /** participant answering publisher offer */
    answer?: SessionDescription | undefined;
    trickle?: TrickleRequest | undefined;
    addTrack?: AddTrackRequest | undefined;
    /** mute the participant's published tracks */
    mute?: MuteTrackRequest | undefined;
    /** Subscribe or unsubscribe from tracks */
    subscription?: UpdateSubscription | undefined;
    /** Update settings of subscribed tracks */
    trackSetting?: UpdateTrackSettings | undefined;
    /** Immediately terminate session */
    leave?: LeaveRequest | undefined;
    /**
     * Set active published layers, deprecated in favor of automatic tracking
     *    SetSimulcastLayers simulcast = 9;
     */
    updateLayers?: UpdateVideoLayers | undefined;
}
export interface SignalResponse {
    /** sent when join is accepted */
    join?: JoinResponse | undefined;
    /** sent when server answers publisher */
    answer?: SessionDescription | undefined;
    /** sent when server is sending subscriber an offer */
    offer?: SessionDescription | undefined;
    /** sent when an ICE candidate is available */
    trickle?: TrickleRequest | undefined;
    /** sent when participants in the room has changed */
    update?: ParticipantUpdate | undefined;
    /** sent to the participant when their track has been published */
    trackPublished?: TrackPublishedResponse | undefined;
    /** Immediately terminate session */
    leave?: LeaveRequest | undefined;
    /** server initiated mute */
    mute?: MuteTrackRequest | undefined;
    /** indicates changes to speaker status, including when they've gone to not speaking */
    speakersChanged?: SpeakersChanged | undefined;
    /** sent when metadata of the room has changed */
    roomUpdate?: RoomUpdate | undefined;
    /** when connection quality changed */
    connectionQuality?: ConnectionQualityUpdate | undefined;
    /** when streamed tracks state changed */
    streamStateUpdate?: StreamStateUpdate | undefined;
}
export interface AddTrackRequest {
    /** client ID of track, to match it when RTC track is received */
    cid: string;
    name: string;
    type: TrackType;
    /** to be deprecated in favor of layers */
    width: number;
    height: number;
    /** true to add track and initialize to muted */
    muted: boolean;
    /** true if DTX (Discontinuous Transmission) is disabled for audio */
    disableDtx: boolean;
    source: TrackSource;
    layers: VideoLayer[];
}
export interface TrickleRequest {
    candidateInit: string;
    target: SignalTarget;
}
export interface MuteTrackRequest {
    sid: string;
    muted: boolean;
}
export interface JoinResponse {
    room?: Room;
    participant?: ParticipantInfo;
    otherParticipants: ParticipantInfo[];
    serverVersion: string;
    iceServers: ICEServer[];
    /** use subscriber as the primary PeerConnection */
    subscriberPrimary: boolean;
    /**
     * when the current server isn't available, return alternate url to retry connection
     * when this is set, the other fields will be largely empty
     */
    alternativeUrl: string;
}
export interface TrackPublishedResponse {
    cid: string;
    track?: TrackInfo;
}
export interface SessionDescription {
    /** "answer" | "offer" | "pranswer" | "rollback" */
    type: string;
    sdp: string;
}
export interface ParticipantUpdate {
    participants: ParticipantInfo[];
}
export interface UpdateSubscription {
    trackSids: string[];
    subscribe: boolean;
}
export interface UpdateTrackSettings {
    trackSids: string[];
    /** when true, the track is placed in a paused state, with no new data returned */
    disabled: boolean;
    /** deprecated in favor of width & height */
    quality: VideoQuality;
    /** for video, width to receive */
    width: number;
    /** for video, height to receive */
    height: number;
}
export interface LeaveRequest {
    /**
     * sent when server initiates the disconnect due to server-restart
     * indicates clients should attempt full-reconnect sequence
     */
    canReconnect: boolean;
}
/** message to indicate published video track dimensions are changing */
export interface UpdateVideoLayers {
    trackSid: string;
    layers: VideoLayer[];
}
export interface ICEServer {
    urls: string[];
    username: string;
    credential: string;
}
export interface SpeakersChanged {
    speakers: SpeakerInfo[];
}
export interface RoomUpdate {
    room?: Room;
}
export interface ConnectionQualityInfo {
    participantSid: string;
    quality: ConnectionQuality;
}
export interface ConnectionQualityUpdate {
    updates: ConnectionQualityInfo[];
}
export interface StreamStateInfo {
    participantSid: string;
    trackSid: string;
    state: StreamState;
}
export interface StreamStateUpdate {
    streamStates: StreamStateInfo[];
}
export declare const SignalRequest: {
    encode(message: SignalRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SignalRequest;
    fromJSON(object: any): SignalRequest;
    toJSON(message: SignalRequest): unknown;
    fromPartial(object: DeepPartial<SignalRequest>): SignalRequest;
};
export declare const SignalResponse: {
    encode(message: SignalResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SignalResponse;
    fromJSON(object: any): SignalResponse;
    toJSON(message: SignalResponse): unknown;
    fromPartial(object: DeepPartial<SignalResponse>): SignalResponse;
};
export declare const AddTrackRequest: {
    encode(message: AddTrackRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AddTrackRequest;
    fromJSON(object: any): AddTrackRequest;
    toJSON(message: AddTrackRequest): unknown;
    fromPartial(object: DeepPartial<AddTrackRequest>): AddTrackRequest;
};
export declare const TrickleRequest: {
    encode(message: TrickleRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): TrickleRequest;
    fromJSON(object: any): TrickleRequest;
    toJSON(message: TrickleRequest): unknown;
    fromPartial(object: DeepPartial<TrickleRequest>): TrickleRequest;
};
export declare const MuteTrackRequest: {
    encode(message: MuteTrackRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MuteTrackRequest;
    fromJSON(object: any): MuteTrackRequest;
    toJSON(message: MuteTrackRequest): unknown;
    fromPartial(object: DeepPartial<MuteTrackRequest>): MuteTrackRequest;
};
export declare const JoinResponse: {
    encode(message: JoinResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): JoinResponse;
    fromJSON(object: any): JoinResponse;
    toJSON(message: JoinResponse): unknown;
    fromPartial(object: DeepPartial<JoinResponse>): JoinResponse;
};
export declare const TrackPublishedResponse: {
    encode(message: TrackPublishedResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): TrackPublishedResponse;
    fromJSON(object: any): TrackPublishedResponse;
    toJSON(message: TrackPublishedResponse): unknown;
    fromPartial(object: DeepPartial<TrackPublishedResponse>): TrackPublishedResponse;
};
export declare const SessionDescription: {
    encode(message: SessionDescription, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SessionDescription;
    fromJSON(object: any): SessionDescription;
    toJSON(message: SessionDescription): unknown;
    fromPartial(object: DeepPartial<SessionDescription>): SessionDescription;
};
export declare const ParticipantUpdate: {
    encode(message: ParticipantUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ParticipantUpdate;
    fromJSON(object: any): ParticipantUpdate;
    toJSON(message: ParticipantUpdate): unknown;
    fromPartial(object: DeepPartial<ParticipantUpdate>): ParticipantUpdate;
};
export declare const UpdateSubscription: {
    encode(message: UpdateSubscription, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): UpdateSubscription;
    fromJSON(object: any): UpdateSubscription;
    toJSON(message: UpdateSubscription): unknown;
    fromPartial(object: DeepPartial<UpdateSubscription>): UpdateSubscription;
};
export declare const UpdateTrackSettings: {
    encode(message: UpdateTrackSettings, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): UpdateTrackSettings;
    fromJSON(object: any): UpdateTrackSettings;
    toJSON(message: UpdateTrackSettings): unknown;
    fromPartial(object: DeepPartial<UpdateTrackSettings>): UpdateTrackSettings;
};
export declare const LeaveRequest: {
    encode(message: LeaveRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): LeaveRequest;
    fromJSON(object: any): LeaveRequest;
    toJSON(message: LeaveRequest): unknown;
    fromPartial(object: DeepPartial<LeaveRequest>): LeaveRequest;
};
export declare const UpdateVideoLayers: {
    encode(message: UpdateVideoLayers, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): UpdateVideoLayers;
    fromJSON(object: any): UpdateVideoLayers;
    toJSON(message: UpdateVideoLayers): unknown;
    fromPartial(object: DeepPartial<UpdateVideoLayers>): UpdateVideoLayers;
};
export declare const ICEServer: {
    encode(message: ICEServer, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ICEServer;
    fromJSON(object: any): ICEServer;
    toJSON(message: ICEServer): unknown;
    fromPartial(object: DeepPartial<ICEServer>): ICEServer;
};
export declare const SpeakersChanged: {
    encode(message: SpeakersChanged, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SpeakersChanged;
    fromJSON(object: any): SpeakersChanged;
    toJSON(message: SpeakersChanged): unknown;
    fromPartial(object: DeepPartial<SpeakersChanged>): SpeakersChanged;
};
export declare const RoomUpdate: {
    encode(message: RoomUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): RoomUpdate;
    fromJSON(object: any): RoomUpdate;
    toJSON(message: RoomUpdate): unknown;
    fromPartial(object: DeepPartial<RoomUpdate>): RoomUpdate;
};
export declare const ConnectionQualityInfo: {
    encode(message: ConnectionQualityInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ConnectionQualityInfo;
    fromJSON(object: any): ConnectionQualityInfo;
    toJSON(message: ConnectionQualityInfo): unknown;
    fromPartial(object: DeepPartial<ConnectionQualityInfo>): ConnectionQualityInfo;
};
export declare const ConnectionQualityUpdate: {
    encode(message: ConnectionQualityUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ConnectionQualityUpdate;
    fromJSON(object: any): ConnectionQualityUpdate;
    toJSON(message: ConnectionQualityUpdate): unknown;
    fromPartial(object: DeepPartial<ConnectionQualityUpdate>): ConnectionQualityUpdate;
};
export declare const StreamStateInfo: {
    encode(message: StreamStateInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): StreamStateInfo;
    fromJSON(object: any): StreamStateInfo;
    toJSON(message: StreamStateInfo): unknown;
    fromPartial(object: DeepPartial<StreamStateInfo>): StreamStateInfo;
};
export declare const StreamStateUpdate: {
    encode(message: StreamStateUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): StreamStateUpdate;
    fromJSON(object: any): StreamStateUpdate;
    toJSON(message: StreamStateUpdate): unknown;
    fromPartial(object: DeepPartial<StreamStateUpdate>): StreamStateUpdate;
};
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
