const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const { newsService } = require('../services')
const { newsValidation } = require('../validations')
const fs = require('fs')

const createNews = catchAsync(async(req, res) => {
    const image = req.file ? { imageUrl: req.file.path } : {}
    const newsBody = Object.assign(req.body, image)
    const validation = await newsValidation.validate(newsBody)
    if (validation.error) {
        const errorMessage = validation.error.details[0].message
        if (req.file) {
            fs.unlink(`${req.file.path}`, (err) => {
                if (err) {
                    console.error(err)
                    res.status(httpStatus.BAD_REQUEST).send({ message: err })
                }
            })
        }
        return res.status(httpStatus.BAD_REQUEST).send({
            message: errorMessage
        })
    }
    const news = await newsService.createNews(newsBody)
    res.status(httpStatus.CREATED).send(news)
})

const getNewsByPage = catchAsync(async(req, res) => {
    const perPage = 6;
    let page = parseInt(req.query.page) || 1;
    const news = await newsService.getAllNews(perPage, page)
    const totalNews = await newsService.countNews()
    if (!news) {
        res.status(httpStatus.NOT_FOUND).send("News not found")
    } else res.status(200).json({ news, totalNews })
})

const getNewsById = catchAsync(async(req, res) => {
    const newsSingle = await newsService.getNewsById(req.params.id)

    if (!newsSingle) {
        res.status(httpStatus.NOT_FOUND).send("News not found")
    } else res.send(newsSingle);
})

const updateNewsById = catchAsync(async(req, res) => {
    if (req.file) {
        const newsSingle = await newsService.getNewsById(req.params.id)
        if (tourData.imageUrl) {
            const path = newsSingle.imageUrl.slice(14)
            fs.unlink(`./public/uploads/${path}`, (err) => {
                if (err) {
                    console.error(err)
                    res.status(httpStatus.BAD_REQUEST).send({ message: err })
                }
            })
        }
    }

    const image = req.file ? { imageUrl: req.file.path } : {}
    const newsBody = Object.assign(req.body, image)
    const validation = await newsValidation.validate(newsBody)
    if (validation.error) {
        const errorMessage = validation.error.details[0].message
        if (req.file) {
            fs.unlink(`${req.file.path}`, (err) => {
                if (err) {
                    console.error(err)
                    res.status(httpStatus.BAD_REQUEST).send({ message: err })
                }
            })
        }
        return res.status(httpStatus.BAD_REQUEST).send({
            message: errorMessage
        })
    }

    const news = await newsService.updateNewsById(
        req.params.id,
        newsBody
    )
    res.status(200).send(news)
})

const deleteNewsById = catchAsync(async(req, res) => {
    const newsData = await newsService.getNewsById(req.params.id)
    if (!newsData) {
        res.status(httpStatus.NOT_FOUND).send("News not found")
    }
    if (newsData.imageUrl) {
        fs.unlink(`${newsData.imageUrl}`, (err) => {
            if (err) {
                console.error(err)
                res.status(httpStatus.BAD_REQUEST).send({ message: err })
            }
        })
    }
    await newsService.deleteNewsById(req.params.id)
    res.status(httpStatus.NO_CONTENT).send()
})


module.exports = {
    createNews,
    getNewsByPage,
    getNewsById,
    updateNewsById,
    deleteNewsById
}