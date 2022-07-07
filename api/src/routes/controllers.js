const axios = require('axios');
const { Videogame, Genre, Op } = require('../db');
const { API_KEY } = process.env;

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
		const videogame = await Videogame.findByPk(vgId, {
			include: {
				model: Genre,
				attributes: ['name'],
				through: {
					attributes: [],
				},
			},
		});
		const videogameFormat = {
			name: videogame.name,
			description: videogame.description,
			image: videogame.image,
			released: videogame.released,
			rating: videogame.rating,
			platforms: videogame.platforms,
			genres: videogame.genres.map((g) => g.name).join(', '),
		};
		return videogameFormat;
	} else {
		const videogame = (
			await axios.get(`https://api.rawg.io/api/games/${vgId}?key=${API_KEY}`)
		).data;

		const videogameFormat = {
			id: 'api' + videogame.id,
			background_image: videogame.background_image,
			name: videogame.name,
			description: videogame.description_raw,
			released: videogame.released,
			rating: videogame.rating,
			platforms: videogame.platforms.map((p) => p.platform.name).join(', '),
			genres: videogame.genres.map((g) => g.name).join(', '),
		};

		return videogameFormat;
	}
};

const getVideogameByName = async (name) => {
	try {
		const videogame = await Videogame.findAll({
			where: {
				name: {
					[Op.iLike]: `%${name}%`,
				},
			},
			include: {
				model: Genre,
				attributes: ['name'],
				through: {
					attributes: [],
				},
			},
		});
		if (videogame.length) {
			const videogameFormat = videogame.map((vg) => {
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
			return videogameFormat;
		} else {
			const videogame = (
				await axios.get(
					`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`
				)
			).data.results;
			console.log('videogame' + videogame);
			const videogamesFormat = videogame.map((e) => {
				return {
					id: 'api' + e.id,
					name: e.name,
					description: e.description,
					image: e.background_image,
					released: e.released,
					rating: e.rating,
					platforms:
						e.platforms && e.platforms.map((p) => p.platform.name).join(', '),
					genres: e.genres && e.genres.map((g) => g.name).join(', '),
				};
			});
			return videogamesFormat;
		}
	} catch (error) {
		console.log(error);
	}
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
	let platformsFormated = videogame.platforms && videogame.platforms.join(', ');
	const {
		id = 'database' + uniqueId,
		name,
		description,
		image,
		released,
		rating,
		genres,
	} = videogame;

	const videogameCreated = await Videogame.create({
		id,
		name,
		description,
		image,
		released,
		rating,
		platforms: platformsFormated,
	});
	const genreDb = await Genre.findAll({
		where: { name: genres },
	});
	videogameCreated.addGenres(genreDb);
	return videogameCreated;
};

module.exports = {
	getAllVideogames,
	getVideogameById,
	getVideogameByName,
	getInfoDatabase,
	createVideogame,
};
