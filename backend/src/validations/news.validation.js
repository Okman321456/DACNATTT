const Joi = require('joi');

const createNews = {
    body: Joi.object().keys({
        title: Joi.string().min(0).max(100).required(),
        description: Joi.string().min(20).max(2048).required(),
    }),
    file: Joi.object().keys({
        path: Joi.string().max(500).required()
    })
};

const getNews = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

const updateNews = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        title: Joi.string().min(10).max(100).required(),
        description: Joi.string().min(20).max(2048).required(),
    }),
    file: Joi.object().keys({
        path: Joi.string().max(500).required()
    })
}

const deleteNews = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

module.exports = {
    createNews,
    getNews,
    updateNews,
    deleteNews
}