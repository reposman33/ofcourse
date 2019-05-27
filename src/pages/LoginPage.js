import React, { useState } from "react";
import { connect } from "react-redux";
import { onLogin, onSignUp } from "../actions";
import "./LoginPage.css";

const LoginPage = ({ error, loading, onLogin, onSignUp }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	return (
		<div className='LoginPage'>
			Please login or sign up to continue
			<form onSubmit={e => e.preventDefault()}>
				<label>
					username
					<input
						name='username'
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
				</label>
				<label>
					Password
					<input
						name='password'
						type='text'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</label>
				{error && <div className='error'>{JSON.stringify(error)}</div>}
				<button
					type='submit'
					disabled={loading.loading}
					onClick={() => onLogin(username, password)}>
					Login
				</button>
				<button
					type='button'
					onClick={() => onSignUp(username, password)}>
					Signup
				</button>
			</form>
		</div>
	);
};

const mapState = state => ({
	error: state.user.error,
	loading: state.user.loading
});
const mapDispatch = {
	onSignUp,
	onLogin
};

export default connect(
	mapState,
	mapDispatch
)(LoginPage);
