import React, { useContext } from 'react';
import Link from 'next/link';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Collapse,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LayersIcon from '@material-ui/icons/Layers';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { MenuContext } from '../../../context/MenuContext';

const useStyles = makeStyles((theme) => ({
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

const Stock = () => {
	const classes = useStyles();

	const { openStock, handleClickStock } = useContext(MenuContext);

	return (
		<>
			<ListItem button onClick={handleClickStock}>
				<ListItemIcon>
					<LayersIcon />
				</ListItemIcon>
				<ListItemText primary="Stock" />
				{openStock ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={openStock} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<Link href="\stock\producto">
						<ListItem button className={classes.nested}>
							<ListItemIcon>
								<ArrowRightIcon />
							</ListItemIcon>
							<ListItemText primary="Total" />
						</ListItem>
					</Link>
					<Link href="\stock\punto-stock">
						<ListItem button className={classes.nested}>
							<ListItemIcon>
								<ArrowRightIcon />
							</ListItemIcon>
							<ListItemText primary="Puntos de stock" />
						</ListItem>
					</Link>
					<Link href="\stock\movimientos">
						<ListItem button className={classes.nested}>
							<ListItemIcon>
								<ArrowRightIcon />
							</ListItemIcon>
							<ListItemText primary="Movimientos" />
						</ListItem>
					</Link>
				</List>
			</Collapse>
		</>
	);
};

export default Stock;
