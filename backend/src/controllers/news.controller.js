const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const { newsService } = require('../services')
const { newsValidation } = require('../validations')
const fs = require('fs')


/* create new news */
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

/* get all news */
const getNewsByPage = catchAsync(async(req, res) => {
    const perPage = 6;
    let page = parseInt(req.query.page) || 1;
    const news = await newsService.getAllNews(perPage, page)
    const totalNews = await newsService.countNews()
    if (!news) {
        res.status(httpStatus.NOT_FOUND).send("News not found")
    } else res.status(200).json({ news, totalNews })
})


/* get news detail by params id */
const getNewsById = catchAsync(async(req, res) => {
    //const { exec } = require('child_process');
    var spawn = require('child_process').spawn;
    //console.log(req.params.id.toString());
    console.log(JSON.stringify(req.headers))
        //E.g : http://localhost:3000/name?firstname=van&lastname=nghia
    var process = spawn('python', [
        './src/controllers/process.py ',
        req.params.id
    ]);
    // var comand = "python ./src/controllers/process.py " + req.params.id.toString()
    // exec(comand, (error, stdout, stderr) => {
    //     if (error) {
    //         console.error(`exec error: ${error}`);
    //         return;
    //     }
    //     console.log(`stdout: ${stdout}`);
    //     console.error(`stderr: ${stderr}`);
    // });
    process.stdout.on('data', function(data) {
        console.log(data.toString());
        console.log("2");

        // res.send(data.toString());
    });

    const newsSingle = await newsService.getNewsById(req.params.id)

    if (!newsSingle) {
        res.status(httpStatus.NOT_FOUND).send("News not found")
    } else res.send(newsSingle);
})

/* update news detail by params id*/
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


/* delete news by params id */
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