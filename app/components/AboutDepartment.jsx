export default function AboutDepartment() {
  return (
    <section id="about-department" className="section">
      <div className="section-header">
        <span className="section-subtitle">Tanishuv</span>
        <h2 className="section-title">Kafedra Haqida</h2>
        <p className="section-desc">
          2004-yilda asos solingan kafedramiz axborot tizimlarini loyihalash,
          tahlil qilish va boshqarish sohalarida malakali mutaxassis
          yetishtirishga qaratilgan. Bugungi kunda 20 nafar
          professor-o'qituvchilar faoliyat olib bormoqda.
        </p>
      </div>

      <div className="cards-container">
        <div className="card">
          <img
            src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3"
            alt="Department"
            className="card-img"
          />
          <div className="card-body">
            <h3 className="card-title">Maqsad va Vazifalar</h3>
            <div className="divider"></div>
            <p className="card-text">
              Axborot texnologiyalariga bo'lgan talabning ortib borishi bilan
              bog'liq ravishda, kafedra talaba va o'qituvchilar uchun qulay
              sharoit yaratish va zamonaviy bilimlarni o'rgatishni maqsad
              qilgan.
            </p>
          </div>
        </div>

        <div className="card">
          <div
            className="card-body"
            style={{
              textAlign: "center",
              paddingTop: "2rem",
              paddingBottom: "2rem",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3"
              alt="Department Head"
              style={{
                width: "128px",
                height: "128px",
                borderRadius: "50%",
                margin: "0 auto 1rem",
                objectFit: "cover",
                display: "block",
              }}
            />
            <h3 className="card-title">Azizov Shavkat</h3>
            <p className="card-text">Kafedra mudiri, texnika fanlari doktori</p>
            <div className="divider" style={{ margin: "1rem auto" }}></div>
            <p className="card-text">
              20 yildan ortiq tadqiqot ishlari va o'qituvchilik tajribasiga ega.
              "Sun'iy intellekt va ma'lumotlar tahlili" yo'nalishi bo'yicha
              yetakchi mutaxassis.
            </p>
          </div>
        </div>

        <div className="card">
          <img
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3"
            alt="Research"
            className="card-img"
          />
          <div className="card-body">
            <h3 className="card-title">Ilmiy Ishlar va Loyihalar</h3>
            <div className="divider"></div>
            <p className="card-text">
              Hozirgi kunda kafedramiz 5 ta xalqaro ilmiy loyihada ishtirok
              etmoqda. 2023-yilda 18 ta maqola xalqaro jurnallarda chop etilgan,
              2 ta patent olingan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
