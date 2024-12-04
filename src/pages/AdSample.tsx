import { Link } from "react-router-dom";
import { ArrowLeft, Sparkle, Star, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/layout/Footer";

const AdSample = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>You Found Our Secret Page! | CPAJoe</title>
        <meta name="description" content="Congratulations on discovering our hidden treasure!" />
      </Helmet>
      
      <main className="flex-grow flex items-center justify-center p-4 bg-gradient-to-br from-background via-accent to-secondary/20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
              <Star className="w-24 h-24 text-secondary opacity-20" />
            </div>
            <PartyPopper className="w-32 h-32 mx-auto text-primary" />
          </div>
          
          <h1 className="text-4xl font-bold text-primary mb-4">
            🎉 Congratulations, Curious Explorer! 🎉
          </h1>
          
          <div className="space-y-4 text-lg text-muted-foreground mb-8">
            <p>
              You've just discovered our super-secret "coming soon" page! 
              While we're still cooking up some amazing offers, your curiosity deserves a reward.
            </p>
            <p className="text-xl font-semibold text-secondary animate-pulse">
              Here's a virtual high-five and a promise of future awesomeness!
            </p>
            <div className="flex items-center justify-center gap-4 py-6">
              <Sparkle className="w-8 h-8 text-secondary animate-spin-slow" />
              <Star className="w-8 h-8 text-primary animate-pulse" />
              <PartyPopper className="w-8 h-8 text-secondary animate-bounce" />
            </div>
            <p>
              Stay tuned for exclusive deals, special offers, and maybe even some 
              accounting jokes (yes, we make those too)!
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

export default AdSample;