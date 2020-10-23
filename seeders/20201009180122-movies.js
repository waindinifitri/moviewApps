'use strict';
const fs = require('fs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const parseData = JSON.parse(fs.readFileSync('./datamovies.json'));
   const moviesData = [];
   
   parseData.forEach(data => {  
     const { title, picture, trailer, year, synopsis, character, genreId } = data;
     moviesData.push({
      title,
      picture,
      trailer,
      year,
      synopsis,
      character,
      genreId,
      createdAt : new Date(),
      updatedAt : new Date()
     })
   })
   await queryInterface.bulkInsert('movies', moviesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('movies', null, {});
  }
};