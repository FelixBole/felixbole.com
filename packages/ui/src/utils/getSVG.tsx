type Icon = 'home' | 'menu' | 'projects' | 'games' | 'profile' | 'music' | 'login' | 'logout';

const svgs: { [key: string]: { viewBox: string; g: JSX.Element } } = {
    home: {
        viewBox: '0 0 495.40 495.40',
        g: (
            <g>
                <g>
                    <g>
                        <path d="M487.083,225.514l-75.08-75.08V63.704c0-15.682-12.708-28.391-28.413-28.391c-15.669,0-28.377,12.709-28.377,28.391 v29.941L299.31,37.74c-27.639-27.624-75.694-27.575-103.27,0.05L8.312,225.514c-11.082,11.104-11.082,29.071,0,40.158 c11.087,11.101,29.089,11.101,40.172,0l187.71-187.729c6.115-6.083,16.893-6.083,22.976-0.018l187.742,187.747 c5.567,5.551,12.825,8.312,20.081,8.312c7.271,0,14.541-2.764,20.091-8.312C498.17,254.586,498.17,236.619,487.083,225.514z"></path>
                        <path d="M257.561,131.836c-5.454-5.451-14.285-5.451-19.723,0L72.712,296.913c-2.607,2.606-4.085,6.164-4.085,9.877v120.401 c0,28.253,22.908,51.16,51.16,51.16h81.754v-126.61h92.299v126.61h81.755c28.251,0,51.159-22.907,51.159-51.159V306.79 c0-3.713-1.465-7.271-4.085-9.877L257.561,131.836z"></path>
                    </g>
                </g>
            </g>
        ),
    },
    login: {
        viewBox: '0 0 24 24',
        g: (
            <g>
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M10 11V8l5 4-5 4v-3H1v-2h9zm-7.542 4h2.124A8.003 8.003 0 0 0 20 12 8 8 0 0 0 4.582 9H2.458C3.732 4.943 7.522 2 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10c-4.478 0-8.268-2.943-9.542-7z"></path>
            </g>
        ),
    },
    logout: {
        viewBox: '0 0 1024 1024',
        g: (
            <path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z"></path>
        ),
    },
    games: {
        viewBox: '0 0 14 14',
        g: (
            <path d="M 11.285714,1 2.7142857,1 C 1.7674107,1 1,1.76741 1,2.71429 l 0,8.57142 C 1,12.23259 1.7674107,13 2.7142857,13 l 8.5714283,0 C 12.232589,13 13,12.23259 13,11.28571 L 13,2.71429 C 13,1.76741 12.232589,1 11.285714,1 Z m -6.8571426,9.42857 c -0.4733035,0 -0.8571428,-0.38384 -0.8571428,-0.85714 0,-0.4733 0.3838393,-0.85714 0.8571428,-0.85714 0.4733036,0 0.8571429,0.38384 0.8571429,0.85714 0,0.4733 -0.3838393,0.85714 -0.8571429,0.85714 z m 0,-5.14286 c -0.4733035,0 -0.8571428,-0.38383 -0.8571428,-0.85714 0,-0.4733 0.3838393,-0.85714 0.8571428,-0.85714 0.4733036,0 0.8571429,0.38384 0.8571429,0.85714 0,0.47331 -0.3838393,0.85714 -0.8571429,0.85714 z M 7,7.85714 C 6.5266964,7.85714 6.1428571,7.4733 6.1428571,7 6.1428571,6.5267 6.5266964,6.14286 7,6.14286 7.4733036,6.14286 7.8571429,6.5267 7.8571429,7 7.8571429,7.4733 7.4733036,7.85714 7,7.85714 Z m 2.5714286,2.57143 c -0.4733036,0 -0.8571429,-0.38384 -0.8571429,-0.85714 0,-0.4733 0.3838393,-0.85714 0.8571429,-0.85714 0.4733034,0 0.8571424,0.38384 0.8571424,0.85714 0,0.4733 -0.383839,0.85714 -0.8571424,0.85714 z m 0,-5.14286 c -0.4733036,0 -0.8571429,-0.38383 -0.8571429,-0.85714 0,-0.4733 0.3838393,-0.85714 0.8571429,-0.85714 0.4733034,0 0.8571424,0.38384 0.8571424,0.85714 0,0.47331 -0.383839,0.85714 -0.8571424,0.85714 z"></path>
        ),
    },
    profile: {
        viewBox: '0 0 30.586 30.586',
        g: (
            <g transform="translate(-546.269 -195.397)">
                <path d="M572.138,221.245a15.738,15.738,0,0,0-21.065-.253l-1.322-1.5a17.738,17.738,0,0,1,23.741.28Z"></path>
                <path d="M561.464,204.152a4.96,4.96,0,1,1-4.96,4.96,4.966,4.966,0,0,1,4.96-4.96m0-2a6.96,6.96,0,1,0,6.96,6.96,6.96,6.96,0,0,0-6.96-6.96Z"></path>
                <path d="M561.562,197.4a13.293,13.293,0,1,1-13.293,13.293A13.308,13.308,0,0,1,561.562,197.4m0-2a15.293,15.293,0,1,0,15.293,15.293A15.293,15.293,0,0,0,561.562,195.4Z"></path>
            </g>
        ),
    },
    projects: {
        viewBox: '0 0 96 96',
        g: (
            <g>
                <path d="M24.8452,25.3957a6.0129,6.0129,0,0,0-8.4487.7617L1.3974,44.1563a5.9844,5.9844,0,0,0,0,7.687L16.3965,69.8422a5.9983,5.9983,0,1,0,9.21-7.687L13.8068,48l11.8-14.1554A6,6,0,0,0,24.8452,25.3957Z"></path>
                <path d="M55.1714,12.1192A6.0558,6.0558,0,0,0,48.1172,16.83L36.1179,76.8262A5.9847,5.9847,0,0,0,40.8286,83.88a5.7059,5.7059,0,0,0,1.1835.1172A5.9949,5.9949,0,0,0,47.8828,79.17L59.8821,19.1735A5.9848,5.9848,0,0,0,55.1714,12.1192Z"></path>
                <path d="M94.6026,44.1563,79.6035,26.1574a5.9983,5.9983,0,1,0-9.21,7.687L82.1932,48l-11.8,14.1554a5.9983,5.9983,0,1,0,9.21,7.687L94.6026,51.8433A5.9844,5.9844,0,0,0,94.6026,44.1563Z"></path>
            </g>
        ),
    },
    music: {
        viewBox: '0 0 24 24',
        g: (
            <g strokeWidth={2}>
                <circle style={{fill: 'none'}} cx="12" cy="12" r="10.5"></circle>
                <circle style={{fill: 'none'}} cx="8.18" cy="14.86" r="0.95"></circle>
                <circle style={{fill: 'none'}} cx="13.91" cy="13.91" r="0.95"></circle>
                <polyline style={{fill: 'none'}} points="14.86 13.91 14.86 8.18 9.14 9.14 9.14 14.86"></polyline>
            </g>
        ),
    },
};

export const getSVG = (icon: Icon) => {
    return svgs[icon];
};
