import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const SpinnerTabla = ({ cantColumnas }) => {
	return (
		<TableRow>
			<TableCell colSpan={cantColumnas}>
				<div style={{ width: '100%' }}>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						css={{ height: 450 }}
						m={1}
						p={1}
						bgcolor="background.paper"
					>
						<CircularProgress />
					</Box>
				</div>
			</TableCell>
		</TableRow>
	);
};

export default SpinnerTabla;
