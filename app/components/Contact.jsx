export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="section-header">
        <span className="section-subtitle">Biz bilan aloqa</span>
        <h2 className="section-title">Savollaringiz bormi?</h2>
        <p className="section-desc">
          Kafedramiz bilan bog'lanish uchun quyidagi ma'lumotlarga tayanishingiz
          mumkin yoki onlayn murojaat namunasini to'ldiring. Siz bilan eng yaqin
          vaqtda aloqaga chiqamiz.
        </p>
      </div>

      <div className="contact-grid">
        <div>
          <div className="card-body">
            <h3 className="card-title">Kafedra ma'lumotlari</h3>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt contact-icon"></i>
              <div>
                <h4>Manzil</h4>
                <p className="card-text">
                  Universitet shaharchasi, 2-uydosh, Toshkent shahar,
                  O'zbekiston
                </p>
              </div>
            </div>

            <div className="contact-item">
              <i className="fas fa-phone-alt contact-icon"></i>
              <div>
                <h4>Telefon</h4>
                <p className="card-text">+998 71 123 45 67</p>
              </div>
            </div>

            <div className="contact-item">
              <i className="fas fa-envelope contact-icon"></i>
              <div>
                <h4>Email</h4>
                <p className="card-text">info@att-kafedrasi.uz</p>
              </div>
            </div>

            <div className="contact-item">
              <i className="fas fa-clock contact-icon"></i>
              <div>
                <h4>Ish vaqtlari</h4>
                <p className="card-text">Dushanba - Juma: 8:00 - 18:00</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="card-body">
            <h3 className="card-title">Online murojaat</h3>
            <form className="contact-form">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
                className="contact-form-input"
              >
                <div>
                  <label>Ismingiz</label>
                  <input type="text" required />
                </div>
                <div>
                  <label>Email manzilingiz</label>
                  <input type="email" required />
                </div>
              </div>

              <div style={{ marginTop: "1rem" }}>
                <label>Mavzu</label>
                <input type="text" required />
              </div>

              <div style={{ marginTop: "1rem" }}>
                <label>Xabaringiz</label>
                <textarea rows={5} required />
              </div>

              <div style={{ marginTop: "1rem" }}>
                <button className="btn btn-primary">Xabarni yuborish</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "2.5rem" }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.8915329724296!2d71.64098787663586!3d41.00574721957972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb4b872becc29b%3A0xf429ffdd938d2cd!2sNamangan%20muhandislik-qurilish%20instituti!5e0!3m2!1sen!2s!4v1762435231245!5m2!1sen!2s"
          width="100%"
          height="400"
          style={{ border: 0, borderRadius: "12px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}
