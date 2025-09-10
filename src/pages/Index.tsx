import { useState } from "react";
import { Plane, MapPin, Calendar, Clock, Shield, Star, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FlightSearch from "@/components/FlightSearch";
import FlightResults from "@/components/FlightResults";
import Header from "@/components/Header";
import heroImage from "@/assets/hero-flight.jpg";

const Index = () => {
  const [showResults, setShowResults] = useState(false);
  const [searchData, setSearchData] = useState(null);

  const handleSearch = (data: any) => {
    setSearchData(data);
    setShowResults(true);
  };

  const handleBackToSearch = () => {
    setShowResults(false);
    setSearchData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        {!showResults ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="relative mb-8">
                <img 
                  src={heroImage} 
                  alt="Modern aircraft in flight" 
                  className="w-full h-96 object-cover rounded-2xl shadow-elegant"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                      Discover India
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90 drop-shadow-md">
                      Book flights across incredible destinations
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Flight Search */}
            <div className="mb-16">
              <FlightSearch onSearch={handleSearch} />
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: Shield,
                  title: "Secure Booking",
                  description: "Your payments and data are protected with bank-level security"
                },
                {
                  icon: Star,
                  title: "Best Prices",
                  description: "Compare prices from multiple airlines to get the best deals"
                },
                {
                  icon: Award,
                  title: "24/7 Support",
                  description: "Round-the-clock customer support for all your travel needs"
                }
              ].map((feature, index) => (
                <Card key={index} className="shadow-card bg-gradient-card border-0 hover:shadow-elegant transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="p-3 bg-gradient-hero rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <feature.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Popular Destinations */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Popular Destinations</h2>
              <p className="text-muted-foreground text-lg">Explore the most loved destinations in India</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                { city: "Goa", description: "Beaches & Nightlife", price: "₹4,500" },
                { city: "Kerala", description: "Backwaters & Hills", price: "₹5,200" },
                { city: "Rajasthan", description: "Palaces & Desert", price: "₹3,800" },
                { city: "Kashmir", description: "Mountains & Lakes", price: "₹6,100" }
              ].map((destination, index) => (
                <Card key={index} className="shadow-card bg-gradient-card border-0 hover:shadow-elegant transition-all hover:scale-105 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">{destination.city}</h3>
                    </div>
                    <p className="text-muted-foreground mb-3">{destination.description}</p>
                    <p className="text-accent font-semibold">Starting from {destination.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <FlightResults 
            searchData={searchData} 
            onBackToSearch={handleBackToSearch}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-gradient-hero rounded-lg shadow-elegant">
                  <Plane className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">SkyYatra</span>
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
            <p>&copy; 2024 SkyYatra Flight Booking System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
