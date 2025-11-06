export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Axborot Tizimlari va Texnologiyalari Kafedrasiga Xush Kelibsiz!
          </h1>
          <p className="hero-subtitle">
            Zamonaviy axborot texnologiyalari sohasida innovatsion yondashuv va
            yuqori malakali mutaxassislar tayyorlashni maqsad qilgan kafedramiz
            texnologik taraqqiyotning eng yangi yo‘nalishlariga qaratilgan.
          </p>
          <div className="cta-buttons">
            <a href="#about-department" className="btn btn-primary">
              <i className="fas fa-info-circle"></i> Biz haqimizda
            </a>
            <a href="#programs" className="btn btn-outline">
              <i className="fas fa-book-open"></i> Dasturlar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
