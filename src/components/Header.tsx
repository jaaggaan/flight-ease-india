import { Plane, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50 shadow-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-hero rounded-lg shadow-elegant">
              <Plane className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">SkyIndia</h1>
              <p className="text-sm text-muted-foreground">Flight Booking System</p>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Flights
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              My Bookings
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Offers
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Support
            </Button>
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <User className="h-4 w-4" />
              Sign In
            </Button>
            <Button variant="hero" size="sm">
              Register
            </Button>
            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;