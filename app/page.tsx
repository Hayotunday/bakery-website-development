import Header from "@/components/header";
import Hero from "@/components/hero";
import BrandSection from "@/components/brand-section";
import ProductsSection from "@/components/products-section";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";
import FounderSection from "@/components/founder-section";
import AdVideo from "@/components/ad-video";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <AdVideo />
      <BrandSection />
      <ProductsSection />
      <CTASection />
      <FounderSection />

      {/* Refresher Class Section */}
      <section className="bg-gradient-to-r from-primary/5 to-accent/5 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
            Level Up Your Baking Skills
          </h2>
          <p className="text-lg text-primary/70 mb-8 max-w-2xl mx-auto">
            Join our exclusive refresher class and master advanced baking
            techniques with expert guidance from Perfect White Cakes.
          </p>
          <Link
            href="/refresher"
            className="inline-block bg-accent hover:bg-primary text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg shadow-accent/30 active:scale-95 uppercase tracking-wider"
          >
            Register for Refresher Class
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
