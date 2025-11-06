import universityCards from "../data/universityCards";

export default function AboutUniversity() {
  return (
    <section id="about-university" className="section">
      <div className="section-header">
        <span className="section-subtitle">Bizning Universitetimiz</span>
        <h2 className="section-title">Universitet Tarixi va Imkoniyatlari</h2>
        <p className="section-desc">
          75 yillik tarixga ega bo'lgan universitetimiz O'zbekistonning yetakchi
          oliy ta'lim muassasalaridan biri hisoblanadi. Texnologik
          innovatsiyalar va ilmiy tadqiqotlarni rivojlantirish borasida muhim
          yutuqlarga erishganmiz.
        </p>
      </div>

      <div className="cards-container">
        {universityCards.map((card, idx) => (
          <div key={idx} className="card">
            <img src={card.image} alt={card.title} className="card-img" />
            <div className="card-body">
              <h3 className="card-title">{card.title}</h3>
              <div className="divider" />
              <p className="card-text">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
