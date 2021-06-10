import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';

const PrecioEditableCarrito = ({ precio }) => {
	const [value, setValue] = useState(0);
	const [edit, setEdit] = useState(false);

	useEffect(() => {
		setValue(precio);
	}, []);

	const onChange = (e) => {
		let a = e.target.value;
		if (Number.isNaN(parseInt(a))) {
			a = 0;
		}

		setValue(a);
	};

	const onClick = () => {
		setEdit(true);
	};

	const onBlur = () => {
		setEdit(false);
	};

	return (
		<div id="precio-editable" onClick={onClick}>
			{!edit ? (
				parseFloat(value).toFixed(2)
			) : (
				<TextField
					type="number"
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					InputProps={{
						inputProps: {
							min: 0,
						},
					}}
					autoFocus
				/>
			)}
		</div>
	);
};

export default PrecioEditableCarrito;
