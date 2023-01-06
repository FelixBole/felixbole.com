import { serverCall } from './serverCall';

export const getUserAvatar = () => {
    const sessData = sessionStorage.getItem('user');
    if (!sessData) return [[]] as string[][];
    // if (!sessData) {
    //     const data = await serverCall.GET('/auth/check');
    //     if (data.error) return null;
    //     return data?.data?.user?.avatar;
    // }

    return JSON.parse(sessData).avatar as string[][];
};

export const getUserStats = () => {
    const sessData = sessionStorage.getItem('user');
    if (!sessData) return { solo: 0, multiplayer: 0 };
    return JSON.parse(sessData)?.stats?.wins || { solo: 0, multiplayer: 0 };
};
