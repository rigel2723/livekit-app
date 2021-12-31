/// <reference types="node" />
import { EventEmitter } from 'events';
import { SignalClient, SignalOptions } from '../api/SignalClient';
import { DataPacket, DataPacket_Kind, TrackInfo } from '../proto/livekit_models';
import { AddTrackRequest, JoinResponse } from '../proto/livekit_rtc';
import PCTransport from './PCTransport';
export declare const maxICEConnectTimeout: number;
/** @internal */
export default class RTCEngine extends EventEmitter {
    publisher?: PCTransport;
    subscriber?: PCTransport;
    client: SignalClient;
    rtcConfig: RTCConfiguration;
    private lossyDC?;
    private lossyDCSub?;
    private reliableDC?;
    private reliableDCSub?;
    private subscriberPrimary;
    private iceConnected;
    private isClosed;
    private pendingTrackResolvers;
    private hasPublished;
    private url?;
    private token?;
    private reconnectAttempts;
    constructor();
    join(url: string, token: string, opts?: SignalOptions): Promise<JoinResponse>;
    close(): void;
    addTrack(req: AddTrackRequest): Promise<TrackInfo>;
    updateMuteStatus(trackSid: string, muted: boolean): void;
    private configure;
    private handleDataChannel;
    private handleDataMessage;
    private handleDisconnect;
    private reconnect;
    sendDataPacket(packet: DataPacket, kind: DataPacket_Kind): Promise<void>;
    private ensurePublisherConnected;
    /** @internal */
    negotiate(): void;
}
