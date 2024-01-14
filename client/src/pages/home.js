import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const [randomFileName, setRandomFileName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.1.14:5000/realisations");
        const data = await response.json();
        setRandomFileName(getRandomFileName(data));
      } catch (error) {
        console.error("Erreur lors de la récupération des fichiers", error);
      }
    };
    fetchData();
  }, []);

  const getRandomFileName = (files) => {
    if (files.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * files.length);
    return files[randomIndex];
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const succes = () => {
    let time = 5;
    const alerte = document.getElementById("alert");
    alerte.style.display = "table";
    const interval = setInterval(() => {
      time--;
      if (time === 0) {
        clearInterval(interval);
        alerte.style.display = "none";
      }
    }, 1000);
  };

  const removeSucces = () => {
    const alerte = document.getElementById("alert");
    alerte.style.display = "none";
  };

  const scrollToContact = () => {
    const contactSection = document.querySelector(".contact");
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const [name, setName] = useState("");
  const [numero, setNum] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const baseUrl = "http://192.168.1.14:5000";

  const sendEmail = async (event) => {
    event.preventDefault();

    const messBox = document.getElementById("messBox");
    const alerte = document.getElementById("alert");

    alerte.style.backgroundColor = "rgb(0, 196, 26)";

    if (name.length === 0) {
      messBox.textContent = "Votre nom est trop court.";
      alerte.style.backgroundColor = "red";
      succes();
      return;
    } else if (numero.length < 10 || numero.length > 10) {
      messBox.textContent = "Numero de telephone invalide.";
      alerte.style.backgroundColor = "red";
      succes();
      return;
    } else if (email.length === 0) {
      messBox.textContent = "E-mail invalide.";
      alerte.style.backgroundColor = "red";
      succes();
      return;
    } else if (message.length === 0) {
      messBox.textContent = "Veuillez ajouter un message.";
      alerte.style.backgroundColor = "red";
      succes();
      return;
    }

    let dataSend = {
      name: name,
      numero: numero,
      email: email,
      message: message,
    };

    try {
      const res = await fetch(`${baseUrl}/email/SendEmail`, {
        method: "POST",
        body: JSON.stringify(dataSend),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (res) {
        succes();
        console.log("Envoyé avec succès !");
      } else {
        console.error("Erreur lors de l'envoi :", res.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error.message);
    }
  };

  return (
    <div>
      <section className="top">
        <div className="logo" />
        <div className="nav-bar">
          <button type="button" onClick={scrollToTop}>
            Accueil
          </button>
          <Link to="realisations/">
            <button type="button">Realisations</button>
          </Link>
          <button type="button" onClick={scrollToContact}>
            Contact
          </button>
        </div>
      </section>
      <section className="Home"></section>
      <section className="realisation">
        <Link to={`/realisation/${randomFileName}`}>
          <div class="hover">
            <div className="title">Decouvrir Realisation</div>
            <img
              className="image"
              src={`/realisations/${randomFileName}.jpg`}
              alt={randomFileName}
            />
            <div className="description">
              <h1>Style de Realisation :</h1>
              <h4>{randomFileName}</h4>
            </div>
          </div>
        </Link>
      </section>
      <section className="contact" id="contact">
        <div className="container">
          <div className="content">
            <div className="left-side">
              <div className="address details">
                <i className="fas fa-map-marker-alt" />
                <div className="topic">Adresse</div>
                <div className="text-one">4 rue des mistelles</div>
                <div className="text-two">Perpignan 6600</div>
              </div>
              <div className="phone details">
                <i className="fas fa-phone-alt" />
                <div className="topic">Telephone</div>
                <div className="text-one">06 72 01 56 49</div>
              </div>
              <div className="email details">
                <i className="fas fa-envelope" />
                <div className="topic">Email</div>
                <div className="text-one">thonic.agencement@outlook.fr</div>
              </div>
            </div>
            <div className="right-side">
              <div className="topic-text">M'envoyer un mail</div>
              <p>
                Si vous avez une demande ou une question, n'hésitez pas à
                m'envoyer un mail.
              </p>
              <form onSubmit={sendEmail}>
                <div className="input-box">
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Entrez votre nom"
                  />
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    name="telephone"
                    value={name}
                    onChange={(e) => setNum(e.target.value)}
                    placeholder="Saisissez votre numero de telephone"
                  />
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Mettez votre e-mail"
                  />
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Inscrivez votre message..."
                  />
                </div>
                <div className="input-box message-box"></div>
                <div className="button">
                  <input type="submit" value="Envoyer" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="footer">
        <h3>
          Copyright © 2023 www.thonic-agencement.fr All Rights Reserved. -
          Pierre-Jean Ribalta
        </h3>
        <div className="social">
          <a href="https://www.facebook.com/" className="fa fa-facebook">
            <span className="visually-hidden"></span>
          </a>
          <a href="https://twitter.com/" className="fa fa-twitter">
            <span className="visually-hidden"></span>
          </a>
          <a href="https://www.instagram.com/" className="fa fa-instagram">
            <span className="visually-hidden"></span>
          </a>
        </div>
      </section>
      <div className="alert" id="alert" onClick={removeSucces}>
        <p id="messBox">Votre mail a bien été envoyé.</p>
      </div>
    </div>
  );
}
