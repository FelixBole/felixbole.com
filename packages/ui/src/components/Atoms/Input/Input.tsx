import React, { HTMLInputTypeAttribute } from 'react';
import Styles from './Input.module.scss';

type InputProps = {
    defaultValue?: string | number | readonly string[] | undefined;
    placeholder?: string | undefined;
    name?: string | undefined;
    max?: number | undefined;
    min?: number | undefined;
    type?: HTMLInputTypeAttribute;
    fillSpace?: boolean;
    onchange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
    onfocus?: (e: React.FocusEvent<HTMLInputElement>) => any;
};

export const Input = ({
    defaultValue = undefined,
    type = 'text',
    placeholder = undefined,
    max = undefined,
    min = undefined,
    fillSpace = false,
    name = undefined,
    onchange = () => {},
    onfocus = () => {},
}: InputProps) => {
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onchange) await onchange(e);
    };

    const handleFocus = async (e: React.FocusEvent<HTMLInputElement>) => {
        if (onfocus) await onfocus(e);
    };

    return (
        <input
            className={Styles.Input}
            type={type}
            defaultValue={defaultValue}
            max={max}
            min={min}
            placeholder={placeholder}
            name={name}
            onChange={(e) => handleChange(e)}
            onFocus={(e) => handleFocus(e)}
            style={{ width: fillSpace ? '100%' : undefined }}
        ></input>
    );
};
