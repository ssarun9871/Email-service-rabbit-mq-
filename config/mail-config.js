const nodemailer = require('nodemailer');
const { GMAIL_PASSWORD, GMAIL_EMAIL } = require('./server-config');

const mailSender = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: GMAIL_EMAIL,
        pass: GMAIL_PASSWORD,
    },
});

module.exports = {
    mailSender
};