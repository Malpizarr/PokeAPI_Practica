import { h, Component } from 'preact';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import {Card, CardContent, Button, TextField, Box} from "@mui/material";
import { useSpring, animated } from 'react-spring';
import { PulseLoader } from 'react-spinners';
import {ModoOscuroContext} from "../../components/ModoOscuro";

const AnimatedCard = animated(Card);

class PokemonCard extends Component {
	static contextType = ModoOscuroContext;

	render() {
		const { pokemon, index } = this.props;
		const { darkMode } = this.context;

		const [props, set] = useSpring(() => ({
			scale: 1,
			config: { mass: 5, tension: 350, friction: 40 },
		}));

		const link1 = `https://www.pokemon.com/es/pokedex/${pokemon.name}`;

		return (
			<AnimatedCard
				key={index}
				sx={{
					backgroundColor: darkMode ? '#424242' : '#e0dee1',
					color: darkMode ? '#ffffff' : '#000000',
					margin: '10px',
				}}
				onMouseEnter={() => set({ scale: 1.1 })}
				onMouseLeave={() => set({ scale: 1 })}
				style={{
					transform: props.scale.to(scale => `scale(${scale})`)
				}}

			>
				<a href={link1} target="_blank" style={{textDecoration: 'none',
					color: 'black',


				}}>
					<CardContent>
						<h1>{pokemon.type}: {pokemon.name}</h1>
						{pokemon.normal && <img src={pokemon.normal} alt={pokemon.name} />}
						{pokemon.shiny && <img src={pokemon.shiny} alt={pokemon.name} />}
						<h2>Abilities</h2>
						<h3>{pokemon.abilities}</h3>
					</CardContent>
				</a>
			</AnimatedCard>
		);
	}
}

class SearchBar extends Component {
	render() {
		const { search, onSearchChange, onSearch } = this.props;

		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>
				<TextField value={search} onChange={onSearchChange} variant="outlined" />
				<Button onClick={onSearch} variant="contained">Search</Button>
			</Box>
		);
	}
}

class App extends Component {
	state = {
		data: [],
		hasMoreItems: true,
		nextPokemonUrl: 'https://pokeapi.co/api/v2/pokemon',
		nextAbilityUrl: 'https://pokeapi.co/api/v2/ability',
		search: ''
	};

	loadItems = async () => {
		const pokemonRes = await axios.get(this.state.nextPokemonUrl);

		const pokemons = await Promise.all(
			pokemonRes.data.results.map(async pokemon => {
				const details = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
				return {
					name: pokemon.name,
					normal: details.data.sprites.front_default,
					shiny: details.data.sprites.front_shiny,
					abilities: details.data.abilities.map(ability => ability.ability.name).join(', '),
					type: 'pokemon'
				};
			})
		);

		this.setState(prevState => ({
			data: [...prevState.data, ...pokemons],
			nextPokemonUrl: pokemonRes.data.next,
		}));
	};

	handleSearchChange = (e) => {
		this.setState({ search: e.target.value });
	}

	handleSearch = async () => {
		if (this.state.search === '') {
			this.setState({
				data: [],
				hasMoreItems: true,
				nextPokemonUrl: 'https://pokeapi.co/api/v2/pokemon',
				nextAbilityUrl: 'https://pokeapi.co/api/v2/ability'
			});
		} else {
			try {
				const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.search}`);
				const pokemon = {
					name: response.data.name,
					normal: response.data.sprites.front_default,
					shiny: response.data.sprites.front_shiny,
					abilities: response.data.abilities.map(ability => ability.ability.name).join(', '),
					type: 'pokemon'
				};
				this.setState({ data: [pokemon] });
			} catch (error) {
				console.error(`No se pudo obtener el Pokémon: ${error}`);
			}
		}
	}

	render() {
		const loader = <PulseLoader color="#123abc" loading={this.state.hasMoreItems} size={10} />;

		return (
			<div>
				<SearchBar
					search={this.state.search}
					onSearchChange={this.handleSearchChange}
					onSearch={this.handleSearch}
				/>

				<InfiniteScroll
					pageStart={0}
					loadMore={this.loadItems}
					hasMore={this.state.hasMoreItems}
					loader={loader}
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						gap: '10px',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					{this.state.data.map((item, index) => (
						<PokemonCard key={index} pokemon={item} />
					))}
				</InfiniteScroll>
			</div>
		);
	}
}

export default App;