import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import DetailVideogame from './components/DetailVideogame/DetailVideogame';
import NavBar from './components/NavBar/NavBar';
import CreateVideogame from './components/CreateVideogame';

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<Route exact path='/' component={LandingPage} />
				<Route path='/videogames' component={NavBar} />
				<Route exact path='/videogames' component={Home} />
				<Route exact path='/create' component={CreateVideogame} />
				<Route
					exact
					path='/videogame/:id'
					render={({ match }) => <DetailVideogame match={match} />}
				/>
			</div>
		</BrowserRouter>
	);
}

export default App;
