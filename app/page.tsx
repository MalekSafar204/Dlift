import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import OurCranes from "../components/OurCranes";
import { Services } from "../components/Services";
import { About } from "../components/About";
import { ContactForm } from "../components/ContactForm";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <OurCranes />
      <Services />
      <About />
      <ContactForm />
      <Footer />
    </>
  );
}
