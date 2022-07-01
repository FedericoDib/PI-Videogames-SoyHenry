const { Router } = require('express');
const axios = require('axios');
const { Videogame, Genre, Op } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
const { API_KEY } = process.env;
// Ejemplo: router.use('/auth', authRouter);

const getAllVideogames = async () => {
	const dbVideogames = await getInfoDatabase();
	const videogames = dbVideogames.map((vg) => {
		return {
			id: vg.id,
			name: vg.name,
			description: vg.description,
			image: vg.image,
			released: vg.released,
			rating: vg.rating,
			platforms: vg.platforms,
			genres: vg.genres.map((g) => g.name).join(', '),
		};
	});
	return videogames;
};

const getVideogameById = async (vgId) => {
	if (vgId.includes('api')) {
		vgId = vgId.slice(3);

		const videogame = (
			await axios.get(`https://api.rawg.io/api/games/${vgId}?key=${API_KEY}`)
		).data;

		const videogameFormat = {
			id: 'api' + videogame.id,
			background_image: videogame.background_image,
			name: videogame.name,
			description: videogame.description_raw && videogame.description_raw,
			released: videogame.released,
			rating: videogame.rating,
			platforms: videogame.platforms.map((p) => p.platform.name).join(', '),
			genres: videogame.genres.map((g) => g.name).join(', '),
		};

		return videogameFormat;
	} else if (vgId.includes('database')) {
		const videogame = await Videogame.findByPk(vgId);
		const videogameFormat = {
			background_image: videogame.background_image,
			name: videogame.name,
			description: videogame.description,
			released: videogame.released,
			rating: videogame.rating,
			platforms: videogame.platforms,
			genres: videogame.genres,
		};
		return videogameFormat;
	}
};

const getVideogameByName = async (name) => {
	const videogame = (
		await axios.get(
			`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`
		)
	).data.results;
	const videogamesFormat = videogame.map((e) => {
		return {
			id: e.id,
			name: e.name,
			description: e.description && e.description,
			image: e.background_image,
			released: e.released,
			rating: e.rating,
			platforms:
				e.platforms && e.platforms.map((p) => p.platform.name).join(', '),
			genres: e.genres && e.genres.map((g) => g.name).join(', '),
		};
	});
	return videogamesFormat;
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

const createVideogame = async (videogame) => {
	let uniqueId = new Date().getTime();
	const {
		id = 'database' + uniqueId,
		name,
		description,
		background_image,
		released,
		rating,
		platforms,
		genres,
	} = videogame;
	const videogameCreated = await Videogame.create({
		id,
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
	console.log(videogameCreated);
	return videogameCreated;
};

router.get('/videogames', async (req, res) => {
	const name = req.query.name;
	try {
		if (name) {
			const videogames = await getVideogameByName(name);
			videogames.length
				? res.status(200).send(videogames)
				: res.status(404).send('No se encontraron resultados');
		} else {
			const videogames = await getAllVideogames();
			res.status(200).send(videogames);
		}
	} catch (error) {
		console.log(error);
	}
});

router.get('/videogame/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const videogame = await getVideogameById(id);
		res.status(200).send(videogame);
	} catch (error) {
		console.log(error);
	}
});

router.post('/videogames', async (req, res) => {
	console.log('hola');
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
		res.status(200).json(genres);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
