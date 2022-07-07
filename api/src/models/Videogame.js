const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'videogame',
		{
			id: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
			},
			image: {
				type: DataTypes.STRING,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: '',
			},
			released: {
				type: DataTypes.STRING,
			},
			rating: {
				type: DataTypes.DECIMAL,
			},
			platforms: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{ timestamps: false }
	);
};

// Videojuego con las siguientes propiedades:
// ID: * No puede ser un ID de un videojuego ya existente en la API rawg
// Nombre *
// Descripción *
// Fecha de lanzamiento
// Rating
// Plataformas *
