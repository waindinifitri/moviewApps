const { movies, genre } = require('../models')
const { Op, where } = require('sequelize')

class MovieController {

    static async getMovie (req,res, next) {
        const page = req.params.page
        console.log(page)
        try {
            const result = await movies.findAll({
                order : [
                    ['id', 'ASC']
                ], include : [
                    genre
                ]
            })
            const options = {
                page,
                paginate: 10,
            }
            const {docs, pages, total } = await movies.paginate(options)
            if (page > pages) {
                res.status(404)
            }
            res.status(200).json(docs)
        } 
        catch (error) {
            next(error)
        }
    }

    static async addMovie (req,res, next) {
        const { title, trailer, year, synopsis, character, genreId } = req.body;
        const picture = req.file.path;
        try {
            const result = await movies.findOne({
                where: {
                    title
                }
            })
            if (result) {
                res.status(409).json({msg: 'Movie already exists.'})    
            } else {
                const newMovie = await movies.create({
                    title, 
                    picture, 
                    trailer, 
                    year, 
                    synopsis, 
                    character, 
                    genreId, 
                })
                res.status(201).json({newMovie: newMovie})
            }
            
        } catch (error) {
        console.log(error)
            next(error)
        }
    }


    static async updateMovie (req,res, next) {
        const id = req.params.id;
        const { title, trailer,year, synopsis, character, genreId } = req.body;
        const picture = req.file.path;
        try {
                const result = await movies.findOne({
                    where: {
                        id
                    }
                })
                if (result) {
                    const updateMovie = await movies.update ({
                        picture, trailer, year, synopsis, character, genreId
                    }, {where: { 
                            id 
                        } 
                    });
                    res.status(201).json({message: 'Updated succesfully!'})
                } else {
                    res.status(404).json({ message: 'Cannot find the movie.'})
                }
        } catch (error) {
            next(error)
        }
    }

    static async deleteMovie (req,res, next) {
        const id = req.params.id
        try {
            const result = movies.destroy ({
                where: {
                    id
                }
            })
            res.status(200).json({result, msg: 'Movie deleted'})
        } 
        catch (error) {
            next(error)
        }
    }
    static async search(req, res, next){
        const { search } = req.body;
        try {             
            const found = await movies.findAll({                 
                where: {                     
                    title: {                         
                        [Op.like]: '%' + search + '%'                     
                    }                 
                }             
            });          
            if(found){                 
                res.status(201).json(found);             
            } else {                 
                res.status(409).json({                     
                    msg: "Movie is not available!"                 
                });             
            }              
        }
        catch (error) {
            next (error);
        }
    }
    static async findById (req,res, next) {
        const id = req.params.id;
        try {
            const result = await movies.findOne ({
                where: {
                    id
                }
            })
            if (result) {
                res.status(200).json(result)    
            }
            else {
                res.status(404).json(`Title is not found.`)
            }
        } 
        catch (error) {
            next(error)
        }
    }
}



module.exports = {
    MovieController
}