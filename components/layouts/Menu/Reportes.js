import React from 'react';
import Link from 'next/link';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

const Reportes = () => {
	return (
		<Link href="\reportes">
			<ListItem button>
				<ListItemIcon>
					<TrendingUpIcon />
				</ListItemIcon>
				<ListItemText primary="Reportes" />
			</ListItem>
		</Link>
	);
};

export default Reportes;
