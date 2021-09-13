import React, { useState, useEffect, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import GlobalDataContext from '../../context/globalData/GlobalDataContext';
import moment from 'moment';

const ChartGrossRevenue = () => {
	const { invoices, getInvoicing } = useContext(GlobalDataContext);

	const [chartData, setChartData] = useState({});

	const startDate = '2021-07-02';
	const endDate = '2021-10-04';

	const chart = (startDate, endDate) => {
		const startMonth = moment(startDate, 'YYYY/MM/DD').format('M');
		const endMonth = moment(endDate, 'YYYY/MM/DD').format('M');

		let monthsBetweenDates = [];
		for (let i = startMonth - 1; i < endMonth; i++) {
			monthsBetweenDates.push(moment().locale('es').month(i).format('MMMM'));
		}

		const validInvoices = invoices.filter(
			(x) => x.tipo === 'fac' && (x.estado === 'v') & (x.estadoPago === 'Pago')
		);

		let amountPerMonth = {};
		monthsBetweenDates.forEach((x) => {
			amountPerMonth[x] = amountPerMonth[x] ?? 0;
		});

		validInvoices.forEach((x) => {
			amountPerMonth[moment(x.createdAt).locale('es').format('MMMM')] +=
				parseFloat(x.importeFinal);
		});

		setChartData({
			labels: monthsBetweenDates,
			datasets: [
				{
					label: 'Ingresos totales',
					data: Object.values(amountPerMonth),
					borderColor: 'rgb(75, 192, 192)',
					borderWidth: 3,
					tension: 0.1,
				},
				// {
				// 	label: 'Ingresos gastos',
				// 	data: [400000, 650000, 268000, 630000, 547000, 700000],
				// 	borderColor: 'red',
				// 	borderWidth: 3,
				// 	tension: 0.1,
				// },
			],
		});
	};

	useEffect(() => {
		getInvoicing(startDate, endDate);
	}, []);

	useEffect(() => {
		chart(startDate, endDate);
	}, [invoices]);

	return (
		<Line
			data={chartData}
			options={{
				responsive: true,
			}}
		/>
	);
};

export default ChartGrossRevenue;
