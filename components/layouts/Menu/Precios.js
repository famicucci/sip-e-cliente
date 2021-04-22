import React from 'react';
import Link from 'next/link';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

const Precios = () => {
	return (
		<Link href="\precios">
			<ListItem button>
				<ListItemIcon>
					<LocalOfferIcon />
				</ListItemIcon>
				<ListItemText primary="Precios" />
			</ListItem>
		</Link>
	);
};

export default Precios;
