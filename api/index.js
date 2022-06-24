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
const { conn, Genre, Platform } = require('./src/db.js');
// const Genre = require('./src/models/Genre.js');
const syncOptions = { force: true };
const API_KEY = '7bbd84e90b1c4ab58017e7caca40839d';
const getInfoAPI = require('./src/routes/index.js');

// Syncing all the models at once.
conn.sync(syncOptions).then(() => {
	server.listen(3001, async () => {
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

			//TODO ?

			// const APIvideogames = getInfoAPI(1);
			// let APIplataforms = APIvideogames.map((videogame) =>
			// 	videogame.platforms.split(', ')
			// );
			// APIplataforms = [...new Set(APIplataforms.flat())].sort();

			// APIplataforms.forEach((p) => {
			// 	Platform.create({
			// 		name: p,
			// 	});
			// });

			console.log('Database synced');
		}
	});
});
