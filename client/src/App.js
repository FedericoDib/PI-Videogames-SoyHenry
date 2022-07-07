import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import DetailVideogame from './components/DetailVideogame/DetailVideogame.jsx';
import CreateVideogame from './components/CreateVideogame/CreateVideogame.jsx';
import { useSelector } from 'react-redux';

function App() {
	const videogames = useSelector((state) => state.videogames);
	return (
		<BrowserRouter>
			<div className='App'>
				<Route exact path='/' component={LandingPage} />
				<Route exact path='/videogames' component={Home} />
				<Route exact path='/create' component={CreateVideogame} />
				<Route
					exact
					path='/videogame/:id'
					render={({ match }) => (
						<DetailVideogame match={match} currentVideogames={videogames} />
					)}
				/>
			</div>
		</BrowserRouter>
	);
}

export default App;
