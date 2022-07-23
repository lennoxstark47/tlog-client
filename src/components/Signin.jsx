import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

export default function Signin() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// const [item, setItem] = useState([]);
	// const [name, setName] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(email, password);

		try {
			const res = await axios.post(
				'https://tlogapi.herokuapp.com/user/login',
				{ email, password }
			);

			console.log(res.data.success);
			console.log(res.data.data);
			if (res.data.success) {
				localStorage.removeItem('name');
				localStorage.setItem(
					'name',
					res.data.data.name
				);
				window.location.href = '/create';
			} else {
				return alert(res.data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h1>Signin</h1>
			<form>
				<label>Email</label>
				<input
					type='email'
					value={email}
					onChange={(e) =>
						setEmail(e.target.value)
					}
				/>
				<label>Password</label>
				<input
					type='password'
					value={password}
					onChange={(e) =>
						setPassword(e.target.value)
					}
				/>
				<Button
					type='submit'
					onClick={handleSubmit}
					variant='contained'>
					Signin
				</Button>
				<a href='/signup'>
					Dont Have an account?
				</a>
			</form>
		</div>
	);
}
