const { Router } = require('express');
const { Genre, Platform, Videogame } = require('../db');
const {
	getAllVideogames,
	getVideogameById,
	getVideogameByName,
	createVideogame,
} = require('./controllers');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.delete('/videogame/:id', (req, res) => {
	Videogame.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then(res.status(200).send('El videojuego fue eliminado correctamente'))
		.catch((err) => console.log(err));
});

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

router.get('/platforms', async (req, res) => {
	try {
		const platforms = await Platform.findAll();
		res.status(200).json(platforms);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
