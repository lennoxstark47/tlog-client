import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
		<div>
			<h1>Createblog</h1>
			{localStorage.getItem('name') && (
				<div>
					<h2>Welcome {createdBy}</h2>
				</div>
			)}
			<form>
				<label>Title</label>
				<input
					type='text'
					value={title}
					onChange={(e) =>
						setTitle(e.target.value)
					}
				/>
				<label>Content</label>
				<textarea
					value={content}
					onChange={(e) =>
						setContent(e.target.value)
					}
				/>
				{/* <p>{createdBy}</p> */}
				<button
					type='submit'
					onClick={handleSubmit}>
					Submit
				</button>
			</form>
		</div>
	);
}
