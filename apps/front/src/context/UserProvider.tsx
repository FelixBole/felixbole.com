import { createContext, PropsWithChildren, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffectOnce } from 'hooks';
import { serverCall } from '../utils/serverCall';
import { LoaderPage } from '../pages/LoaderPage/LoaderPage';

type User = {
    _id: string;
    name: string;
    stats: any;
    avatar: string[][];
};

type DataStatus = {
    isLoading: boolean;
    isLoaded: boolean;
};

type ContextValue = {
    user: User | null;
    dataStatus: DataStatus;
};

const UserContext = createContext<ContextValue>({ user: null, dataStatus: { isLoaded: false, isLoading: false } });

const UserProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const [dataStatus, setDataStatus] = useState<DataStatus>({
        isLoading: false,
        isLoaded: false,
    });
    const navigate = useNavigate();

    useEffectOnce(() => {
        let isMounted = true;

        const loadUserInfo = async () => {
            try {
                setDataStatus({ isLoaded: false, isLoading: true });
                const userInfo = await serverCall.GET('/auth/check');
                if (!isMounted) return;
                if (userInfo.error) throw new Error(userInfo.error);
                if (!userInfo?.data?.user) throw new Error('User info not in response object');

                setUser(userInfo.data.user);
                sessionStorage.setItem('user', JSON.stringify(userInfo.data.user));
                setDataStatus({ isLoaded: true, isLoading: false });
                return;
            } catch (err) {
                if (!isMounted) return;
                setDataStatus({ isLoaded: false, isLoading: false });
                navigate('/login');
            }
        };

        loadUserInfo();

        return () => {
            isMounted = false;
        };
    });

    if (dataStatus.isLoading) {
        return <LoaderPage />;
    }

    return <UserContext.Provider value={{ user, dataStatus }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };