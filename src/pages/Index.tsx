import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesGrid from "@/components/home/ServicesGrid";
import BlogCarousel from "@/components/home/BlogCarousel";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 bg-primary text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4 animate-fade-in">Welcome to CJ's</h1>
            <p className="text-xl mb-8 animate-fade-in">
              Your trusted partner in financial consulting. CPA Joe brings years of expertise
              to help you navigate your financial journey with confidence.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <ServicesGrid />

        {/* Blog Carousel */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Articles</h2>
            <BlogCarousel />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;