import { h, Component } from 'preact';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import {ModoOscuroContext} from "./ModoOscuro";
import Header from './Header';
import Home from '../routes/home';
import Profile from '../routes/profile';
import { Router } from 'preact-router';

class App extends Component {
	state = {
		darkMode: false,
	};

	toggleDarkMode = () => {
		this.setState(prevState => ({
			darkMode: !prevState.darkMode,
		}));
	};

	render() {
		const { darkMode } = this.state;

		const theme = createTheme({
			palette: {
				mode: darkMode ? 'dark' : 'light',
			},
		});

		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<ModoOscuroContext.Provider value={{ darkMode: darkMode, toggleDarkMode: this.toggleDarkMode }}>
					<Header />
					<div id="app">
						<main>
							<Router>
								<Home path="/" />
								<Profile path="/profile/" user="me" />
								<Profile path="/profile/:user" />
							</Router>
						</main>
					</div>
				</ModoOscuroContext.Provider>
			</ThemeProvider>
		);
	}
}

export default App;
