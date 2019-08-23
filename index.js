const express = require('express');

const bodyParser = require('body-parser');
const app = express();
const nodemailer = require('nodemailer');

let port =process.env.PORT || 3000;

app.use((req, res, next) => {
  
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.setHeader('Content-Type', 'application/json')

  next()
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.post('/mailer',(req,res)=>{
  let transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: 'hernag_09@hotmail.com',
      pass: 'Raptor09'
    },

    tls: {
      rejectUnauthorized: false
    }

  })

  let mailoptions = {
    from: 'hernan',
    to: 'hgomez@cdt.com.ar',
    subject: 'Hernan Gomez',
    text: 'mail' + req.body.email +'texto : '+ req.body.texto,
    html: '<ul><li style="list-style:none">' + req.body.email + '</li></ul>'+'<br>'+'<p>'+req.body.texto+'</p>'

  }

  transporter.sendMail(mailoptions, (error, info) => {
    if (error) console.log(`${error}`)
    else {
      console.log(info)
     res.send({mensaje:'mesaje success'})
    }
  },err=>{
    console.log(err)
  })
})




app.listen(port, (err) => {
 if(err) console.log(err)

console.log(`http://localhost:${port}`)
});