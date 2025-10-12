import Head from "@/_component/Head";
import Hero from "@/_component/Hero";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import FeatureGrid from "../_component/featureGrid";
import Footer from "@/_component/Footer";

export default function Home() {
  return (
    <div>
      <Head />
      <Hero />
      <FeatureGrid />
      <Footer />
    </div>
  );
}
