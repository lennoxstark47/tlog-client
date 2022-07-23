import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function Signup() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(email, password, name);

		try {
			const res = await axios.post(
				'https://tlogapi.herokuapp.com/user/register',
				{ email, password, name }
			);

			// console.log(res.data.success);
			// console.log(res.data.data.name);
			if (res.data.success) {
				localStorage.removeItem('name');
				localStorage.setItem(
					'name',
					res.data.data.name
				);
				window.location.href = '/create';
			} else {
				alert(res.data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h1>Signup</h1>

			<form>
				<label>Name</label>
				<input
					type='text'
					value={name}
					onChange={(e) =>
						setName(e.target.value)
					}
				/>
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
				<button
					type='submit'
					onClick={handleSubmit}>
					Signup
				</button>
			</form>
		</div>
	);
}
