const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const { newsService } = require('../services')
const fs = require('fs')

const createNews = catchAsync(async(req, res) => {
    const news = await newsService.createNews(
        Object.assign(req.body, { imageUrl: req.file.path })
    )
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
    const newsSingle = await newsService.getNewsById(req.params.id)
    const path = newsSingle.imageUrl.slice(14)
    fs.unlink(`./public/uploads/${path}`, (err) => {
        if (err) {
            console.error(err)
            return
        }
    })
    const news = await newsService.updateNewsById(
        req.params.id,
        Object.assign(
            req.body, { imageUrl: req.file.path })
    )
    res.status(200).send(news)
})

const deleteNewsById = catchAsync(async(req, res) => {
    await newsService.deleteNewsById(req.params.id)
    res.status(httpStatus.NO_CONTENT).send("News has been deleted")
})


module.exports = {
    createNews,
    getNewsByPage,
    getNewsById,
    updateNewsById,
    deleteNewsById
}