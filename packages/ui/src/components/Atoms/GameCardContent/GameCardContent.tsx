import React from 'react';
import { getConfigFromId } from '../../../utils/setgameCardConfig';
import Styles from './GameCardContent.module.scss';

type GameCardContentProps = {
    id: string;
};

const PATHS = {
    diamond: 'M2 16.5422L38.7883 1L72 16.5422L38.7883 31L2 16.5422Z',
    wave: 'M6.12237 28.5471C-7.09981 18.6419 3.47793 7.91118 15.3779 4.29988C27.2779 0.688594 40.5 8.42707 45.1278 6.36348C52.0013 3.29847 53.0611 6.14999e-07 59.6722 0C64.9611 0 67.3233 2.09158 68.2666 4.29988C76.861 24.4199 51.0778 29.5182 43.8056 27.5153C33.889 24.7841 25.6723 25.9676 21.989 27.5153C18.3057 29.063 12.0724 31.6425 6.12237 28.5471Z',
};

const setStripePattern = (color: string) => {
    return (
        <>
            <line x1="9.5" x2="9.5" y2="40" stroke={color} />
            <line x1="18.5" x2="18.5" y2="40" stroke={color} />
            <line x1="27.5" x2="27.5" y2="40" stroke={color} />
            <line x1="36.5" x2="36.5" y2="40" stroke={color} />
            <line x1="45.5" x2="45.5" y2="40" stroke={color} />
            <line x1="54.5" x2="54.5" y2="40" stroke={color} />
            <line x1="63.5" x2="63.5" y2="40" stroke={color} />
        </>
    );
};

export const GameCardContent = ({ id }: GameCardContentProps) => {
    // For stories
    if (typeof id === 'number') id = (id as number).toString();

    const config = getConfigFromId(id);

    return (
        <div className={Styles.GameCardContent}>
            {id.charAt(0) === '1' ? (
                <svg
                    width="70"
                    height="30"
                    viewBox="-1 -1 72 32"
                    fill={config.fill === 'filled' ? config.color : 'transparent'}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <mask id={`mask1-${id}`}>
                        <rect x="0" y="0" width={70} height={30} fill={'black'} />
                        <rect width="70" height="30" rx="15" fill={'black'} stroke={config.color} />
                        {config.fill === 'striped' ? setStripePattern('white') : null}
                    </mask>
                    <rect
                        width="70"
                        height="30"
                        rx="15"
                        fill={config.fill === 'stroke' ? 'transparent' : config.color}
                        stroke={config.color}
                        mask={config.fill === 'striped' ? `url(#mask1-${id})` : ''}
                    />
                    {config.fill === 'striped' ? <rect width="70" height="30" rx="15" stroke={config.color} /> : null}
                </svg>
            ) : null}
            {id.charAt(0) === '2' ? (
                <svg
                    width="70"
                    height="30"
                    viewBox="-1 -1 72 33"
                    fill={config.fill === 'filled' ? config.color : 'transparent'}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <mask id={`mask2-${id}`}>
                        <rect x="0" y="0" width={70} height={30} fill={'black'} />
                        <path d={PATHS.diamond} fill={'black'} />
                        {config.fill === 'striped' ? setStripePattern('white') : null}
                    </mask>
                    <path
                        d={PATHS.diamond}
                        fill={config.fill === 'stroke' ? 'transparent' : config.color}
                        stroke={config.color}
                        mask={config.fill === 'striped' ? `url(#mask2-${id})` : ''}
                    />
                    {config.fill === 'striped' ? <path d={PATHS.diamond} stroke={config.color} /> : null}
                </svg>
            ) : null}
            {id.charAt(0) === '3' ? (
                <svg
                    width="70"
                    height="30"
                    viewBox="0 -1 70 32"
                    fill={config.fill === 'filled' ? config.color : 'transparent'}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <mask id={`mask3-${id}`}>
                        <rect x="0" y="0" width={70} height={30} fill={'black'} />
                        <path d={PATHS.wave} fill={'black'} />
                        {config.fill === 'striped' ? setStripePattern('white') : null}
                    </mask>
                    <path
                        d={PATHS.wave}
                        fill={config.fill === 'stroke' ? 'transparent' : config.color}
                        stroke={config.color}
                        mask={config.fill === 'striped' ? `url(#mask3-${id})` : ''}
                    />
                    {config.fill === 'striped' ? <path d={PATHS.wave} stroke={config.color} /> : null}
                </svg>
            ) : null}
        </div>
    );
};
