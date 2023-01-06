import React from 'react';
import Styles from './Loader.module.scss';

type LoaderProps = {};

export const Loader = (props: LoaderProps) => {
    return (
        <div className={Styles.Loader}>
            <h5>Checking some stuff, please wait...</h5>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="20 0 220 160">
                <path
                    d="M168.16108,41.58624c15.46217,0,5.25901,14.3442-8.94894,13.1602-21.727-1.81058-44.10903-17.3516-66.85383-10.52816C68.41276,51.40194,81.6473,77.9084,112.36182,77.9084"
                    fill="none"
                    stroke="#000"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="bevel"
                    strokeDashoffset="160.188209"
                    strokeDasharray="160.188209"
                />
                <path
                    d="M150.04574,59.71022c-25.01698,0-1.51257,56.654063-33.71604,68.42373-29.764614,10.878318-36.019603-13.785937-24.937894-20.72893"
                    transform="translate(0 0.0371)"
                    fill="none"
                    stroke="#000"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDashoffset="132.180403"
                    strokeDasharray="132.180403"
                />
                <path
                    d="M124.05094,87.58923c4.82039-1.37726,13.65494-1.88739,17.45523,1.9129"
                    fill="none"
                    stroke="#000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDashoffset="18.225684"
                    strokeDasharray="18.225684"
                />
                <path
                    d="M140.78883,95.71906c.79811-4.78868,3.09106-9.12019,6.93427-12.19475"
                    fill="none"
                    stroke="#000"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDashoffset="14.351499"
                    strokeDasharray="14.351499"
                />
            </svg>
        </div>
    );
};
