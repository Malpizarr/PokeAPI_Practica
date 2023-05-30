import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Card, CardContent, Typography, Grid } from '@mui/material';

// Note: `user` comes from the URL, courtesy of our router
const Profile = ({ user }) => {
	const [time, setTime] = useState(Date.now());
	const [count, setCount] = useState(10);

	useEffect(() => {
		let timer = setInterval(() => setTime(Date.now()), 1000);
		return () => clearInterval(timer);
	}, []);

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={6} md={4}>
				<Card>
					<CardContent>
						<Typography variant="h5" component="div">
							Tarjeta 1
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Contenido de la tarjeta 1
						</Typography>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} sm={6} md={4}>
				<Card>
					<CardContent>
						<Typography variant="h5" component="div">
							Tarjeta 2
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Contenido de la tarjeta 2
						</Typography>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12} sm={6} md={4}>
				<Card>
					<CardContent>
						<Typography variant="h5" component="div">
							Tarjeta 3
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Contenido de la tarjeta 3
						</Typography>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}

export default Profile;
