import React from 'react';
import Link from 'next/link';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const Gastos = () => {
	return (
		<Link href="\gastos">
			<ListItem button>
				<ListItemIcon>
					<AttachMoneyIcon />
				</ListItemIcon>
				<ListItemText primary="Gastos" />
			</ListItem>
		</Link>
	);
};

export default Gastos;
