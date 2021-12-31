/** @internal */
export default class PCTransport {
    pc: RTCPeerConnection;
    pendingCandidates: RTCIceCandidateInit[];
    restartingIce: boolean;
    renegotiate: boolean;
    onOffer?: (offer: RTCSessionDescriptionInit) => void;
    constructor(config?: RTCConfiguration);
    get isICEConnected(): boolean;
    addIceCandidate(candidate: RTCIceCandidateInit): Promise<void>;
    setRemoteDescription(sd: RTCSessionDescriptionInit): Promise<void>;
    negotiate: import("ts-debounce").DebouncedFunction<() => void>;
    createAndSendOffer(options?: RTCOfferOptions): Promise<void>;
    close(): void;
}
