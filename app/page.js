import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutUniversity from "./components/AboutUniversity";
import AboutDepartment from "./components/AboutDepartment";
import Staff from "./components/Staff";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutUniversity />
        <AboutDepartment />
        <Staff />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
