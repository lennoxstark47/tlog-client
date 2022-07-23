import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
		// <div>
		<Box
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'center',
				alignItems: 'center',
				marginTop: '30px',
			}}>
			<Paper
				elevation={3}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					minWidth: '300px',
					height: '400px',
					padding: '20px',
				}}>
				<h1>Signup</h1>

				<form>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							// alignItems: 'center',
						}}>
						<TextField
							id='outlined-basic'
							label='Name'
							variant='outlined'
							value={name}
							onChange={(e) =>
								setName(e.target.value)
							}
							sx={{ marginTop: '10px' }}
						/>

						{/* <input
							type='text'
							value={name}
							onChange={(e) =>
								setName(e.target.value)
							}
						/> */}
						{/* <label>Email</label> */}
						<TextField
							id='outlined-basic'
							label='Email'
							variant='outlined'
							value={email}
							onChange={(e) =>
								setEmail(e.target.value)
							}
							sx={{
								marginTop: '10px',
								marginBottom: '10px',
							}}
						/>
						{/* <input
							type='email'
							value={email}
							onChange={(e) =>
								setEmail(e.target.value)
							}
						/>
						<label>Password</label> */}
						<TextField
							id='outlined-password-input'
							label='Password'
							type='password'
							// autoComplete='current-password'
							variant='outlined'
							value={password}
							onChange={(e) =>
								setPassword(e.target.value)
							}
							sx={{
								marginTop: '10px',
								marginBottom: '10px',
							}}
						/>
						{/* <input
							type='password'
							value={password}
							onChange={(e) =>
								setPassword(e.target.value)
							}
						/> */}
						{/* <button
							type='submit'
							onClick={handleSubmit}>
							Signup
						</button> */}
						<Button
							type='submit'
							onClick={handleSubmit}
							variant='contained'>
							Signin
						</Button>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								marginTop: '10px',
							}}>
							<a href='/login'>
								Already have an account?
							</a>
						</div>
					</div>
				</form>
			</Paper>
		</Box>
		// </div>
	);
}
