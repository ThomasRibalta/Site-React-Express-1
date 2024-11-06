import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Realisations() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/realisations");
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des fichiers", error);
      }
    };

    fetchData();
  }, []);

  const scrollToTarget = (target) => {
    console.log(target);
    const targetSection = document.getElementById(target);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <section className="top">
        <div className="logo" />
        <div className="nav-bar">
          <Link to="/">
            <button type="button">Accueil</button>
          </Link>
          <Link to="/realisations/">
            <button type="button">Realisations</button>
          </Link>
          <Link to="/">
            <button type="button">Contact</button>
          </Link>
        </div>
      </section>
      <section className="Realisation">
        {files.map((file, index) => (
          <section id={file} key={index} className="Realisation-box">
            <Link to={`/realisation/${file}`}>
              <h1>{file}</h1>
              <img
                className="realisation-img"
                src={`/realisations/${file}.jpg`}
                alt={file}
              />
            </Link>
          </section>
        ))}
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
      <section className="NavBar-real">
        <div className="NavButton">
          {files.map((file, index) => (
            <button
              type="button"
              onClick={() => scrollToTarget(file)}
              key={index}
            >
              {file}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
