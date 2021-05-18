import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from '@material-ui/core';
import AdjustIcon from '@material-ui/icons/Adjust';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
	link: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Home() {
	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<AdjustIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sip-e
				</Typography>
				<Link href="/login" underline="none">
					<Button variant="contained" color="primary" className={classes.link}>
						Ir al login
					</Button>
				</Link>
			</div>
		</Container>
	);
}
