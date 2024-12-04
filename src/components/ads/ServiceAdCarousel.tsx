import { Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ads = [
  {
    image: "/placeholder.svg",
    title: "Special Offer: Business Registration Package",
    description: "Get your business registered with our all-inclusive package. Limited time offer with 20% off!",
  },
  {
    image: "/placeholder.svg",
    title: "Tax Season Bundle",
    description: "Complete tax filing package with expert consultation. Early bird discount available!",
  },
  {
    image: "/placeholder.svg",
    title: "Financial Modeling Workshop",
    description: "Join our exclusive workshop and learn from industry experts. Special pricing for early registration!",
  },
];

const ServiceAdCarousel = () => {
  return (
    <section className="py-12 bg-accent/50">
      <div className="container mx-auto px-4">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {ads.map((ad, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <div className="glass-card p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative h-48 md:h-full">
                      <img
                        src={ad.image}
                        alt={ad.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-primary">
                          {ad.title}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          {ad.description}
                        </p>
                      </div>
                      <Button
                        asChild
                        className="bg-secondary text-primary hover:bg-secondary/90 group animate-pulse"
                      >
                        <Link to="/ad-sample" className="flex items-center gap-2">
                          Real MVPs Click Here
                          <Sparkle className="w-4 h-4 animate-spin-slow" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default ServiceAdCarousel;