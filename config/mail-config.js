const nodemailer = require('nodemailer');
const { GMAIL_PASSWORD, GMAIL_EMAIL } = require('./server-config');

const mailsender = nodemailer.createTransport({
    auth: {
        user: GMAIL_EMAIL,
        pass: GMAIL_PASSWORD,
    },
});

module.exports = mailsender;