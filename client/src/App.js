import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<Route exact path='/' component={LandingPage} />
				<Route exact path='/home' component={Home} />
			</div>
		</BrowserRouter>
	);
}

export default App;
