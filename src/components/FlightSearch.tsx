import { useState } from "react";
import { Calendar, MapPin, Users, ArrowLeftRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const popularCities = [
  { code: "DEL", city: "Delhi", airport: "Indira Gandhi International" },
  { code: "BOM", city: "Mumbai", airport: "Chhatrapati Shivaji Maharaj International" },
  { code: "BLR", city: "Bangalore", airport: "Kempegowda International" },
  { code: "MAA", city: "Chennai", airport: "Chennai International" },
  { code: "CCU", city: "Kolkata", airport: "Netaji Subhash Chandra Bose International" },
  { code: "HYD", city: "Hyderabad", airport: "Rajiv Gandhi International" },
  { code: "AMD", city: "Ahmedabad", airport: "Sardar Vallabhbhai Patel International" },
  { code: "COK", city: "Kochi", airport: "Cochin International" },
];

const FlightSearch = () => {
  const [tripType, setTripType] = useState("roundtrip");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [passengers, setPassengers] = useState("1");
  const [classType, setClassType] = useState("economy");

  const handleSwapCities = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = () => {
    console.log("Searching flights...", {
      tripType,
      from,
      to,
      departDate,
      returnDate,
      passengers,
      classType,
    });
  };

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-elegant bg-gradient-card border-0">
      <CardContent className="p-6">
        {/* Trip Type Selection */}
        <div className="flex gap-4 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tripType"
              value="oneway"
              checked={tripType === "oneway"}
              onChange={(e) => setTripType(e.target.value)}
              className="text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium">One Way</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tripType"
              value="roundtrip"
              checked={tripType === "roundtrip"}
              onChange={(e) => setTripType(e.target.value)}
              className="text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium">Round Trip</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tripType"
              value="multicity"
              checked={tripType === "multicity"}
              onChange={(e) => setTripType(e.target.value)}
              className="text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium">Multi City</span>
          </label>
        </div>

        {/* Search Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* From City */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-muted-foreground mb-2">From</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal h-12"
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  {from ? (
                    <div>
                      <div className="font-semibold">{from}</div>
                      <div className="text-xs text-muted-foreground">
                        {popularCities.find(city => city.code === from)?.city}
                      </div>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Select city</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="start">
                <div className="p-4">
                  <Input
                    placeholder="Search cities..."
                    className="mb-4"
                  />
                  <div className="space-y-2">
                    {popularCities.map((city) => (
                      <button
                        key={city.code}
                        onClick={() => setFrom(city.code)}
                        className="w-full text-left p-3 hover:bg-accent rounded-md transition-colors"
                      >
                        <div className="font-semibold">{city.city} ({city.code})</div>
                        <div className="text-sm text-muted-foreground">{city.airport}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Swap Button */}
          <div className="lg:col-span-1 flex items-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSwapCities}
              className="h-12 w-12 rounded-full bg-primary/10 hover:bg-primary/20 text-primary"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>
          </div>

          {/* To City */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-muted-foreground mb-2">To</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal h-12"
                >
                  <MapPin className="h-4 w-4 text-accent" />
                  {to ? (
                    <div>
                      <div className="font-semibold">{to}</div>
                      <div className="text-xs text-muted-foreground">
                        {popularCities.find(city => city.code === to)?.city}
                      </div>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Select city</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="start">
                <div className="p-4">
                  <Input
                    placeholder="Search cities..."
                    className="mb-4"
                  />
                  <div className="space-y-2">
                    {popularCities.map((city) => (
                      <button
                        key={city.code}
                        onClick={() => setTo(city.code)}
                        className="w-full text-left p-3 hover:bg-accent rounded-md transition-colors"
                      >
                        <div className="font-semibold">{city.city} ({city.code})</div>
                        <div className="text-sm text-muted-foreground">{city.airport}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Departure Date */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-muted-foreground mb-2">Departure</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal h-12",
                    !departDate && "text-muted-foreground"
                  )}
                >
                  <Calendar className="h-4 w-4 text-primary" />
                  {departDate ? format(departDate, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={departDate}
                  onSelect={setDepartDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Return Date */}
          {tripType === "roundtrip" && (
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-muted-foreground mb-2">Return</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal h-12",
                      !returnDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="h-4 w-4 text-accent" />
                    {returnDate ? format(returnDate, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={returnDate}
                    onSelect={setReturnDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Passengers & Class */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-muted-foreground mb-2">Travelers</label>
            <div className="grid grid-cols-2 gap-2">
              <Select value={passengers} onValueChange={setPassengers}>
                <SelectTrigger className="h-12">
                  <Users className="h-4 w-4 text-primary" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'Passenger' : 'Passengers'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={classType} onValueChange={setClassType}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="premium">Premium Economy</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="first">First Class</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-6 text-center">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={handleSearch}
            className="px-12"
          >
            <Search className="h-5 w-5" />
            Search Flights
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightSearch;