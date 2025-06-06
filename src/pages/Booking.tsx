
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";

interface PassengerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const busId = searchParams.get("busId") || "";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const date = searchParams.get("date") || "";
  const seats = searchParams.get("seats")?.split(",") || [];
  const totalPrice = searchParams.get("price") || "0";
  
  const [passengerDetails, setPassengerDetails] = useState<PassengerDetails>({
    fullName: "",
    email: "",
    phone: "",
    address: ""
  });
  
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassengerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, this would submit the booking to an API
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Create a unique booking reference
      const bookingReference = `BT-${Date.now().toString().slice(-6)}`;
      
      navigate(`/booking-confirmation?reference=${bookingReference}&busId=${busId}&from=${from}&to=${to}&date=${date}&seats=${seats.join(',')}&price=${totalPrice}&name=${encodeURIComponent(passengerDetails.fullName)}&email=${encodeURIComponent(passengerDetails.email)}&phone=${encodeURIComponent(passengerDetails.phone)}`);
    }, 1500);
  };
  
  const formatLocation = (location: string) => {
    return location
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="bg-blue-800 py-6">
        <div className="container mx-auto px-4">
          <div className="text-white">
            <h1 className="text-2xl font-bold mb-2">Passenger Details</h1>
            <p className="text-blue-200">
              Complete your booking for {formatLocation(from)} to {formatLocation(to)}
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Passenger Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={passengerDetails.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={passengerDetails.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={passengerDetails.phone}
                        onChange={handleInputChange}
                        placeholder="(123) 456-7890"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={passengerDetails.address}
                        onChange={handleInputChange}
                        placeholder="123 Main St, City, State"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="terms" 
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the terms and conditions and cancellation policy
                      </label>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Processing...
                      </>
                    ) : (
                      `Confirm Booking & Pay $${totalPrice}`
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Journey</span>
                  <span className="font-medium">
                    {formatLocation(from)} to {formatLocation(to)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Date</span>
                  <span className="font-medium">{formatDate(date)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Seats</span>
                  <span className="font-medium">{seats.join(", ")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ticket Price</span>
                  <span className="font-medium">${parseInt(totalPrice) / seats.length} × {seats.length}</span>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Price</span>
                    <span className="text-blue-700">${totalPrice}</span>
                  </div>
                </div>
                
                <div className="pt-4 bg-gray-50 p-4 rounded-lg mt-6">
                  <h4 className="font-medium mb-2">Payment Methods</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="border p-2 rounded flex items-center justify-center bg-white">
                      <span>Visa</span>
                    </div>
                    <div className="border p-2 rounded flex items-center justify-center bg-white">
                      <span>MasterCard</span>
                    </div>
                    <div className="border p-2 rounded flex items-center justify-center bg-white">
                      <span>PayPal</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    All transactions are secure and encrypted.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Booking;
