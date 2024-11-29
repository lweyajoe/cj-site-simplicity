import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const taxServices = [
  {
    title: "File Returns",
    description: "Hassle-free filing of tax returns to ensure compliance with KRA regulations and deadlines.",
  },
  {
    title: "Tax Advisory",
    description: "Expert tax advice tailored to your business needs, helping you navigate complex tax laws and obligations.",
  },
  {
    title: "Tax Avoidance",
    description: "Implement legal strategies to minimize tax liabilities and optimize your financial position.",
  },
  {
    title: "Tax Agent",
    description: "Get professional representation as a registered tax agent, ensuring all KRA processes are handled efficiently.",
  },
];

const TaxServices = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-12 bg-primary text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Tax Services</h1>
            <p className="text-xl">
              Professional tax solutions for compliance and optimization
            </p>
          </div>
        </section>

        <section className="py-12 bg-accent">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {taxServices.map((service, index) => (
                <div key={index} className="service-card">
                  <h3 className="text-xl font-semibold mb-4 text-secondary">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TaxServices;