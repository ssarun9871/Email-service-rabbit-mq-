require('dotenv').config();
const serverCofig = require('./config/server-config');
const mailConfig = require('./config/mail-config');
const amqplib = require('amqplib');

const express = require('express');
const app = express();
const PORT = serverCofig.PORT || 8001;

const send = async (to, subject, content) => {
    try {
        await mailConfig.mailSender.sendMail({
            from: serverCofig.GMAIL_EMAIL,
            to: to,
            subject: subject,
            text: content
        })

        console.log("Email sent successfully!");
    }
    catch (error) {
        console.error("Error in sending mail " + error);
    }

}


async function messagingQueue() {
    try {
        const connection = await amqplib.connect("amqp://localhost");
        const channel = await connection.createChannel();
        await channel.assertQueue("testing123");//it will create a new queue named 'testing123'
        console.log("channel created")

        //publishing messages
        setInterval(() => {
            channel.sendToQueue("testing123", Buffer.from("this is the msg"));
        }, 100)

        //consuming messages
        await channel.consume("testing123", (data) => {
            console.log(`${Buffer.from(data.content)}`);
        })
    }
    catch (err) {
        console.error("Unable to establish connection : " + err);
    }
}

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));

app.listen(PORT, () => {
    console.log('Server is live on port ' + PORT);
    messagingQueue();
    send('yo.aksinha@gmail.com', 'nodemailer testing', 'hi');
})