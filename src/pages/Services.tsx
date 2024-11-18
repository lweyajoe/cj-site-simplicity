import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesGrid from "@/components/home/ServicesGrid";

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8">Our Services</h1>
            <p className="text-lg mb-12">
              At CJ's, we offer a comprehensive range of financial services tailored to meet
              your business needs. Explore our service offerings below:
            </p>
            <ServicesGrid />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;