import { useState } from "react";
import Header from "@/components/Header";
import FlightSearch from "@/components/FlightSearch";
import FlightResults from "@/components/FlightResults";
import heroImage from "@/assets/hero-flight.jpg";
import { Plane, Shield, Clock, Award } from "lucide-react";

const Index = () => {
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-hero min-h-[60vh] flex items-center justify-center overflow-hidden"
        style={{ 
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.8), rgba(147, 197, 253, 0.6)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Discover India's Skies
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Book flights across India with the most trusted airline booking platform. 
              Compare prices, choose your perfect flight, and travel with confidence.
            </p>
          </div>
          
          {/* Search Component */}
          <FlightSearch />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <Plane className="h-8 w-8 text-primary-foreground/30" />
        </div>
        <div className="absolute bottom-20 right-10 animate-bounce delay-300">
          <Plane className="h-6 w-6 text-primary-foreground/20 rotate-45" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Why Choose SkyIndia?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure Booking",
                description: "Bank-level security with SSL encryption and secure payment gateways"
              },
              {
                icon: Clock,
                title: "24/7 Support",
                description: "Round-the-clock customer support for all your travel needs"
              },
              {
                icon: Award,
                title: "Best Prices",
                description: "Compare prices across airlines and get the best deals guaranteed"
              },
              {
                icon: Plane,
                title: "Major Airlines",
                description: "Partner with all major Indian airlines including IndiGo, Air India, Vistara"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-card p-6 rounded-xl shadow-card group-hover:shadow-elegant transition-shadow duration-300">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Results Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Popular Flight Routes
          </h2>
          <FlightResults />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Take Off?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join millions of travelers who trust SkyIndia for their flight bookings. 
            Start your journey today!
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-8 py-3 rounded-lg font-semibold shadow-card transition-all duration-300 transform hover:scale-105">
              Download App
            </button>
            <button className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-3 rounded-lg font-semibold shadow-card transition-all duration-300 transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-gradient-hero rounded-lg shadow-elegant">
                  <Plane className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">SkyIndia</span>
              </div>
              <p className="text-muted-foreground">
                India's premier flight booking platform, connecting you to destinations across the country.
              </p>
            </div>
            
            {[
              {
                title: "Quick Links",
                links: ["Flight Status", "Web Check-in", "Manage Booking", "Travel Insurance"]
              },
              {
                title: "Popular Routes",
                links: ["Delhi to Mumbai", "Mumbai to Bangalore", "Delhi to Goa", "Chennai to Hyderabad"]
              },
              {
                title: "Support",
                links: ["Help Center", "Contact Us", "Terms & Conditions", "Privacy Policy"]
              }
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 SkyIndia Flight Booking System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
