import { useRef } from 'react';
import { useEffectOnce } from './useEffectOnce';

interface WebSocketRef {
	current: WebSocket | null;
}

type Props = {
    webSocketURL: string;
    onopen: () => void;
    onmessage: (event: MessageEvent<any>) => void;
    onclose: () => void;
    onerror: () => void;
}

export const useWebSocket = ({webSocketURL, onclose, onerror, onmessage, onopen}: Props) => {
    const ws: WebSocketRef = useRef<WebSocket>(null);

    useEffectOnce(() => {
        ws.current = new WebSocket(webSocketURL);
        ws.current.onopen = onopen;
        ws.current.onmessage = onmessage;
        ws.current.onclose = onclose;
        ws.current.onerror = onerror;

        return () => {
            ws.current?.close();
        }
    })

    return ws;
}