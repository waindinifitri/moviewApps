'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      reviews.belongsTo(models.users)
      reviews.belongsTo(models.movies)
    }
  };
  reviews.init({
    comment: {
      type : DataTypes.TEXT,
      validate : {
        notEmpty : {
          msg : "Tell us your experience about the movie!"
        }
      }
    },
    rating: {
      type : DataTypes.INTEGER,
      validate : {
       min: 0,
       max: 10,
        notEmpty : {
          msg : "Rate this movie, Thanks!"
        }
      }
    }, 
    userId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'reviews',
  });
  return reviews;
};