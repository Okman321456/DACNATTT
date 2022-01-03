const httpStatus = require('http-status');
const { News } = require('../models');
const ApiError = require('../utils/ApiError');

const createNews = async(newsBody) => {
    const news = await News.create(newsBody)
    return news
}

const getAllNews = async(perPage, page) => {
    return await News.find()
        .skip((perPage * page) - perPage)
        .limit(perPage)
}

const getNewsPageHome = async() => {
    return await News.find().limit(3)
}

const getNewsById = async(id) => {
    return await News.findById(id)
}

const updateNewsById = async(id, newsBody) => {
    const news = await getNewsById(id)
    Object.assign(news, newsBody);
    await news.save();
    return news;
}

const deleteNewsById = async(id) => {
    const news = await getNewsById(id)
    await news.remove()
    return news
}

const countNews = async() => {
    return await News.find().count()
}


module.exports = {
    createNews,
    getAllNews,
    getNewsById,
    updateNewsById,
    deleteNewsById,
    countNews,
    getNewsPageHome
}