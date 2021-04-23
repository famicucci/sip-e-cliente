import React, { useState } from 'react';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from '../components/layouts/Paginacion';

const usePaginacion = (rows) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	const FooterTabla = () => (
		<TableFooter>
			<TableRow>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25, { label: 'Todas', value: -1 }]}
					colSpan={3}
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					labelRowsPerPage="Filas por página:"
					SelectProps={{
						inputProps: { 'aria-label': 'rows per page' },
						native: true,
					}}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
					ActionsComponent={TablePaginationActions}
				/>
			</TableRow>
		</TableFooter>
	);

	return [FooterTabla, rowsPerPage, page, emptyRows];
};

export default usePaginacion;
