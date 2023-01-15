export type Project = {
    name: string;
    description: string;
    github?: string;
    date: string;
    website?: string;
};

export const projects: Project[] = [
    {
        name: 'felixbole.com',
        description:
            'This current website. As I learned React in the past year I decided to redo my website entirely using React running on a backend node express server. This project came from an attempt to understand monorepos (turborepo) and their architecture.',

        github: 'https://github.com/FelixBole/felixbole.com',
        date: '2023',
    },
    {
        name: 'VisionsGalaxy',
        description:
            'A gamified platform for students and jobseekers to help them determine skills and find learning opportunities and job offers by sharing data. Build with a MERN stack and made for Visions.',
        website: 'https://visionsgalaxy.io',
        date: '2022-Ongoing',
    },
    {
        name: 'NotificationToaster',
        description:
            'A lightweight library in Vanilla JS to simplify creating toast notifications. Built initially for my personnal needs, ended up adding some customization options and is now used in Visions, the company I work for.',
        github: 'https://github.com/FelixBole/notificationtoaster',
        date: '2022',
    },
    {
        name: 'Tour.js',
        description:
            'A lightweight library that will allow you to easily create interactive guides in your website or web application. Just vanilla JS, no frameworks required.',
        github: 'https://github.com/FelixBole/tour.js',
        date: '2021',
    },
];
