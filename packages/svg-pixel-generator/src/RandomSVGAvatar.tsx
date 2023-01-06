import { getPossibleColors } from './generator';
import { colors, getRandomColor } from './utils/colors';

type Props = {
    // Defaults to 5:5
    size?: number;
    pxSize?: number;
    className?: string;

    // One is provided by default
    colorArray?: string[];

    // Default is 2 color array length
    differentColors?: number;
};

export const RandomSVGAvatar = ({
    size = 5,
    pxSize = 100,
    colorArray = colors,
    differentColors = 2,
    className,
}: Props) => {
    const styles: React.CSSProperties = {
        width: pxSize,
        height: pxSize,
    };

    const possibleColors = getPossibleColors(colorArray, differentColors);

    return (
        <svg className={className} style={className ? undefined : styles}>
            {Array(size)
                .fill(0)
                .map((v, x) => {
                    const rects = Array(size)
                        .fill(0)
                        .map((v, y) => (
                            <rect
                                key={`${x}-${y}`}
                                x={x * (pxSize / size)}
                                y={y * (pxSize / size)}
                                height={pxSize / size}
                                width={pxSize / size}
                                fill={getRandomColor(possibleColors)}
                            ></rect>
                        ));

                    return <g key={`g-${x}`}>{rects}</g>;
                })}
        </svg>
    );
};
