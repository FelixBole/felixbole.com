import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from 'ui';
import { Loader } from '../../components/Loader/Loader';
import { serverCall } from '../../utils/serverCall';
import Styles from './LoginPage.module.scss';

type LoginPageProps = {};

export const LoginPage = (props: LoginPageProps) => {
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    };
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    };

    const submit = async () => {
        const body = {
            password,
            name,
        };

        setLoading(true);

        const data = await serverCall.POST('/login', body);

        setLoading(false);

        if (data.error) {
            if (data.error === 'ERRUSERNOTFOUND') {
                setError({ message: 'This account does not seem to exist' });
                return;
            }

            if (data.error === 'ERRINVALIDPASSWORD') {
                setError({ message: 'Invalid password' });
                return;
            }
        }

        if (data.success) {
            const callbackUrl = sessionStorage.getItem('callbackURL') || '/games/web';
            sessionStorage.removeItem('callbackURL');
            navigate(callbackUrl);
        }
    };

    return (
        <div className={Styles.LoginPage}>
            {error ? (
                <div className={Styles.error}>
                    <p>{error.message}</p>
                </div>
            ) : null}
            {!loading ? (
                <>
                    <label htmlFor="name">Account name</label>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Account name"
                        defaultValue={name}
                        onchange={(e) => handleNameChange(e)}
                    />
                    <label htmlFor="password">Password</label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="password"
                        defaultValue={password}
                        onchange={(e) => handlePasswordChange(e)}
                    />
                    <small>8 to 20 characters</small>
                    <Button onclick={() => submit()}>Login</Button>
                    <Button onclick={() => navigate('/signup')}>I don't have an account yet</Button>
                </>
            ) : (
                <div>
                    <Loader />
                </div>
            )}
        </div>
    );
};
