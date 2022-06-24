const { Router } = require('express');
const axios = require('axios');
const { Videogame, Genre } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
const { API_KEY } = process.env;
// Ejemplo: router.use('/auth', authRouter);

const getInfoAPI = async (page = 5, name = '') => {
	//TODO: Paginar, ver como hacer el search por name en toooooooda la API
	let videogames = [];

	for (let i = 1; i <= page; i++) {
		const apiUrl = await axios.get(
			`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}&search=${name}`
		);
		const listOf100 = await apiUrl.data.results;
		videogames = videogames.concat(listOf100);
		console.log('Videojuegos cargados por página: ' + videogames.length);
	}

	const videogamesFormat = videogames.map((e) => {
		return {
			name: e.name,
			description: e.description && e.description,
			background_image: e.background_image,
			released: e.released,
			rating: e.rating,
			platforms:
				e.platforms && e.platforms.map((p) => p.platform.name).join(', '),
			genres: e.genres && e.genres.map((g) => g.name).join(', '),
		};
	});
	return videogamesFormat;
};

const getVideogame = async (vgId) => {
	const videogame = (
		await axios.get(`https://api.rawg.io/api/games/${vgId}?key=${API_KEY}`)
	).data;

	console.log(videogame);

	const videogameFormat = {
		id: videogame.id,
		background_image: videogame.background_image,
		name: videogame.name,
		description:
			videogame.description &&
			videogame.description
				.replaceAll('<p>', '')
				.replaceAll('</p>', '')
				.replaceAll('h3', '')
				.replaceAll('</h3>', '')
				.replaceAll('\n', '')
				.replaceAll('<>', ' ')
				.replaceAll('</>', ': ')
				.split('<br />')
				.join(''),
		released: videogame.released,
		rating: videogame.rating,
		platforms: videogame.platforms.map((p) => p.platform.name).join(', '),
		genres: videogame.genres.map((g) => g.name).join(', '),
	};

	return videogameFormat;
};

const getInfoDatabase = async () => {
	return await Videogame.findAll({
		include: {
			model: Genre,
			attributes: ['name'],
			through: {
				attributes: [],
			},
		},
	});
};

const getAllVideogames = async () => {
	const apiVideogames = await getInfoAPI();
	const dbVideogames = await getInfoDatabase();

	return apiVideogames.concat(dbVideogames);
};

const createVideogame = async (videogame) => {
	const {
		name,
		description,
		background_image,
		released,
		rating,
		platforms,
		genres,
	} = videogame;
	const videogameCreated = await Videogame.create({
		name,
		description,
		background_image,
		released,
		rating,
		platforms,
	});
	const genreDb = await Genre.findAll({
		where: { name: genres },
	});
	videogameCreated.addGenres(genreDb);
	return videogameCreated;
};

router.get('/videogames', async (req, res) => {
	//TODO: ?
	const name = req.query.name;
	try {
		const videogames = await getAllVideogames();
		if (name) {
			const videogamesName = videogames.filter((videogame) =>
				videogame.name.toLowerCase().includes(name.toLowerCase())
			);
			videogamesName.length
				? res.status(200).send(videogamesName)
				: res.status(404).send('No se encontraron resultados');
		} else {
			res.status(200).send(videogames);
		}
	} catch (error) {
		console.log(error);
	}
});

router.get('/videogame/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const videogame = await getVideogame(id);
		res.status(200).send(videogame);
		// const videogame = await Videogame.findByPk(id);
		// if (videogame) {
		// 	res.status(200).send(videogame);
		// } else {
		// 	res.status(404).send('No se encontró el videojuego');
		// }
	} catch (error) {
		console.log(error);
	}
});

router.post('/videogames', async (req, res) => {
	try {
		const newVideogame = await createVideogame(req.body);
		res.status(201).send(newVideogame);
	} catch (error) {
		console.log(error);
	}
});

router.get('/genres', async (req, res) => {
	try {
		const genres = await Genre.findAll();
		res.status(200).send(genres);
	} catch (error) {
		console.log(error);
	}
});

(module.exports = router), getInfoAPI;
