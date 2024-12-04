import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServiceAdCarousel from "@/components/ads/ServiceAdCarousel";

const accountingServices = [
  {
    title: "Book-keeping",
    description: "We manage your day-to-day financial transactions, ensuring accurate records of purchases, sales, receipts, and payments.",
  },
  {
    title: "Chart of Accounts",
    description: "We help organize your financial data with a structured chart of accounts, tailored to your business needs.",
  },
  {
    title: "Financial Reporting",
    description: "Our financial reports provide insights into your business's performance, helping you make informed decisions.",
  },
  {
    title: "Internal Audit",
    description: "We assess your internal controls and processes, ensuring compliance and identifying areas for improvement.",
  },
  {
    title: "Management Accounting",
    description: "We provide detailed financial analysis and management reports to help you make strategic business decisions.",
  },
  {
    title: "Payroll",
    description: "We handle your employee payroll, ensuring timely and accurate salary processing, tax deductions, and compliance.",
  },
];

const AccountingServices = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-12 bg-primary text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Accounting Services</h1>
            <p className="text-xl">
              Professional accounting solutions to help your business thrive
            </p>
          </div>
        </section>

        <section className="py-12 bg-accent">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accountingServices.map((service, index) => (
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

        <ServiceAdCarousel />
      </main>
      <Footer />
    </div>
  );
};

export default AccountingServices;