import { Link } from "react-router-dom";

const services = [
  {
    title: "Business Registration",
    route: "business-registration",
    items: ["Business Name", "Limited Company", "Private Company", "Trust Fund", "Joint Venture", "Brand and Copyrights"],
  },
  {
    title: "Accounting Services",
    route: "accounting-services",
    items: ["Book-keeping", "Chart of Accounts", "Fin. Reporting", "Internal Audit", "Management Accounting", "Payroll"],
  },
  {
    title: "Accounting Software",
    route: "accounting-software",
    items: ["Custom Accounting Software", "Quickbooks", "Tally", "Installation", "Implementation", "Training"],
  },
  {
    title: "Wealth Management",
    route: "wealth-management",
    items: ["Unit Trusts", "Fixed Income > 15%", "OffShore Securities", "Stocks (NSE Kenya)", "Govt. Papers", "Insurance"],
  },
  {
    title: "Financial Modeling",
    route: "financial-modeling",
    items: ["Business Plans", "Operations Research", "Reporting Dashboards", "Budgeting", "Fin. Projections", "Pitch Decks"],
  },
  {
    title: "Tax Services",
    route: "tax-services",
    items: ["File Returns", "Tax Advisory", "Tax Avoidance", "Tax Agent"],
  },
];

const ServicesGrid = () => {
  return (
    <div className="py-12 bg-accent">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Services Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link to={`/services/${service.route}`} key={index}>
              <div className="service-card">
                <h3 className="text-xl font-semibold mb-4 text-secondary">
                  {service.title}
                </h3>
                <ul className="space-y-2">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="text-gray-600">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesGrid;