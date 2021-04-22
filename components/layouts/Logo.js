import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AdjustIcon from '@material-ui/icons/Adjust';

const useStyles = makeStyles((theme) => ({
	menuLogo: {
		marginRight: theme.spacing(0.35),
	},
}));

const Logo = (props) => {
	const classes = useStyles();

	return (
		<>
			<AdjustIcon className={classes.menuLogo} color={props.color} />
			<Typography variant="h6" color={props.color}>
				Sip-e
			</Typography>
		</>
	);
};

export default Logo;
