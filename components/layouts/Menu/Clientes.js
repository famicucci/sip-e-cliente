import React from 'react';
import Link from 'next/link';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';

const Clientes = () => {
	return (
		<Link href="\clientes">
			<ListItem button>
				<ListItemIcon>
					<PeopleIcon />
				</ListItemIcon>
				<ListItemText primary="Clientes" />
			</ListItem>
		</Link>
	);
};

export default Clientes;
