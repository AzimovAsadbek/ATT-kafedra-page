"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { STAFF_POSITIONS } from "@/lib/content-config";
import StaffCard from "./StaffCard";

const ALL = "all";
const normalize = (text) => text.toLocaleLowerCase("uz").replace(/[ʻʼ'‘’]/g, "");

export default function StaffDirectory({ staff }) {
  const [position, setPosition] = useState(ALL);
  const [query, setQuery] = useState("");

  const filters = [{ value: ALL, label: "Barchasi", count: staff.length }].concat(
    STAFF_POSITIONS.map((item) => ({
      value: item,
      label: item,
      count: staff.filter((member) => member.position === item).length,
    })).filter((filter) => filter.count > 0),
  );

  const needle = normalize(query.trim());
  const matchesQuery = (member) =>
    [member.fullName, member.academicDegree, member.specialization].some((text) => text && normalize(text).includes(needle));
  const visibleStaff = staff.filter(
    (member) => (position === ALL || member.position === position) && (!needle || matchesQuery(member)),
  );

  return (
    <>
      <div className="mb-10 flex flex-col gap-6 border-b border-line lg:flex-row lg:items-end lg:justify-between">
        <div className="-mb-px flex gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label="Lavozim boʻyicha saralash">
          {filters.map((filter) => {
            const active = position === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setPosition(filter.value)}
                aria-pressed={active}
                className={`shrink-0 border-b-2 pb-4 text-[15px] font-medium whitespace-nowrap transition-colors ${
                  active ? "border-gold-500 text-brand-950" : "border-transparent text-slate-500 hover:text-brand-950"
                }`}
              >
                {filter.label}
                <span className="ml-1.5 text-sm text-slate-400 tabular-nums">{filter.count}</span>
              </button>
            );
          })}
        </div>

        <label className="relative mb-4 block w-full lg:w-80">
          <span className="sr-only">Oʻqituvchini qidirish</span>
          <Search className="pointer-events-none absolute top-1/2 left-0 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ism, ilmiy daraja yoki mutaxassislik"
            className="w-full border-0 border-b border-slate-300 bg-transparent py-2 pr-2 pl-7 text-[15px] placeholder:text-slate-400 focus:border-brand-900 focus:ring-0 focus:outline-none"
          />
        </label>
      </div>

      {visibleStaff.length > 0 ? (
        <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-8 2xl:grid-cols-5">
          {visibleStaff.map((member) => (
            <StaffCard key={member.id} member={member} />
          ))}
        </ul>
      ) : (
        <p className="border-y border-line py-16 text-center text-slate-500">Hech kim topilmadi</p>
      )}
    </>
  );
}
