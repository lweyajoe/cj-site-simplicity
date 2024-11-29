import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const modelingServices = [
  {
    title: "Business Plans",
    description: "Develop comprehensive business plans outlining strategies, goals, and financial forecasts for your company.",
  },
  {
    title: "Operations Research",
    description: "Optimize decision-making processes and operations using data-driven research and advanced modeling techniques.",
  },
  {
    title: "Reporting Dashboards",
    description: "Create interactive dashboards for real-time data tracking and performance monitoring tailored to your business needs.",
  },
  {
    title: "Budgeting",
    description: "Manage your company's finances effectively with detailed budgeting plans, controlling costs, and forecasting revenue.",
  },
  {
    title: "Financial Projections",
    description: "Plan for the future with accurate financial projections, helping you anticipate growth and manage resources.",
  },
  {
    title: "Pitch Decks",
    description: "Impress potential investors with well-crafted pitch decks that highlight your business potential and financial viability.",
  },
];

const FinancialModeling = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-12 bg-primary text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Financial Modeling Services</h1>
            <p className="text-xl">
              Data-driven financial solutions for informed decision making
            </p>
          </div>
        </section>

        <section className="py-12 bg-accent">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modelingServices.map((service, index) => (
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

export default FinancialModeling;