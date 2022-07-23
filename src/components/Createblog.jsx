import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Createblog() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [createdBy, setCreatedBy] = useState('');
	useEffect(() => {
		console.log(localStorage.getItem('name'));
		setCreatedBy(localStorage.getItem('name'));
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(title, content, createdBy);

		try {
			const res = await axios.post(
				'https://tlogapi.herokuapp.com/blog/create',
				{ title, body: content, createdBy }
			);

			console.log(res.data.success);
			console.log(res.data.data.title);
			if (res.data.success) {
				window.location.href = '/';
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
					minHeight: '400px',
					padding: '20px',
				}}>
				<h1>Createblog</h1>
				{localStorage.getItem('name') && (
					<div>
						<h2>Welcome {createdBy}</h2>
					</div>
				)}
				<form>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							// alignItems: 'center',
						}}>
						{/* <label>Title</label> */}
						<TextField
							id='title'
							label='Title'
							value={title}
							onChange={(e) =>
								setTitle(e.target.value)
							}
							variant='outlined'
							sx={{ marginTop: '10px' }}
						/>
						{/* <input
							type='text'
							value={title}
							onChange={(e) =>
								setTitle(e.target.value)
							}
						/> */}
						{/* <label>Content</label> */}
						<TextField
							id='content'
							label='Content'
							value={content}
							onChange={(e) =>
								setContent(e.target.value)
							}
							variant='outlined'
							multiline
							sx={{
								marginTop: '10px',
								marginBottom: '10px',
							}}
						/>
						{/* <textarea
							value={content}
							onChange={(e) =>
								setContent(e.target.value)
							}
						/> */}
						{/* <p>{createdBy}</p> */}
						{/* <button
							type='submit'
							onClick={handleSubmit}>
							Submit
						</button> */}
						<Button
							type='submit'
							onClick={handleSubmit}
							variant='contained'>
							Submit
						</Button>
					</div>
				</form>
			</Paper>
		</Box>
		// </div>
	);
}
