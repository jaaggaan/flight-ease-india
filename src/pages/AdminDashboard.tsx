import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Plane, 
  Users, 
  CreditCard, 
  Calendar,
  LogOut,
  TrendingUp,
  Settings,
  Bell,
  Search,
  Filter,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "Successfully logged out from admin panel",
    });
    navigate('/');
  };

  // Mock data for dashboard
  const stats = [
    { title: "Total Bookings", value: "2,847", icon: Plane, change: "+12%" },
    { title: "Active Users", value: "1,234", icon: Users, change: "+8%" },
    { title: "Revenue", value: "₹12,45,000", icon: CreditCard, change: "+23%" },
    { title: "Flights Today", value: "156", icon: Calendar, change: "+5%" }
  ];

  const recentBookings = [
    {
      id: "SY12345678",
      passenger: "Rajesh Kumar",
      flight: "AI 131",
      route: "DEL → BOM",
      date: "2024-01-15",
      amount: "₹8,500",
      status: "confirmed"
    },
    {
      id: "SY87654321",
      passenger: "Priya Sharma",
      flight: "6E 245",
      route: "BLR → DEL",
      date: "2024-01-15",
      amount: "₹12,200", 
      status: "pending"
    },
    {
      id: "SY45612378",
      passenger: "Amit Singh",
      flight: "SG 418",
      route: "MAA → BOM",
      date: "2024-01-14",
      amount: "₹6,800",
      status: "cancelled"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-card border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Plane className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-primary">SkyYatra Admin</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-card bg-gradient-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-accent flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {stat.change}
                    </p>
                  </div>
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="bg-white shadow-card">
            <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
            <TabsTrigger value="flights">Flight Management</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card className="shadow-elegant bg-gradient-card border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Bookings</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search bookings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium">{booking.passenger}</p>
                          <p className="text-sm text-muted-foreground">Booking ID: {booking.id}</p>
                        </div>
                        <div>
                          <p className="font-medium">{booking.flight}</p>
                          <p className="text-sm text-muted-foreground">{booking.route}</p>
                        </div>
                        <div>
                          <p className="text-sm">{booking.date}</p>
                          <p className="font-medium">{booking.amount}</p>
                        </div>
                      </div>
                      <Badge 
                        variant={
                          booking.status === 'confirmed' ? 'default' :
                          booking.status === 'pending' ? 'secondary' : 'destructive'
                        }
                      >
                        {booking.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flights">
            <Card className="shadow-elegant bg-gradient-card border-0">
              <CardHeader>
                <CardTitle>Flight Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Flight management features will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="shadow-elegant bg-gradient-card border-0">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">User management features will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="shadow-elegant bg-gradient-card border-0">
              <CardHeader>
                <CardTitle>Reports & Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Reporting and analytics features will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;