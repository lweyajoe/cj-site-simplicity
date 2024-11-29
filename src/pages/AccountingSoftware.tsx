import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const softwareServices = [
  {
    title: "Custom Accounting Software",
    description: "We develop tailored accounting software solutions to fit your specific business needs and workflows.",
  },
  {
    title: "QuickBooks",
    description: "We provide QuickBooks installation and support, helping you manage your finances with ease and accuracy.",
  },
  {
    title: "Tally",
    description: "Offering Tally installation and configuration services for streamlined accounting and financial management.",
  },
  {
    title: "Installation",
    description: "We handle the installation of accounting software, ensuring a smooth setup that meets your business requirements.",
  },
  {
    title: "Implementation",
    description: "Our team assists in implementing accounting software solutions, integrating them into your business operations.",
  },
  {
    title: "Training",
    description: "We offer training programs to ensure your team is proficient in using the accounting software for optimal results.",
  },
];

const AccountingSoftware = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-12 bg-primary text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Accounting Software Services</h1>
            <p className="text-xl">
              Modern software solutions for efficient financial management
            </p>
          </div>
        </section>

        <section className="py-12 bg-accent">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {softwareServices.map((service, index) => (
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

export default AccountingSoftware;