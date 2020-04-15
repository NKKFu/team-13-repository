require('dotenv').config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors')
const app = express()
app.use(cors())

const ubsController = require('./ubs-controller.js');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())


app.get(('/find/:lati/:long'), (req, res) => {
    res.send(ubsController.getClosestPoint(req.params.lati, req.params.long))
});

console.log(process.env.EMAIL_ADDRESS);


app.post(('/patient/new'), (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        },
    });

    const mailOptions = {
        from: 'saude092server@gmail.com',
        to: req.body.email,
        subject: 'PACIENTE SAUDE 092',
        text: "Novo paciente registrado no sistema SAUDE 092, dados:" + "\n \nNome: " + req.body.name + "\nIdade: " + req.body.age + "\nEstá em grupo de risco: " + req.body.isGroup + "\nSintomas: " + req.body.marks,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            res.send('Email sent');
            console.log('Email sent: ' + info.response);
        }
    });
});

app.listen(3000);