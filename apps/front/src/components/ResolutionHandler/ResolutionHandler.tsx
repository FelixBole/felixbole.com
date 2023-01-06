import { PropsWithChildren, useState } from 'react';
import { useEffectOnce } from 'hooks';

type Props = {};

export const ResolutionHandler = ({ children }: PropsWithChildren<Props>) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffectOnce(() => {
        if (window.innerWidth <= 600) {
            setIsMobile(true);
        }

        const checkPadding = () => {
            if (window.innerWidth <= 600 && !isMobile) setIsMobile(true);

            if (window.innerWidth > 600) setIsMobile(false);
        };

        window.addEventListener('resize', checkPadding);

        return () => {
            window.removeEventListener('resize', checkPadding);
        };
    });

    return <div style={{ padding: isMobile ? '0 0 60px 0' : '0 80px 0 0' }}>{children}</div>;
};
