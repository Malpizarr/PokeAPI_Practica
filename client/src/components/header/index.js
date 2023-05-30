import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { h } from 'preact';

function Header() {
	return (
		<AppBar positionAbsolute sx={{
			backgroundColor: '#e0dee1',
			color: '#000000',
			borderBottom: '1px dashed grey'

		}}>
			<Toolbar>
				<Typography variant="h6" sx={{ flexGrow: 1 }}>
					Mi Sitio
				</Typography>
				<Button href='/' color="inherit">Inicio</Button>
				<Button href='/profile' color="inherit">Acerca de</Button>
				<Button href='profile/mau' color="inherit">Contacto</Button>
			</Toolbar>
		</AppBar>
	);
}

export default Header;

