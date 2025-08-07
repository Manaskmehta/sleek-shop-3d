import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroProduct from "@/assets/headphones.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Premium
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  Audio Experience
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
                Discover our curated collection of premium electronics designed 
                for the modern lifestyle. Quality meets innovation.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="premium" size="lg" className="group">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg">
                View Collection
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center">
                <span className="font-semibold text-foreground">2M+</span>
                <span className="ml-1">Happy Customers</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-foreground">4.9★</span>
                <span className="ml-1">Rating</span>
              </div>
            </div>
          </div>

          {/* 3D Product Showcase */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="perspective-1000">
              <div className="relative transform-3d hover:rotate-y-12 transition-smooth group">
                <div className="relative">
                  <img
                    src={heroProduct}
                    alt="Premium Headphones"
                    className="w-80 h-80 object-contain filter drop-shadow-2xl"
                  />
                  
                  {/* Floating elements */}
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                    New
                  </div>
                  
                  {/* 3D shadow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 transform translate-y-4 translate-x-4 -z-10 blur-xl group-hover:translate-y-6 group-hover:translate-x-6 transition-smooth"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/30 to-transparent -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-r from-primary/5 to-transparent -z-10"></div>
    </section>
  );
};

export default Hero;