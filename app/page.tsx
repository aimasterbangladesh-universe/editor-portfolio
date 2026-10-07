import AboutPreview from "@/components/AboutPreview";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <AboutPreview />
      </main>
    </>
  );
}
