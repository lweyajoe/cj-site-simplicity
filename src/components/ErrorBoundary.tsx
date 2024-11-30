import React from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import { AlertCircle, ArrowLeft, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col">
          <Helmet>
            <title>Error | CPAJoe Financial Advisory</title>
            <meta name="description" content="An unexpected error occurred." />
          </Helmet>
          
          <main className="flex-grow flex items-center justify-center p-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center justify-center animate-bounce">
                  <Wrench className="w-24 h-24 text-secondary opacity-20" />
                </div>
                <AlertCircle className="w-32 h-32 mx-auto text-primary" />
              </div>
              
              <h1 className="text-4xl font-bold text-primary mb-4">Oops! Technical Deficit</h1>
              
              <p className="text-xl text-muted-foreground mb-6">
                "Like an unexpected market correction,<br />
                We've hit a technical imperfection.<br />
                Our team is working with precision,<br />
                To restore your financial vision!"
              </p>
              
              <div className="flex items-center justify-center gap-4">
                <Button asChild variant="outline">
                  <Link to="/" className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Return to Safety
                  </Link>
                </Button>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;