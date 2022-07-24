import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function Blogs() {
	const [blogs, setBlogs] = useState([]);
	useEffect(() => {
		axios
			.get(
				'https://tlogapi.herokuapp.com/blog/browse'
			)
			.then((res) => {
				console.log(res.data.data);
				setBlogs(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<div style={{ padding: '10px' }}>
			<Paper
				elevation={3}
				sx={{
					padding: '15px',
					backgroundColor: '#AFD7FF',
				}}>
				<div
					style={{
						display: 'flex',

						justifyContent: 'center',
					}}>
					<Typography
						sx={{ fontSize: 14 }}
						color='text.secondary'
						gutterBottom>
						<h1>Blogs</h1>
					</Typography>
				</div>
				{/* <h1>Blogs</h1> */}
				<div
					style={{
						display: 'flex',

						justifyContent: 'center',
					}}>
					<a href='/login'>Create Blog</a>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						flexWrap: 'wrap',
						justifyContent: 'center',
					}}>
					{blogs.map((blog) => {
						return (
							<Card
								sx={{
									marginTop: '5px',
									marginLeft: '5px',
									marginRight: '5px',
									width: 275,
									// width: '100%',
									minHeight: 300,
									height: 'auto',
									backgroundColor: '#24ACD5',
								}}>
								<CardContent
								// sx={{
								// 	display: 'flex',
								// 	flexDirection: 'column',
								// 	// overflow: 'wrap',
								// }}
								>
									<Typography
										variant='h4'
										component='h4'>
										{blog.title}
									</Typography>
									<Typography
										variant='h5'
										component='h5'>
										{blog.createdBy}
									</Typography>
									<Typography
										variant='body2'
										component='p'
										sx={{
											wordWrap: 'break-word',
										}}>
										{/* <div
											style={{
												overflow: 'hidden',
												overflowY: 'scroll',
											}}> */}
										{blog.body}
										{/* </div> */}
									</Typography>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</Paper>
		</div>
	);
}
