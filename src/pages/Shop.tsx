import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Shop = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Shop</h1>
          <p className="text-lg mb-8">
            Coming soon! We're working on bringing you valuable financial resources
            and products.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;