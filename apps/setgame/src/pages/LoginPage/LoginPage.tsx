import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "ui";
import { serverCall } from "../../utils/serverCall";
import Styles from "./LoginPage.module.scss";

type LoginPageProps = {};

export const LoginPage = (props: LoginPageProps) => {
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [error, setError] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value);
	};
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.currentTarget.value);
	};

	const submit = async () => {
		const body = {
			password,
			email,
		};

		setLoading(true);

		const data = await serverCall.POST("/signup", body);
		if (data.error === "ERRDUPLICATEEMAIL") {
			setError({ error: true, message: data.message });
		}

		setLoading(false);

		if (data.success) {
			navigate("/");
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
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						placeholder="email"
						defaultValue={email}
						onChange={(e) => handleEmailChange(e)}
					/>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						placeholder="password"
						defaultValue={password}
						onChange={(e) => handlePasswordChange(e)}
					/>
					<small>8 to 20 characters</small>
					<Button onclick={() => submit()}>Submit</Button>
				</>
			) : (
				<div>
					<h3>Please wait</h3>
				</div>
			)}
		</div>
	);
};
