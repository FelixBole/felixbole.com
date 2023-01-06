type Props = {
    avatar: string[][];

    pxSize?: number;
    className?: string;
};

export const SVGAvatar = ({ avatar, pxSize = 100, className }: Props) => {
    if (!avatar) return null;

    const styles: React.CSSProperties = {
        width: pxSize,
        height: pxSize,
    };

    return (
        <svg className={className} style={className ? undefined : styles}>
            {avatar.map((v, x) => {
                const rects = avatar[x].map((v, y) => (
                    <rect
                        key={`${x}-${y}`}
                        x={x * (pxSize / avatar[x].length)}
                        y={y * (pxSize / avatar[x].length)}
                        height={pxSize / avatar[x].length}
                        width={pxSize / avatar[x].length}
                        fill={avatar[x][y]}
                    ></rect>
                ));

                return <g key={`g-${x}`}>{rects}</g>;
            })}
        </svg>
    );
};
