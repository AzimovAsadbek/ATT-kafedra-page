const dateTimeFormat = new Intl.DateTimeFormat("uz-UZ", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Tashkent",
});

export const formatDateTime = (date) => dateTimeFormat.format(date);
