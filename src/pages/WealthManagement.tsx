import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const wealthServices = [
  {
    title: "Unit Trusts",
    description: "Invest in unit trusts to diversify your portfolio with professional fund management and lower risk.",
  },
  {
    title: "Fixed Income > 15%",
    description: "Gain stable returns from fixed income investments with interest rates over 15%, providing consistent growth.",
  },
  {
    title: "Offshore Securities",
    description: "Broaden your portfolio by investing in global markets with offshore securities for higher international exposure.",
  },
  {
    title: "Stocks (NSE Kenya)",
    description: "Invest in shares listed on the Nairobi Securities Exchange (NSE) for potential growth and dividends in Kenyan stocks.",
  },
  {
    title: "Govt. Papers",
    description: "Secure your investments with government bonds and treasury bills, offering low-risk, fixed returns.",
  },
  {
    title: "Insurance",
    description: "Safeguard your assets and future with comprehensive insurance solutions tailored to your wealth management needs.",
  },
];

const WealthManagement = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-12 bg-primary text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Wealth Management Services</h1>
            <p className="text-xl">
              Expert guidance for growing and protecting your wealth
            </p>
          </div>
        </section>

        <section className="py-12 bg-accent">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wealthServices.map((service, index) => (
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

export default WealthManagement;