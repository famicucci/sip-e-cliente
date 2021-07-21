import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';
import cyan from '@material-ui/core/colors/cyan';
import yellow from '@material-ui/core/colors/yellow';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: blue[700],
		},
		secondary: {
			main: teal[500],
		},
		success: {
			main: green[600],
			dark: green[800],
		},
		warning: { main: yellow[600], dark: yellow[700] },
		accion: {
			main: cyan[700],
			dark: cyan[800],
		},
	},
});

export default theme;
