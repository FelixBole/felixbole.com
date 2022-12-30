import React, { useEffect, useState } from 'react';
import { GameCardContent } from '../../Atoms/GameCardContent/GameCardContent';
import Styles from './GameCard.module.scss';

type GameCardProps = {
    id: string;
    onclick?: (event: React.TouchEvent | React.MouseEvent | null, selected: boolean, id: string) => any;
    highlighted?: boolean;
    clicked?: boolean;

    /**
     * Time in s
     */
    animationDelay?: number;

    tiny?: boolean;
};

export const GameCard = ({
    id,
    onclick,
    highlighted = false,
    clicked = false,
    animationDelay = 0,
    tiny = false,
}: GameCardProps) => {
    const [selected, setSelected] = useState<boolean>(clicked);

    const amount = id.length < 4 ? 1 : parseInt(id.charAt(3));

    const handleClick = async (event: React.TouchEvent | React.MouseEvent) => {
        if (onclick) await onclick(event, !selected, id);

        setSelected(!selected);
    };

    useEffect(() => {
        setSelected(clicked);
    }, [clicked]);

    return (
        <div
            id={`gamecard-${id}`}
            className={`${Styles.GameCard} ${highlighted ? Styles.highlighted : ''} ${tiny ? Styles.tiny : ''}`}
            onClick={(e) => handleClick(e)}
        >
            <div
                className={`${Styles.inner} ${!tiny ? Styles.innerAnimated : ''}`}
                style={{ animationDelay: `${animationDelay}s` }}
            >
                <div className={Styles.front}>SET</div>
                <div className={Styles.back}>
                    <div className={selected ? Styles.selectionBox : ''}></div>
                    {Array(amount)
                        .fill(1)
                        .map((el, idx) => (
                            <GameCardContent id={id} key={`cardcontent-${id}-${idx}`} />
                        ))}
                </div>
            </div>
        </div>
    );
};
