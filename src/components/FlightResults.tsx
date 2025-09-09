import { Clock, Plane, IndianRupee, Wifi, Utensils, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockFlights = [
  {
    id: 1,
    airline: "IndiGo",
    flightNumber: "6E 2142",
    logo: "🔵",
    departure: { time: "06:30", city: "Delhi", code: "DEL" },
    arrival: { time: "08:45", city: "Mumbai", code: "BOM" },
    duration: "2h 15m",
    stops: "Non-stop",
    price: 4567,
    amenities: ["wifi", "meal", "entertainment"],
    aircraft: "A320",
    onTime: 85,
  },
  {
    id: 2,
    airline: "Air India",
    flightNumber: "AI 131",
    logo: "🇮🇳",
    departure: { time: "08:15", city: "Delhi", code: "DEL" },
    arrival: { time: "10:35", city: "Mumbai", code: "BOM" },
    duration: "2h 20m",
    stops: "Non-stop",
    price: 5234,
    amenities: ["wifi", "meal", "entertainment"],
    aircraft: "Boeing 737",
    onTime: 78,
  },
  {
    id: 3,
    airline: "SpiceJet",
    flightNumber: "SG 8147",
    logo: "🌶️",
    departure: { time: "14:20", city: "Delhi", code: "DEL" },
    arrival: { time: "16:45", city: "Mumbai", code: "BOM" },
    duration: "2h 25m",
    stops: "Non-stop",
    price: 3899,
    amenities: ["wifi"],
    aircraft: "Boeing 737-800",
    onTime: 82,
  },
  {
    id: 4,
    airline: "Vistara",
    flightNumber: "UK 995",
    logo: "✈️",
    departure: { time: "19:10", city: "Delhi", code: "DEL" },
    arrival: { time: "21:30", city: "Mumbai", code: "BOM" },
    duration: "2h 20m",
    stops: "Non-stop",
    price: 6789,
    amenities: ["wifi", "meal", "entertainment"],
    aircraft: "A320neo",
    onTime: 89,
  },
];

const FlightResults = () => {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "wifi": return <Wifi className="h-4 w-4" />;
      case "meal": return <Utensils className="h-4 w-4" />;
      case "entertainment": return <Tv className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Available Flights</h2>
          <p className="text-muted-foreground">Delhi → Mumbai • {mockFlights.length} flights found</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Price</Button>
          <Button variant="outline" size="sm">Duration</Button>
          <Button variant="outline" size="sm">Departure</Button>
        </div>
      </div>

      {/* Flight Cards */}
      <div className="space-y-4">
        {mockFlights.map((flight) => (
          <Card key={flight.id} className="shadow-card hover:shadow-elegant transition-shadow duration-300 bg-gradient-card border-0">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                {/* Airline Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{flight.logo}</div>
                    <div>
                      <h3 className="font-semibold text-foreground">{flight.airline}</h3>
                      <p className="text-sm text-muted-foreground">{flight.flightNumber}</p>
                      <p className="text-xs text-muted-foreground">{flight.aircraft}</p>
                    </div>
                  </div>
                </div>

                {/* Flight Times */}
                <div className="lg:col-span-6">
                  <div className="flex items-center justify-between">
                    {/* Departure */}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{flight.departure.time}</div>
                      <div className="text-sm font-medium text-muted-foreground">
                        {flight.departure.code}
                      </div>
                      <div className="text-xs text-muted-foreground">{flight.departure.city}</div>
                    </div>

                    {/* Flight Path */}
                    <div className="flex-1 mx-4">
                      <div className="relative">
                        <div className="h-px bg-border w-full"></div>
                        <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-primary bg-background p-1 rounded-full border" />
                      </div>
                      <div className="text-center mt-2">
                        <div className="text-sm font-medium text-muted-foreground">{flight.duration}</div>
                        <div className="text-xs text-accent">{flight.stops}</div>
                      </div>
                    </div>

                    {/* Arrival */}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{flight.arrival.time}</div>
                      <div className="text-sm font-medium text-muted-foreground">
                        {flight.arrival.code}
                      </div>
                      <div className="text-xs text-muted-foreground">{flight.arrival.city}</div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex items-center gap-2 mt-3 justify-center">
                    {flight.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-1 text-xs text-muted-foreground">
                        {getAmenityIcon(amenity)}
                        <span className="capitalize">{amenity}</span>
                      </div>
                    ))}
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {flight.onTime}% On-time
                    </Badge>
                  </div>
                </div>

                {/* Price & Book */}
                <div className="lg:col-span-4 text-center lg:text-right">
                  <div className="flex items-center justify-center lg:justify-end gap-1 mb-2">
                    <IndianRupee className="h-5 w-5 text-foreground" />
                    <span className="text-3xl font-bold text-foreground">
                      {flight.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">per person</p>
                  <div className="space-y-2">
                    <Button variant="hero" className="w-full lg:w-auto px-8" asChild>
                      <a href={`/book-flight?flightId=${flight.id}`}>Book Now</a>
                    </Button>
                    <div className="flex gap-2 justify-center lg:justify-end">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="ghost" size="sm" className="text-primary">
                        ❤️ Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center py-8">
        <Button variant="outline" size="lg">
          Load More Flights
        </Button>
      </div>
    </div>
  );
};

export default FlightResults;