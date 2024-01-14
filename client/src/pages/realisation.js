import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Realisation() {
  const [files, setFiles] = useState([]);
  const chemin = window.location.pathname;
  const segments = chemin.split("/");
  const dernierSegment = segments[segments.length - 1];
  const navigate = useNavigate(); // Utilisez le hook useNavigate pour gérer la redirection

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.14:5000/getRealisation/${dernierSegment}`
        );
        const data = await response.json();
        setFiles(data);

        if (data.length === 0) {
          navigate("/realisations/");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des fichiers", error);
      }
    };

    fetchData();
  }, [dernierSegment, navigate]);

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
      <section className="image-zone" id="size">
        {files.map((file, index) => (
          <img
            className="image-post"
            src={`/realisations/${dernierSegment}/${file}`}
            key={index}
            alt={file}
          />
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
    </div>
  );
}
