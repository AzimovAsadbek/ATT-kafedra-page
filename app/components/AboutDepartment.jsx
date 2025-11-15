import departmentData from "../data/departmentData";

export default function AboutDepartment() {
  return (
    <section id="about-department" className="section">
      <div className="section-header">
        <span className="section-subtitle">Tanishuv</span>
        <h2 className="section-title">Kafedra Haqida</h2>
        <p className="section-desc">
          Kafedramiz axborot tizimlarini loyihalash, tahlil qilish va boshqarish
          sohalarida malakali mutaxassis yetishtirishga qaratilgan. Bugungi
          kunda 25 nafarga professor-o'qituvchilar faoliyat olib bormoqda.
        </p>
      </div>

      <div className="cards-container">
        {departmentData.map((v) => {
          return (
            <div className="card" key={v.id}>
              <img src={v.img || ""} alt={v.title} className="card-img" />
              <div className="card-body">
                <h3 className="card-title">{v.title || ""}</h3>
                <div className="divider"></div>
                <p className="card-text">{v.desc || ""}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
