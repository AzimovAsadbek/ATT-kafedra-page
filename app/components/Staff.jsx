import Image from "next/image";
import staffData from "../data/staffData";
import erkabayev from "@/public/images/erkaboyev_ulugbek.jpg";
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
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                paddingTop: "15px",
              }}
            >
              <Image
                src={teacher.photo}
                alt={teacher.name}
                className="card-img"
                style={{
                  width: "170px",
                  height: "170px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "2px solid #c6c6c6",
                  padding: "5px",
                }}
                width={"200px "}
                height={"200px"}
              />
            </div>
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
