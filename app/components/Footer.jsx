"use client";

import { useState } from "react";

export default function Footer() {
  const [activeSection, setActiveSection] = useState("");

  const toggleSection = (sectionTitle) => {
    if (activeSection === sectionTitle) {
      setActiveSection("");
    } else {
      setActiveSection(sectionTitle);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3 className="footer-titlePrim">
              Axborot Tizimlari va Texnologiyalari Kafedrasi
            </h3>
            <p className="footer-text">
              Talabalarni zamonaviy axborot texnologiyalari bilan ta'minlash va
              oliy malakali mutaxassislar tayyorlash kafedramizning asosiy
              vazifasidir.
            </p>
            <div className="social-links">
              <a href="#" style={{ color: "#c3c8cf" }}>
                <i className="fab fa-facebook-f fa-lg "></i>
              </a>
              <a href="#" style={{ color: "#c3c8cf" }}>
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" style={{ color: "#c3c8cf" }}>
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="#" style={{ color: "#c3c8cf" }}>
                <i className="fab fa-linkedin-in fa-lg"></i>
              </a>
              <a href="#" style={{ color: "#c3c8cf" }}>
                <i className="fab fa-youtube fa-lg"></i>
              </a>
            </div>
          </div>

          <div>
            <h3
              className={`footer-title ${
                activeSection === "Sahifalar" ? "active" : ""
              }`}
              onClick={() => toggleSection("Sahifalar")}
            >
              Sahifalar
            </h3>
            <ul
              className={`footer-links ${
                activeSection === "Sahifalar" ? "active" : ""
              }`}
            >
              <li>
                <a href="#" className="footer-link">
                  Bosh sahifa
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Universitet haqida
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Kafedra haqida
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Professor-o'qituvchilar
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  O'quv dasturlari
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className={`footer-title ${
                activeSection === "Foydali" ? "active" : ""
              }`}
              onClick={() => toggleSection("Foydali")}
            >
              Foydali havolalar
            </h3>
            <ul
              className={`footer-links ${
                activeSection === "Foydali" ? "active" : ""
              }`}
            >
              <li>
                <a href="#" className="footer-link">
                  Talabalar portal
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Onlayn kutubxona
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Virtual kabinet
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Video darsliklar
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Qabul tizimi
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className={`footer-title ${
                activeSection === "Aloqa" ? "active" : ""
              }`}
              onClick={() => toggleSection("Aloqa")}
            >
              Aloqa ma'lumotlari
            </h3>
            <ul
              className={`footer-links ${
                activeSection === "Aloqa" ? "active" : ""
              }`}
            >
              <li>
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt contact-icon"></i>
                  <span className="footer-text">
                    Universitet shaharchasi, Toshkent
                  </span>
                </div>
              </li>
              <li>
                <div className="contact-item">
                  <i className="fas fa-phone-alt contact-icon"></i>
                  <span className="footer-text">+998 71 123 45 67</span>
                </div>
              </li>
              <li>
                <div className="contact-item">
                  <i className="fas fa-envelope contact-icon"></i>
                  <span className="footer-text">info@att-kafedrasi.uz</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Axborot Tizimlari va
            Texnologiyalari Kafedrasi. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
}
