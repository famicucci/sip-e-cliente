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
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { MenuContext } from '../../../context/MenuContext';

const useStyles = makeStyles((theme) => ({
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

const Ventas = () => {
	const classes = useStyles();

	const { openVentas, handleClickVentas } = useContext(MenuContext);

	return (
		<>
			<ListItem button onClick={handleClickVentas}>
				<ListItemIcon>
					<ShoppingCartIcon />
				</ListItemIcon>
				<ListItemText primary="Ventas" />
				{openVentas ? <ExpandLess /> : <ExpandMore />}
			</ListItem>

			<Collapse in={openVentas} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<Link href="\ventas\consultar">
						<ListItem button className={classes.nested}>
							<ListItemIcon>
								<ArrowRightIcon />
							</ListItemIcon>
							<ListItemText primary="Consultar" />
						</ListItem>
					</Link>
					<Link href="\ventas\nuevo">
						<ListItem button className={classes.nested}>
							<ListItemIcon>
								<ArrowRightIcon />
							</ListItemIcon>
							<ListItemText primary="Nuevo" />
						</ListItem>
					</Link>
					<Link href="\ventas\productos-mover">
						<ListItem button className={classes.nested}>
							<ListItemIcon>
								<ArrowRightIcon />
							</ListItemIcon>
							<ListItemText primary="Prod. a Mover" />
						</ListItem>
					</Link>
				</List>
			</Collapse>
		</>
	);
};

export default Ventas;
