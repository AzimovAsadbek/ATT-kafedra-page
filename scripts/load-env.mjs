// Next.js kabi muhit o'zgaruvchilarini yuklaydi: terminaldagi qiymatlar ustun,
// so'ng .env.local, so'ng .env (process.loadEnvFile mavjud qiymatlarni almashtirmaydi).
for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(file);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}
