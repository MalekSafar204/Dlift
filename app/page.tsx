import Hero from "./components/Hero";
import OurCranes from "./components/OurCranes";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { ContactForm } from "./components/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <OurCranes />
      <Services />
      <About />
      <ContactForm />
    </>
  );
}
