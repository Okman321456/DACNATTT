const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const { ticketService, tourService } = require('../services')
const validator = require('validator')
const nodeMailer = require('nodemailer')

const adminEmail = process.env.EMAIL
const adminPassword = process.env.EMAILPASS
const mailHost = 'smtp.gmail.com'
const mailPort = 587

const bookTicket = catchAsync(async(req, res) => {
    if (!validator.isEmail(req.body.email)) {
        res.status(httpStatus.BAD_REQUEST).json('Email không hợp lệ, hãy kiểm tra lại!')
    }

    const ticket = await ticketService.bookTicket(req.params.tourId, req.body)
    const tourInfor = await tourService.getTourById(req.params.tourId)
    const listTicketByEmail = await ticketService.getTicketByEmail(req.body.email)

    let totalTickets = 0
    for (let i = 0; i < listTicketByEmail.length; i++) {
        totalTickets += listTicketByEmail[i].numberPeople
    }
    let applyDiscount = listTicketByEmail.length == 0 ? `Gói ưu đãi 0% cho khách hàng mới!` :
        `Gói ưu đãi áp dụng <b>${totalTickets}%</b> cho khách hàng đã tham gia tour trước đó có số vé đã thanh toán là ${totalTickets}.`
    let priceApplyDis = listTicketByEmail.length != 0 ? `Tổng tiền: <strike><b>${parseInt((tourInfor.price*(1-tourInfor.discount))*req.body.numberPeople)} VNĐ</b></strike>  <b>${parseInt((tourInfor.price*(1-(tourInfor.discount + totalTickets/100)))*req.body.numberPeople)} VNĐ.</b>` :
        `Tổng tiền: <b>${parseInt((tourInfor.price*(1-(tourInfor.discount + totalTickets/100)))*req.body.numberPeople)} VNĐ.</b>`
    if (ticket) {
        res.status(httpStatus.CREATED).send(ticket)
        transporter.sendMail({
            to: req.body.email,
            from: adminEmail,
            subject: '[Bootcamp Travel] - Email xác nhận đặt tour du lịch.',
            html: `
                <h2> Bootcamp Travel thông báo: bạn đã hoàn tất đặt tour tại website của chúng tôi!</h2>
                <h3> Chi tiết vé bao gồm các thông tin sau:</h3>
                <ul>
                    <li>Tên khách hàng: <b>${req.body.name}.</b></li>
                    <li>Tên tour: <b>${tourInfor.name}.</b></li>
                    <li>Điện thoại liên hệ: <b>${req.body.phone}.</b></li>
                    <li>Số lượng vé: <b>${req.body.numberPeople}.</b></li>
                    <li>${applyDiscount}</li>
                    <li>${priceApplyDis}</li>
                    <li>Trạng thái vé: <b>Chưa xác nhận.</b></li>
                </ul>
                <p>Chúng tôi sẽ liên hệ với bạn trong thời gian ngắn nhất thông qua số điện thoại ở phía trên. Xin cảm ơn!</p>
                <p><i>Nếu có thông tin gì cần thay đổi mong bạn liên hệ lại với chúng tôi theo email này hoặc số điện thoại: <b>0395360327.</b></i></p>
                `
        })
    } else {
        res.status(httpStatus.BAD_REQUEST).json('Dữ liệu nhập vào chưa đầy đủ hoặc chưa chính xác, hãy kiểm tra lại!')
    }
})

const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false, // nếu các bạn dùng port 465 (smtps) thì để true, còn lại hãy để false cho tất cả các port khác
    auth: {
        user: adminEmail,
        pass: adminPassword
    }
})

const viewDetailTicket = catchAsync(async(req, res) => {
    const result = await ticketService.viewDetailTicket(req.params.ticketId)
    res.send(result)
})

const showTicketPerTour = catchAsync(async(req, res) => {
    let date = req.query.date || ''
    let phone = req.query.phone || ''
    const tickets = await ticketService.showTicketPerTour(req.params.idTour, date, phone)
    res.send({ tickets })
})

const deleteTicket = catchAsync(async(req, res) => {
    console.log(req.params.ticketId);
    const numDocumentDeleted = await ticketService.deleteTicket(req.params.ticketId)
    res.send(`Đã xóa ${numDocumentDeleted} Ticket!`)
})

const viewAllTicket = catchAsync(async(req, res) => {
    const listTicKet = await ticketService.viewAllTicket()
    res.send(listTicKet)
})

const updateTicketStatus = catchAsync(async(req, res) => {
    const numDocumentUpdated = await ticketService.updateTicketStatus(req.params.ticketId, req.params.ticketStatus)
    res.send(`Đã cập nhật trạng thái ${numDocumentUpdated} Ticket`)
})

const getTicketRegion = catchAsync(async(req, res) => {
    const ticket = await ticketService.getTicketRegion(req.params.idRegion)
    res.status(200).send(ticket)
})

const sortTicket = catchAsync(async(req, res) => {
    const tickets = await ticketService.sortTicket()
    if (tickets) {
        res.status(200).send(tickets)
    } else {
        res.status(httpStatus.NOT_FOUND).end('Ticket Not Found!')
    }
})

const showTicketPerPhone = catchAsync(async(req, res) => {
    const ticket = await ticketService.showTicketPerPhone(req.params.phone)
    if (ticket) {
        res.status(200).send(ticket)
    } else {
        res.status(httpStatus.NOT_FOUND).send('Ticket not Found!')
    }
})

const showTicketPerDate = catchAsync(async(req, res) => {
    const ticket = await ticketService.showTicketPerDate(req.params.date)
    if (ticket) {
        res.status(200).send({ tickets: ticket })
    } else {
        res.status(httpStatus.NOT_FOUND).send('Ticket not Found!')
    }
})

module.exports = {
    bookTicket,
    viewDetailTicket,
    deleteTicket,
    viewAllTicket,
    updateTicketStatus,
    getTicketRegion,
    showTicketPerTour,
    sortTicket,
    showTicketPerDate,
    showTicketPerPhone
}