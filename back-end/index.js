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


// REST API
app.get(('/find/:lati/:long'), (req, res) => {
    res.send(ubsController.getClosestPoint(req.params.lati, req.params.long))
});

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
        to: 'ubs-2914@maildrop.cc',
        subject: 'PACIENTE SAUDE 092',
        text: "Novo paciente registrado no sistema SAUDE 092, dados:" + "\n \nNome: " + req.body.name + "\nIdade: " + req.body.age + "\nEstá em grupo de risco: " + req.body.isGroup + "\nSintomas: " + req.body.marks + '\nContato: ' + req.body.contact,
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

app.get(('/get-ubs/:id'), (req, res) => {
    const objectList = require('./ubs-list.js').JSONlist.listOfUbs;;
    for (var i = 0; i < objectList.length; i++) {
        if (objectList[i].id == req.params.id) {
            res.send(objectList[i]);
            return;
        }
    }
    res.send('');

    // const fs = require('fs');
    // if (fs.existsSync('./database/' + key + '.txt')) {
    //     fs.readFile('./database/' + key + '.txt', 'utf8', function (err, data) {
    //         if (err) throw err;
    //         res.send(data);
    //     });
    // }

});

app.listen(process.env.PORT || 3000);