
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-4 animate-fade-in">
              Ramadan Kareem
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-4 md:mb-6 animate-fade-in [animation-delay:200ms] max-w-4xl">
              Illuminate Your Ramadan Journey with{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 clip-text">
                Dhiya' Ramadhan
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 animate-fade-in [animation-delay:400ms]">
              Daily reflections, prayer schedules, and worship tracking to
              enhance your spiritual experience throughout the blessed month
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in [animation-delay:600ms]">
              <Link to="/login">
                <Button size="lg" className="rounded-full text-base h-12 px-6">
                  Get Started
                </Button>
              </Link>
              <Link to="/learning-hub">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full text-base h-12 px-6"
                >
                  Explore Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
