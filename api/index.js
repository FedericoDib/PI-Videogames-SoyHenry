//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const axios = require('axios');
const { conn, Genre, Platform, Videogame } = require('./src/db.js');
// const Genre = require('./src/models/Genre.js');
const syncOptions = { force: true };
const API_KEY = '7bbd84e90b1c4ab58017e7caca40839d';
const getInfoAPI = require('./src/routes/index.js');

// Syncing all the models at once.
conn.sync(syncOptions).then(() => {
	server.listen(process.env.PORT, async () => {
		console.log('%s listening at 3001'); // eslint-disable-line no-console

		if (syncOptions.force) {
			let chargeAPIGenres = await axios
				.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
				.then((response) => response.data.results)
				.catch((err) => console.log(err));

			chargeAPIGenres = chargeAPIGenres.sort((a, b) => {
				return a.name.localeCompare(b.name);
			});

			chargeAPIGenres.forEach((genre) => {
				Genre.create({
					name: genre.name,
				});
			});

			let videogames = [];
			for (let i = 1; i <= 5; i++) {
				const apiUrl = await axios.get(
					`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
				);
				const listOf100 = await apiUrl.data.results;
				videogames = videogames.concat(listOf100);
				console.log('Videojuegos cargados por página: ' + videogames.length);
			}

			// let APIplataforms = videogames.map((videogame) =>
			// 	videogame.platforms.map((platform) => platform.platform.name)
			// );

			// APIplataforms = [...new Set(APIplataforms.flat())].sort();
			// console.log(APIplataforms);

			// APIplataforms.forEach((p) => {
			// 	Platform.create({
			// 		name: p,
			// 	});
			// });

			const VideogameFormat = videogames.map((videogame) => {
				return {
					id: 'api' + videogame.id,
					name: videogame.name,
					description: videogame.description,
					image: videogame.background_image,
					released: videogame.released,
					rating: videogame.rating,
					platforms:
						videogame.genres &&
						videogame.platforms
							.map((platform) => platform.platform.name)
							.join(', '),
					genres: videogame.genres && videogame.genres.map((g) => g.name),
				};
			});

			VideogameFormat.forEach(
				async ({
					id,
					name,
					description,
					image,
					released,
					rating,
					platforms,
					genres,
				}) => {
					const newVideogame = await Videogame.create({
						id,
						name,
						description,
						image,
						released,
						rating,
						platforms,
					});
					genres.forEach(async (genre) => {
						const newGenre = await Genre.findOne({ where: { name: genre } });
						await newVideogame.addGenre(newGenre);
					});
				}
			);
			console.log('Database synced');
		}
	});
});
