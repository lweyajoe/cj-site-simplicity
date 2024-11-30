import { Link } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import { Calculator, ArrowLeft, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>404 - Page Not Found | CPAJoe Financial Advisory</title>
        <meta name="description" content="The page you're looking for cannot be found." />
      </Helmet>
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="text-center max-w-3xl mx-auto">
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
              <Calculator className="w-24 h-24 text-secondary opacity-20" />
            </div>
            <Building2 className="w-32 h-32 mx-auto text-primary" />
          </div>
          
          <h1 className="text-4xl font-bold text-primary mb-4">404: Investment Not Found</h1>
          
          <p className="text-xl text-muted-foreground mb-6">
            "Like a misplaced decimal point in accounting,<br />
            This page seems to have gone wandering.<br />
            But don't let your portfolio stress,<br />
            We'll help you navigate this mess!"
          </p>
          
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

export default NotFound;