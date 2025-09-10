import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, CreditCard, Shield, Lock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const { flight, passengers } = location.state || {};
  
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });

  const totalAmount = flight ? Math.round(flight.price * 1.1 * passengers.length) : 5000;

  const handlePayment = () => {
    // Razorpay demo payment integration
    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag", // Demo test key
      amount: totalAmount * 100, // Amount in paise
      currency: "INR",
      name: "SkyYatra",
      description: `Flight booking - ${flight.airline} ${flight.flightNumber}`,
      image: "/placeholder.svg",
      handler: function (response: any) {
        toast({
          title: "Payment Successful!",
          description: `Payment ID: ${response.razorpay_payment_id}`,
        });
        
        // Navigate to confirmation page
        setTimeout(() => {
          navigate('/booking-confirmed', { 
            state: { 
              flight, 
              passengers, 
              bookingId: 'SY' + Math.random().toString(36).substr(2, 8).toUpperCase(),
              amount: totalAmount,
              paymentId: response.razorpay_payment_id
            } 
          });
        }, 1000);
      },
      prefill: {
        name: passengers[0]?.firstName + ' ' + passengers[0]?.lastName || '',
        email: passengers[0]?.email || '',
        contact: passengers[0]?.phone || ''
      },
      theme: {
        color: "#2563eb"
      }
    };

    // Load Razorpay script dynamically
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    };
    document.head.appendChild(script);
  };

  if (!flight) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">No Flight Selected</h1>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

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
          Back to Booking
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Security Notice */}
            <Card className="shadow-card bg-gradient-card border-0">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="h-5 w-5 text-accent" />
                  <span className="text-muted-foreground">
                    Your payment is secured with 256-bit SSL encryption
                  </span>
                  <Lock className="h-4 w-4 text-accent" />
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="shadow-card bg-gradient-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: "card", label: "Credit/Debit Card", icon: "💳" },
                    { id: "upi", label: "UPI Payment", icon: "📱" },
                    { id: "netbanking", label: "Net Banking", icon: "🏦" }
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 border rounded-lg text-center transition-colors ${
                        paymentMethod === method.id
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="text-2xl mb-2">{method.icon}</div>
                      <div className="text-sm font-medium">{method.label}</div>
                    </button>
                  ))}
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        placeholder="user@paytm"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "netbanking" && (
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="bank">Select Bank</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sbi">State Bank of India</SelectItem>
                          <SelectItem value="hdfc">HDFC Bank</SelectItem>
                          <SelectItem value="icici">ICICI Bank</SelectItem>
                          <SelectItem value="axis">Axis Bank</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary */}
          <div className="space-y-6">
            <Card className="shadow-elegant bg-gradient-card border-0">
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">{flight.airline} {flight.flightNumber}</h4>
                  <p className="text-sm text-muted-foreground">
                    {flight.departure.code} → {flight.arrival.code}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {flight.departure.time} - {flight.arrival.time}
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Base Fare ({passengers.length} passenger{passengers.length > 1 ? 's' : ''})</span>
                    <span>₹{(flight.price * passengers.length).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taxes & Fees</span>
                    <span>₹{Math.round(flight.price * 0.1 * passengers.length).toLocaleString('en-IN')}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Amount</span>
                    <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-2 text-sm text-accent">
                    <CheckCircle className="h-4 w-4" />
                    <span>Free Cancellation (24 hrs)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-accent">
                    <CheckCircle className="h-4 w-4" />
                    <span>No Convenience Fee</span>
                  </div>
                </div>

                <Button 
                  variant="hero" 
                  className="w-full"
                  onClick={handlePayment}
                >
                  <Lock className="h-4 w-4" />
                  Pay with Razorpay ₹{totalAmount.toLocaleString('en-IN')}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By clicking "Pay Now" you agree to our Terms & Conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;