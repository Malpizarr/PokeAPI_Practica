import { h, Component } from 'preact';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { ModoOscuroContext } from "../ModoOscuro";

class Header extends Component {
	static contextType = ModoOscuroContext;

	render() {
		const { darkMode, toggleDarkMode } = this.context;

		return (
			<AppBar position="absolute" sx={{ backgroundColor: darkMode ? '#424242' : '#e0dee1', color: '#000000', borderBottom: '1px dashed grey' }}>
				<Toolbar>
					<Typography variant="h6" sx={{ flexGrow: 1 }}>
						Mi Sitio
					</Typography>
					<Button href='/' color="inherit">Inicio</Button>
					<Button href='/profile' color="inherit">Acerca de</Button>
					<Button href='/profile/mau' color="inherit">Contacto</Button>
					<IconButton edge="end" color="inherit" onClick={toggleDarkMode}>
						{darkMode ? <LightModeIcon /> : <DarkModeIcon />}
					</IconButton>
				</Toolbar>
			</AppBar>
		);
	}
}

export default Header;
