import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Users, Calendar, CreditCard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";

const BookFlight = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const flightId = searchParams.get('flightId') || '1';
  
  const [passengers, setPassengers] = useState([
    { firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '' }
  ]);

  const mockFlight = {
    airline: "IndiGo",
    flightNumber: "6E 2142",
    departure: { time: "06:30", city: "Delhi", code: "DEL" },
    arrival: { time: "08:45", city: "Mumbai", code: "BOM" },
    duration: "2h 15m",
    price: 4567,
    date: "2024-02-15"
  };

  const addPassenger = () => {
    setPassengers([...passengers, { firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '' }]);
  };

  const updatePassenger = (index: number, field: string, value: string) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const handleProceedToPayment = () => {
    navigate('/payment', { state: { flight: mockFlight, passengers } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Results
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Flight Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Flight Summary */}
            <Card className="shadow-card bg-gradient-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Flight Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{mockFlight.airline} {mockFlight.flightNumber}</h3>
                    <p className="text-muted-foreground">{mockFlight.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      {mockFlight.departure.time} - {mockFlight.arrival.time}
                    </div>
                    <div className="font-semibold">
                      {mockFlight.departure.code} → {mockFlight.arrival.code}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Passenger Information */}
            <Card className="shadow-card bg-gradient-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Passenger Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {passengers.map((passenger, index) => (
                  <div key={index} className="space-y-4 p-4 border border-border rounded-lg">
                    <h4 className="font-semibold text-foreground">Passenger {index + 1}</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`firstName-${index}`}>First Name *</Label>
                        <Input
                          id={`firstName-${index}`}
                          value={passenger.firstName}
                          onChange={(e) => updatePassenger(index, 'firstName', e.target.value)}
                          placeholder="Enter first name"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`lastName-${index}`}>Last Name *</Label>
                        <Input
                          id={`lastName-${index}`}
                          value={passenger.lastName}
                          onChange={(e) => updatePassenger(index, 'lastName', e.target.value)}
                          placeholder="Enter last name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`email-${index}`}>Email *</Label>
                        <Input
                          id={`email-${index}`}
                          type="email"
                          value={passenger.email}
                          onChange={(e) => updatePassenger(index, 'email', e.target.value)}
                          placeholder="Enter email address"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`phone-${index}`}>Phone Number *</Label>
                        <Input
                          id={`phone-${index}`}
                          value={passenger.phone}
                          onChange={(e) => updatePassenger(index, 'phone', e.target.value)}
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor={`dob-${index}`}>Date of Birth *</Label>
                      <Input
                        id={`dob-${index}`}
                        type="date"
                        value={passenger.dateOfBirth}
                        onChange={(e) => updatePassenger(index, 'dateOfBirth', e.target.value)}
                      />
                    </div>
                  </div>
                ))}

                <Button variant="outline" onClick={addPassenger}>
                  <Users className="h-4 w-4" />
                  Add Another Passenger
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <Card className="shadow-elegant bg-gradient-card border-0">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Base Fare ({passengers.length} passenger{passengers.length > 1 ? 's' : ''})</span>
                    <span>₹{(mockFlight.price * passengers.length).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & Fees</span>
                    <span>₹{Math.round(mockFlight.price * 0.1 * passengers.length).toLocaleString('en-IN')}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Amount</span>
                    <span>₹{Math.round(mockFlight.price * 1.1 * passengers.length).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 text-accent" />
                    <span>Secure SSL Encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CreditCard className="h-4 w-4 text-accent" />
                    <span>Multiple Payment Options</span>
                  </div>
                </div>

                <Button 
                  variant="hero" 
                  className="w-full"
                  onClick={handleProceedToPayment}
                >
                  Proceed to Payment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookFlight;