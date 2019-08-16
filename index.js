const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const nodemailer = require('nodemailer');

let port =process.env.PORT || 3000

app.use(bodyParser.json());
app.use(cors())

app.post('/sendEmail', (req, res) => {

 function sender(formulario){

           //via del email
    let transport = nodemailer.createTransport({
        service:'Gmail',
        auth:{ 
         user: 'hernag_09@hotmail.com',
         pass: 'Raptor09'},

        tls: {
            rejectUnauthorized: false
          }
  
    })
    //opciones del email
    let mailoptions = {
        from: 'hernan',
        to: 'hernag_09@hotmail.com',
        subject: 'Hernan Gomez',
        text: 'mail :' + req.body.email +' Mensaje :'+req.body.text,
        html: '<ul><li>' + req.body.email + '</li><li>' + req.body.text + '</li></ul>'
    
      }
       //se envia el mail
      transporter.sendMail(mailoptions, (error, info) => {
        if (error) console.log(`${error}`)
        else {

          console.log(info)
         
        }
      })
    
    }
   
  
})




app.listen(port, () => {

console.log(`http://localhost:${port}`)
});