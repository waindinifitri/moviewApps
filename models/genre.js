'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      genre.hasMany(models.movies)
    }
  };
  genre.init({
    genreName: {
      type: DataTypes.STRING,
      validate : {
        notEmpty :{
          msg : "Please input the genre here."
        }
      }
    },
  }, {
    sequelize,
    modelName: 'genre',
  });
  return genre;
};