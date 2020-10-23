'use strict';
const sequelizePaginate = require('sequelize-paginate')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      movies.belongsTo(models.genre)
      movies.belongsToMany(models.users, {through : 'models.reviews'})
      movies.hasMany(models.reviews)
    }
  };
  movies.init({
    title: {
      type : DataTypes.STRING,
      validate :{
        notEmpty: {
          msg : "Please input the title.",
        }
      }
    },
    picture:{
      type : DataTypes.STRING,
      validate :{
        notEmpty: {
          msg : "Please input the picture here."
        }
      }
    },
    trailer:{
      type : DataTypes.STRING,
      validate : {
        isUrl : true
      }
    },
    year: {
      type: DataTypes.INTEGER,
      validate : { 
        isNumeric: true,
        notEmpty: {
          msg : "Please input the year.",
        }
      }
    },
    synopsis: {
      type : DataTypes.TEXT,
      validate : {
        notEmpty : {
          msg : "Please input the synopsis here."
        }
      }
    },
    character: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Please input the characters here."
        }
      }
    },
    genreId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'movies',
  });
  sequelizePaginate.paginate(movies);
  return movies;
};  
