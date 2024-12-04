import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SidebarAd = () => {
  return (
    <div className="glass-card p-6 my-8">
      <div className="space-y-4">
        <img
          src="/placeholder.svg"
          alt="Special Offer"
          className="w-full h-32 object-cover rounded-lg"
        />
        <h3 className="text-lg font-semibold text-primary">
          Limited Time Offer!
        </h3>
        <p className="text-sm text-muted-foreground">
          Get exclusive access to premium financial templates and resources.
        </p>
        <Button
          asChild
          className="w-full bg-secondary text-primary hover:bg-secondary/90 group"
        >
          <Link to="/ad-sample" className="flex items-center justify-center gap-2">
            Claim Your Offer
            <Star className="w-4 h-4 animate-pulse" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SidebarAd;