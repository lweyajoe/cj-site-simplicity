import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const businessServices = [
  {
    title: "Business Name",
    description: "We assist in registering your business name, ensuring it complies with legal requirements and is unique.",
  },
  {
    title: "Limited Company",
    description: "Register your business as a limited company, providing it with legal protection and a separate legal entity.",
  },
  {
    title: "Private Company",
    description: "We handle the registration of private companies, offering flexibility in operations and ownership structure.",
  },
  {
    title: "Trust Fund",
    description: "Set up a trust fund for asset protection and estate planning, ensuring long-term financial security.",
  },
  {
    title: "Joint Venture",
    description: "We assist in forming joint ventures, enabling businesses to collaborate and achieve shared goals.",
  },
  {
    title: "Brand and Copyrights",
    description: "Protect your intellectual property by registering your brand, copyrights, and trademarks with legal backing.",
  },
];

const BusinessRegistration = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 bg-primary text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4 animate-fade-in">Business Registration Services</h1>
            <p className="text-xl mb-8 animate-fade-in">
              Comprehensive business registration solutions to help you establish and protect your enterprise legally and efficiently.
            </p>
          </div>
        </section>

        <section className="py-12 bg-accent">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businessServices.map((service, index) => (
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

export default BusinessRegistration;