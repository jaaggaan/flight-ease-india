import { useState } from "react";
import { Calendar, Download, MoreHorizontal, Plane, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Header from "@/components/Header";

const mockBookings = [
  {
    id: "SY12345678",
    airline: "IndiGo",
    flightNumber: "6E 2142",
    departure: { time: "06:30", city: "Delhi", code: "DEL", date: "2024-02-15" },
    arrival: { time: "08:45", city: "Mumbai", code: "BOM", date: "2024-02-15" },
    passengers: 1,
    amount: 5024,
    status: "confirmed",
    bookingDate: "2024-01-15"
  },
  {
    id: "SY87654321",
    airline: "Air India",
    flightNumber: "AI 131",
    departure: { time: "14:20", city: "Mumbai", code: "BOM", date: "2024-01-20" },
    arrival: { time: "16:45", city: "Bangalore", code: "BLR", date: "2024-01-20" },
    passengers: 2,
    amount: 8456,
    status: "completed",
    bookingDate: "2024-01-05"
  },
  {
    id: "SY11223344",
    airline: "Vistara",
    flightNumber: "UK 995",
    departure: { time: "09:15", city: "Delhi", code: "DEL", date: "2024-03-10" },
    arrival: { time: "11:30", city: "Chennai", code: "MAA", date: "2024-03-10" },
    passengers: 1,
    amount: 7289,
    status: "cancelled",
    bookingDate: "2024-01-25"
  }
];

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-accent text-accent-foreground";
      case "completed":
        return "bg-secondary text-secondary-foreground";
      case "cancelled":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const filteredBookings = mockBookings.filter(booking => {
    if (activeTab === "all") return true;
    if (activeTab === "upcoming") return booking.status === "confirmed";
    if (activeTab === "completed") return booking.status === "completed";
    if (activeTab === "cancelled") return booking.status === "cancelled";
    return false;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Bookings</h1>
            <p className="text-muted-foreground">Manage and track all your flight bookings</p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full md:w-auto grid-cols-4 md:grid-cols-4">
              <TabsTrigger value="all">All Bookings</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {filteredBookings.length === 0 ? (
                <Card className="shadow-card bg-gradient-card border-0">
                  <CardContent className="p-12 text-center">
                    <Plane className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Bookings Found</h3>
                    <p className="text-muted-foreground mb-6">
                      {activeTab === "all" 
                        ? "You haven't made any bookings yet." 
                        : `No ${activeTab} bookings found.`
                      }
                    </p>
                    <Button variant="hero" onClick={() => window.location.href = '/'}>
                      Book Your First Flight
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredBookings.map((booking) => (
                    <Card key={booking.id} className="shadow-card hover:shadow-elegant transition-shadow duration-300 bg-gradient-card border-0">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Plane className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {booking.airline} {booking.flightNumber}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Booking ID: {booking.id}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download Ticket
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  View Details
                                </DropdownMenuItem>
                                {booking.status === "confirmed" && (
                                  <>
                                    <DropdownMenuItem>
                                      Modify Booking
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">
                                      Cancel Booking
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                          {/* Departure */}
                          <div className="flex items-center gap-3">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-foreground">
                                {booking.departure.time}
                              </div>
                              <div className="text-sm font-medium text-muted-foreground">
                                {booking.departure.code}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {booking.departure.city}
                              </div>
                            </div>
                          </div>

                          {/* Flight Path */}
                          <div className="flex-1 mx-4">
                            <div className="relative">
                              <div className="h-px bg-border w-full"></div>
                              <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-primary bg-background p-1 rounded-full border" />
                            </div>
                            <div className="text-center mt-2">
                              <div className="text-xs text-muted-foreground">
                                {booking.departure.date}
                              </div>
                            </div>
                          </div>

                          {/* Arrival */}
                          <div className="flex items-center gap-3">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-foreground">
                                {booking.arrival.time}
                              </div>
                              <div className="text-sm font-medium text-muted-foreground">
                                {booking.arrival.code}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {booking.arrival.city}
                              </div>
                            </div>
                          </div>

                          {/* Booking Info */}
                          <div className="text-right">
                            <div className="text-lg font-bold text-foreground">
                              ₹{booking.amount.toLocaleString('en-IN')}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {booking.passengers} passenger{booking.passengers > 1 ? 's' : ''}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Booked on {new Date(booking.bookingDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        {booking.status === "confirmed" && (
                          <div className="mt-4 pt-4 border-t border-border">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>Check-in opens 24hrs before</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>Arrive 2hrs early</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;