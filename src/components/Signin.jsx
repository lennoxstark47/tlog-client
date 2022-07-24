import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

export default function Signin() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [open, setOpen] = React.useState(false);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const makeClear = () => {
		setEmail('');
		setPassword('');
		setOpen(false);
	};

	const action = (
		<React.Fragment>
			<Button
				color='secondary'
				size='small'
				onClick={makeClear}>
				UNDO
			</Button>
			<IconButton
				size='small'
				aria-label='close'
				color='inherit'
				onClick={handleClose}>
				<CloseIcon fontSize='small' />
			</IconButton>
		</React.Fragment>
	);

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
				return setOpen(true);
				// alert(res.data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
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
					backgroundColor: '#DAF1F8',
				}}>
				<h1>Signin</h1>
				<form>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
						}}>
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
								backgroundColor: 'White',
							}}
						/>

						<TextField
							id='outlined-password-input'
							label='Password'
							type='password'
							value={password}
							onChange={(e) =>
								setPassword(e.target.value)
							}
							variant='outlined'
							sx={{
								marginTop: '10px',
								marginBottom: '10px',
								backgroundColor: 'White',
							}}
						/>
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
								marginTop: '50px',
							}}>
							<a href='/signup'>
								Dont Have an account?
							</a>
						</div>
					</div>
				</form>
			</Paper>
			<div>
				<Snackbar
					open={open}
					autoHideDuration={6000}
					onClose={handleClose}
					message='Username/Password is incorrect'
					action={action}
				/>
			</div>
		</Box>
	);
}
