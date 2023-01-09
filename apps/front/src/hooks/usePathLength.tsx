import React, { useEffect, useState } from 'react';

type Props = {
    pathRef: React.RefObject<SVGPathElement>;
    log?: boolean;
};

export const usePathLength = ({ pathRef, log = false }: Props) => {
    const [len, setLen] = useState<number>(0);

    useEffect(() => {
        if (!pathRef.current) return;
        const l = Math.round(pathRef.current.getTotalLength());
        if (log) console.log(l);
        if (l) setLen(l);
    }, [pathRef]);

    return { len };
};
