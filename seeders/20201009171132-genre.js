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
   const parseData = JSON.parse(fs.readFileSync('./datagenres.json'));
   const genresData = [];
   
   parseData.forEach(data => {  
     const { genreName } = data;
     genresData.push({
      genreName,
      createdAt : new Date(),
      updatedAt : new Date()
     })
   })
   await queryInterface.bulkInsert('genres', genresData, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('genres', null, {});
  }
};
