"use client";

import { Mail, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { STAFF_POSITIONS } from "@/lib/content-config";

const ALL = "all";

function getInitials(fullName) {
  return fullName
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

function StaffCard({ member }) {
  return (
    <li className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/80 transition hover:shadow-lg hover:shadow-brand-900/5 hover:ring-brand-200">
      <div className="relative h-28 w-21 shrink-0 overflow-hidden rounded-xl bg-linear-to-br from-brand-100 to-brand-200">
        {member.photo ? (
          <Image src={member.photo} alt={member.fullName} fill sizes="84px" className="object-cover" />
        ) : (
          <span
            className="grid h-full place-items-center font-display text-2xl font-extrabold text-brand-700"
            aria-hidden="true"
          >
            {getInitials(member.fullName)}
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-base leading-snug font-bold">{member.fullName}</h3>
        <p className="mt-1 text-sm font-semibold text-teal-700">
          {member.position}
          {member.academicTitle && member.academicTitle !== member.position && (
            <span className="font-medium text-slate-500"> · {member.academicTitle}</span>
          )}
        </p>
        {member.academicDegree && (
          <p className="mt-1.5 text-sm leading-snug text-slate-600" title={member.degreeSpecialty ?? undefined}>
            {member.academicDegree}
          </p>
        )}
        {member.subjects && <p className="mt-2 line-clamp-2 text-sm text-slate-500">{member.subjects}</p>}

        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="mt-auto inline-flex min-w-0 items-center gap-1.5 pt-3 text-sm text-slate-600 hover:text-brand-700"
          >
            <Mail className="size-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{member.email}</span>
          </a>
        )}
      </div>
    </li>
  );
}

export default function StaffDirectory({ staff }) {
  const [position, setPosition] = useState(ALL);
  const [query, setQuery] = useState("");

  const positions = STAFF_POSITIONS.filter((item) => staff.some((member) => member.position === item));
  const normalizedQuery = query.trim().toLocaleLowerCase("uz");
  const matchesQuery = (member) =>
    [member.fullName, member.subjects, member.academicDegree, member.degreeSpecialty].some((text) =>
      text?.toLocaleLowerCase("uz").includes(normalizedQuery),
    );
  const visibleStaff = staff.filter(
    (member) => (position === ALL || member.position === position) && (!normalizedQuery || matchesQuery(member)),
  );

  const filters = [{ value: ALL, label: "Barchasi", count: staff.length }].concat(
    positions.map((item) => ({
      value: item,
      label: item,
      count: staff.filter((member) => member.position === item).length,
    })),
  );

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Lavozim boʻyicha saralash">
          {filters.map((filter) => {
            const isActive = position === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setPosition(filter.value)}
                aria-pressed={isActive}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition ${
                  isActive
                    ? "bg-brand-900 text-white"
                    : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-brand-800 hover:ring-brand-300"
                }`}
              >
                {filter.label}
                <span className={`ml-1.5 ${isActive ? "text-brand-200" : "text-slate-400"}`}>{filter.count}</span>
              </button>
            );
          })}
        </div>

        <label className="relative block w-full lg:w-72">
          <span className="sr-only">Oʻqituvchini qidirish</span>
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ism, fan yoki ixtisoslik boʻyicha"
            className="w-full rounded-full border-0 bg-white py-2.5 pr-4 pl-11 text-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </label>
      </div>

      {visibleStaff.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visibleStaff.map((member) => (
            <StaffCard key={member.id} member={member} />
          ))}
        </ul>
      ) : (
        <p className="rounded-2xl bg-white py-12 text-center text-slate-500 ring-1 ring-slate-200">
          Hech narsa topilmadi
        </p>
      )}
    </>
  );
}
