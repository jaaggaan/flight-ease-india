import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, Download, Share2, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";

const BookingConfirmed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { flight, passengers, bookingId, amount } = location.state || {};

  useEffect(() => {
    if (!flight) {
      navigate('/');
    }
  }, [flight, navigate]);

  if (!flight) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-accent-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
            <p className="text-lg text-muted-foreground">
              Your flight has been successfully booked
            </p>
          </div>

          {/* Booking Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Flight Information */}
              <Card className="shadow-card bg-gradient-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Flight Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{flight.airline}</h3>
                      <p className="text-muted-foreground">{flight.flightNumber}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Duration</div>
                      <div className="font-semibold">{flight.duration}</div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Departure</div>
                      <div className="text-2xl font-bold">{flight.departure.time}</div>
                      <div className="font-medium">{flight.departure.city} ({flight.departure.code})</div>
                      <div className="text-sm text-muted-foreground">{flight.date}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Arrival</div>
                      <div className="text-2xl font-bold">{flight.arrival.time}</div>
                      <div className="font-medium">{flight.arrival.city} ({flight.arrival.code})</div>
                      <div className="text-sm text-muted-foreground">{flight.date}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Passenger Information */}
              <Card className="shadow-card bg-gradient-card border-0">
                <CardHeader>
                  <CardTitle>Passenger Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {passengers.map((passenger: any, index: number) => (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Passenger {index + 1}</div>
                            <div className="font-semibold">
                              {passenger.firstName} {passenger.lastName}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Contact</div>
                            <div className="text-sm">{passenger.email}</div>
                            <div className="text-sm">{passenger.phone}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
                    <div className="text-sm text-muted-foreground">Booking ID</div>
                    <div className="font-mono font-semibold text-lg text-primary">
                      {bookingId}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Paid</span>
                      <span className="font-semibold">₹{amount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Payment Status</span>
                      <span className="text-accent font-semibold">Confirmed</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Button variant="hero" className="w-full">
                      <Download className="h-4 w-4" />
                      Download Ticket
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <Share2 className="h-4 w-4" />
                      Share Booking
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <Calendar className="h-4 w-4" />
                      Add to Calendar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Important Information */}
              <Card className="shadow-card bg-gradient-card border-0">
                <CardHeader>
                  <CardTitle className="text-sm">Important Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <div>• Arrive at airport 2 hours before departure</div>
                  <div>• Carry a valid government ID</div>
                  <div>• Check-in opens 24 hours before departure</div>
                  <div>• Free cancellation within 24 hours</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center mt-8 space-x-4">
            <Button variant="outline" onClick={() => navigate('/my-bookings')}>
              View All Bookings
            </Button>
            <Button variant="hero" onClick={() => navigate('/')}>
              Book Another Flight
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmed;