import staffData from "../data/staffData";

export default function Staff() {
  return (
    <section id="staff" className="section">
      <div className="section-header">
        <span className="section-subtitle">Profesor-o'qituvchilar</span>
        <h2 className="section-title">Kafedra Jamoasi</h2>
        <p className="section-desc">
          Kafedrada ma'lum sohalarda hozirgi kunning eng dolzarb mavzularidan
          tortib, kelajak texnologiyalari ham o'rgatiladi. O'qituvchilarimiz
          xalqaro miqyosda tanilgan olim va mutaxassislardir.
        </p>
      </div>

      <div className="cards-container">
        {staffData.map((teacher, index) => (
          <div key={index} className="card">
            <img
              src={teacher.photo}
              alt={teacher.name}
              className="card-img"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h3 className="card-title">{teacher.name}</h3>
              <p className="card-text">{teacher.position}</p>
              <div className="divider" />
              <p className="card-text">Darslar: {teacher.subject}</p>
              <p className="card-text">
                Email: <a href={`mailto:${teacher.email}`}>{teacher.email}</a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
