import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "ui";
import { serverCall } from "../../utils/serverCall";
import Styles from "./SignupPage.module.scss";

type SignupPageProps = {};

export const SignupPage = (props: SignupPageProps) => {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [error, setError] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.currentTarget.value);
	};
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value);
	};
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.currentTarget.value);
	};

	const submit = async () => {
		const body = {
			name,
			password,
			email,
		};

		if (password.length < 8 || password.length > 20) {
			setError({ error: true, message: "Password length invalid" });
			return;
		}

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
		<div className={Styles.SignupPage}>
			{error ? (
				<div className={Styles.error}>
					<p>{error.message}</p>
				</div>
			) : null}
			{!loading ? (
				<>
					<label htmlFor="name">Display Name</label>
					<input
						type="text"
						name="name"
						placeholder="display name"
						defaultValue={name}
						onChange={(e) => handleNameChange(e)}
					/>
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
