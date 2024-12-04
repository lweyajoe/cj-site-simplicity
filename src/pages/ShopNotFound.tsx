import { Link } from "react-router-dom";
import { Calculator, ArrowLeft, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/layout/Footer";

const ShopNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Shop Coming Soon | CPAJoe Financial Advisory</title>
        <meta name="description" content="Our shop is currently under development. Stay tuned for amazing financial and business resources!" />
      </Helmet>
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="text-center max-w-3xl mx-auto">
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
              <Calculator className="w-24 h-24 text-secondary opacity-20" />
            </div>
            <Building2 className="w-32 h-32 mx-auto text-primary" />
          </div>
          
          <h1 className="text-4xl font-bold text-primary mb-4">Oops! The Shop's Still Brewing ☕</h1>
          
          <div className="space-y-4 text-lg text-muted-foreground mb-8">
            <p>
              Welcome to our "shop" – which, for now, is more of a dream in progress. Picture us as chefs perfecting a recipe or a startup pitching a rocket to Mars. We promise, when it's ready, it'll be worth the wait!
            </p>
            <p>
              Think everyday-use business software, Excel templates so smart they'll make your spreadsheets jealous, and financial models that might just land you an investor. Oh, and don't forget CPA, ACCA, and CIFA course notes and books – because even geniuses need study material!
            </p>
            <p>
              For now, imagine a store filled with brilliance, ideas, and maybe some slightly overpriced mugs (hey, gotta fund our coffee addiction). Until then, explore the rest of the site and{" "}
              <a 
                href="https://cpajoe.co.ke/contact" 
                className="text-secondary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                drop me a message
              </a>{" "}
              – who knows, your enthusiasm might just speed up the launch! 🚀
            </p>
            <p className="font-medium">
              Thanks for your patience – you're the real MVP! 😄
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-4">
            <Button asChild variant="outline">
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Homepage
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShopNotFound;