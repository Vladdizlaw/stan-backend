const express = require("express");
const app = express();
const  bodyParser =require('body-parser');
const nodemailer = require('nodemailer');
const cors = require("cors");
const port = process.env.PORT || 80
// 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig))
app.options('/api/message', cors())

app.post('/api/message',cors(corsConfig), async (req, res) => {
  console.log(req.body)
   const data=req.body
 const contenuFormulaireContact = `
   <ul>
     <li>Имя: ${data.name}</li>
     <li>Телефон : ${data.phone}</li>
   </ul>
 `
 // NODEMAILER
 const transporter = nodemailer.createTransport({
   host: 'smtp.yandex.ru',
   port: 465,
   secure: true,
   auth: {
     user: 'stan-clinic',
     pass: 'Stan2002Clin'
   }
 })

 const info = await transporter.sendMail({
   from: '"Stan-clinic сообщение с сайта" <stan-clinic@yandex.ru>', // sender address
   to: 'stan-clinic@yandex.ru', // list of receivers
   subject: `Имя : ${data.name} телефон : ${data.phone} `, // Subject line
   text: '', // plain text body
   html: contenuFormulaireContact // html body
 })

 console.log('Message sent: %s', info.messageId)
 console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))

 res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 return res.status(200).json()
 })
 app.listen(port,  (req,res) => {
    console.log("SERVER START AT PORT:", port);
  });
