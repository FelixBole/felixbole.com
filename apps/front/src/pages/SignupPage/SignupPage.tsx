import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from 'ui';
import { Loader } from '../../components/Loader/Loader';
import { serverCall } from '../../utils/serverCall';
import Styles from './SignupPage.module.scss';

type SignupPageProps = {};

export const SignupPage = (props: SignupPageProps) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    };

    const submit = async () => {
        const body = {
            name,
            password,
        };

        if (password.length < 8 || password.length > 20) {
            setError({ error: true, message: 'Password length invalid' });
            return;
        }

        setLoading(true);

        const data = await serverCall.POST('/signup', body);
        if (data.error === 'ERRDUPLICATENAME') {
            setError({ error: true, message: data.message });
        }

        setLoading(false);

        if (data.success) {
            const callbackUrl = sessionStorage.getItem('callbackURL') || '/games/web';
            sessionStorage.removeItem('callbackURL');
            navigate(callbackUrl);
        }
    };

    return (
        <div className={Styles.SignupPage}>
            {error ? (
                <div className={Styles.error}>
                    <p>{error.message}</p>
                </div>
            ) : null}
            {!loading ? (
                <>
                    <p>
                        To avoid storing your personnal data, I am not requesting your email, so if you lose your
                        account name or password, I will not be able to get them back to you automatically. Please note
                        them down somewhere. In any case, all it does is track your game data stats, that's all, so it's
                        not a big deal if it gets lost.
                    </p>
                    <label htmlFor="accountName">Account Name</label>
                    <Input
                        type="text"
                        name="accountName"
                        placeholder="Account Name"
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
                    <Button onclick={() => submit()}>Create account</Button>
                </>
            ) : (
                <div>
                    <Loader />
                </div>
            )}
        </div>
    );
};
