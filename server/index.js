const expressAsyncHandler = require("express-async-handler");
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

app.post(
  "/email/sendEmail",
  expressAsyncHandler(async (req, res) => {
    const { email, numero, name, message } = req.body;

    const mess = `Nom du client: ${name}\nNumero de telephhone du client: ${numero}\nE-mail du client: ${email}\n\nDemande du client: ${message}`;
    var mailOptions = {
      from: process.env.SMTP_MAIL,
      to: "thomasribalta@gmail.com",
      subject: "Contact de " + name,
      text: mess,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.send(true);
      }
    });
  })
);

app.get("/realisations", (req, res) => {
  const directoryPath = path.join(__dirname, "../client/public/realisations/");

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send("Erreur lors de la lecture du dossier");
    }
    const filteredFiles = files.filter((file) => !file.endsWith(".jpg"));

    res.send(filteredFiles);
  });
});

app.get("/getRealisation/:id", (req, res) => {
  const directoryPath = path.join(
    __dirname,
    "../client/public/realisations",
    req.params.id
  );

  console.log(directoryPath);

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send("Erreur lors de la lecture du dossier");
    }
    res.send(files);
  });
});

app.get("/*", (req, res) => {
  res.send("Error");
});

app.listen(5000);
