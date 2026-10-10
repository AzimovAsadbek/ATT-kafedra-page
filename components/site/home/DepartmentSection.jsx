import Link from "next/link";
import { Avatar } from "../Portrait";
import SectionHeading from "../SectionHeading";
import { positionLine } from "../StaffCard";

const splitLines = (text) =>
  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

export default function DepartmentSection({ settings, staff }) {
  const tasks = splitLines(settings.dept_tasks);
  const leaders = staff.filter((member) => member.position === "Kafedra mudiri" || member.departmentRole);
  const facts = [
    { label: "Fakultet", value: settings.dept_faculty },
    { label: "Tashkil topgan", value: settings.dept_founded },
    { label: "Joylashuvi", value: settings.dept_location },
  ].filter((fact) => fact.value);

  return (
    <section id="kafedra" className="py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading label="Kafedra haqida" title="Maqsad va vazifalar" description={settings.department_intro} />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            {settings.dept_accreditation && (
              <p className="border-l-2 border-gold-500 bg-paper px-6 py-5 text-[17px] leading-relaxed text-slate-700">
                {settings.dept_accreditation}
              </p>
            )}

            {tasks.length > 0 && (
              <>
                <h3 className="label-caps mt-12 mb-2 text-slate-500">Asosiy vazifalar</h3>
                <ol className="divide-y divide-line border-y border-line">
                  {tasks.map((task, index) => (
                    <li key={task} className="flex gap-6 py-4">
                      <span className="w-6 shrink-0 pt-0.5 font-serif text-lg font-semibold text-gold-700 tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-slate-700">{task}</span>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>

          <aside className="lg:col-span-5 lg:pl-12">
            {leaders.length > 0 && (
              <>
                <h3 className="label-caps mb-6 text-slate-500">Kafedra rahbariyati</h3>
                <ul className="space-y-5">
                  {leaders.map((member) => (
                    <li key={member.id}>
                      <Link href={`/oqituvchilar/${member.slug}`} className="group flex items-center gap-5">
                        <Avatar member={member} className="size-16 ring-1 ring-line" />
                        <div>
                          <p className="font-serif text-lg leading-snug font-semibold text-brand-950 decoration-gold-500 decoration-2 underline-offset-4 group-hover:underline">
                            {member.fullName}
                          </p>
                          <p className="mt-1 text-sm text-gold-700">{member.departmentRole ?? positionLine(member)}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {facts.length > 0 && (
              <dl className="mt-12 divide-y divide-line border-y border-line">
                {facts.map(({ label, value }) => (
                  <div key={label} className="grid grid-cols-3 gap-4 py-4">
                    <dt className="text-sm text-slate-500">{label}</dt>
                    <dd className="col-span-2 font-medium text-slate-800">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
