const { movies, genre } = require('../models')

class GenreController {
    static async getGenre (req,res, next) {
        try {
            const result = await genre.findAll({
                order: [['id', 'ASC']],
                include : [movies]
            })
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    static async addGenre (req,res, next) {
        const { genreName } = req.body;
        try {
            const result = await genre.findOne({
                where: {
                    genreName
                }
            })
            if (result) {
                res.status(400).json({msg: 'Genre already exists.'})    
            } else {
                const newGenre = await genre.create({
                    genreName,
                })
                res.status(200).json(newGenre)
            }
            
        } catch (error) {
            next(error)
        }
    }
    static async deleteGenre (req,res, next) {
        const id = req.params.id;
        try {
            const result = await genre.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({result, msg : 'Success deleted'})
        } catch (error) {
            next(error)
        }
    }
    static async findGenre (req,res, next) {
        const { id } = req.params.id;
        try {
            const result = await genre.findOne({
                where: {
                    id
                }
            })
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    GenreController
};