
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatDate, cn } from "@/lib/utils";

interface SeatType {
  id: string;
  number: string;
  isBooked: boolean;
  price: number;
}

interface BusInfo {
  id: string;
  name: string;
  type: string;
  departureTime: string;
  arrivalTime: string;
  totalSeats: number;
  seatPrice: number;
}

const SeatSelection = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const busId = searchParams.get("busId") || "";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const date = searchParams.get("date") || "";
  
  const [busInfo, setBusInfo] = useState<BusInfo | null>(null);
  const [seats, setSeats] = useState<SeatType[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // This would be an API call in a real application
    setTimeout(() => {
      // Mock bus info based on busId
      const mockBusInfo: BusInfo = {
        id: busId,
        name: busId === "bus3" ? "Royal Travels" : 
              busId === "bus2" ? "City Connector" : 
              busId === "bus4" ? "Budget Express" : "Express Liner",
        type: busId === "bus3" ? "Premium" : 
              busId === "bus2" ? "Standard" : 
              busId === "bus4" ? "Economy" : "Luxury",
        departureTime: busId === "bus2" ? "09:15 AM" : 
                      busId === "bus3" ? "11:30 AM" : 
                      busId === "bus4" ? "01:00 PM" : "07:00 AM",
        arrivalTime: busId === "bus2" ? "02:30 PM" : 
                    busId === "bus3" ? "03:45 PM" : 
                    busId === "bus4" ? "06:00 PM" : "11:30 AM",
        totalSeats: busId === "bus3" ? 36 : 40,
        seatPrice: busId === "bus3" ? 42 : 
                  busId === "bus2" ? 28 : 
                  busId === "bus4" ? 22 : 35
      };
      
      setBusInfo(mockBusInfo);
      
      // Generate mock seats
      const totalSeats = mockBusInfo.totalSeats;
      const mockSeats: SeatType[] = [];
      
      for (let i = 1; i <= totalSeats; i++) {
        // Format seat numbers: 1A, 1B, 2A, 2B, etc.
        const row = Math.ceil(i / 4);
        const position = i % 4 === 1 ? "A" : i % 4 === 2 ? "B" : i % 4 === 3 ? "C" : "D";
        const seatNumber = `${row}${position}`;
        
        // Randomly mark some seats as booked
        const isRandomlyBooked = Math.random() < 0.3;
        
        mockSeats.push({
          id: `seat-${i}`,
          number: seatNumber,
          isBooked: isRandomlyBooked,
          price: mockBusInfo.seatPrice
        });
      }
      
      setSeats(mockSeats);
      setLoading(false);
    }, 1000);
  }, [busId]);
  
  const toggleSeatSelection = (seatId: string, isBooked: boolean) => {
    if (isBooked) return;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };
  
  const calculateTotalPrice = () => {
    if (!busInfo) return 0;
    return selectedSeats.length * busInfo.seatPrice;
  };
  
  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) return;
    
    const selectedSeatNumbers = selectedSeats.map(seatId => {
      const seat = seats.find(s => s.id === seatId);
      return seat ? seat.number : "";
    }).filter(Boolean);
    
    navigate(`/booking?busId=${busId}&from=${from}&to=${to}&date=${date}&seats=${selectedSeatNumbers.join(',')}&price=${calculateTotalPrice()}`);
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
            <h1 className="text-2xl font-bold mb-2">Select Your Seats</h1>
            <p className="text-blue-200">
              {formatLocation(from)} to {formatLocation(to)} • {formatDate(date)}
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{busInfo?.name}</CardTitle>
                      <p className="text-sm text-gray-500">{busInfo?.type} Bus</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {busInfo?.departureTime} - {busInfo?.arrivalTime}
                      </p>
                      <p className="text-sm font-medium">
                        {formatLocation(from)} to {formatLocation(to)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 flex justify-center">
                    <div className="bg-gray-200 p-3 rounded-lg inline-flex space-x-4">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-white border border-gray-300 rounded mr-2"></div>
                        <span className="text-sm">Available</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-gray-400 rounded mr-2"></div>
                        <span className="text-sm">Booked</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                        <span className="text-sm">Selected</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mb-8">
                    <div className="w-16 h-8 bg-gray-800 rounded-t-3xl flex items-center justify-center">
                      <span className="text-xs text-white">DRIVER</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
                    {seats.map((seat) => (
                      <div 
                        key={seat.id}
                        className={cn(
                          "cursor-pointer border rounded-md p-2 text-center hover:bg-blue-50 transition-colors",
                          seat.isBooked && "bg-gray-400 text-white border-gray-400 hover:bg-gray-400 cursor-not-allowed",
                          selectedSeats.includes(seat.id) && !seat.isBooked && "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                        )}
                        onClick={() => toggleSeatSelection(seat.id, seat.isBooked)}
                      >
                        <p className="text-sm font-medium">{seat.number}</p>
                        <p className="text-xs">${seat.price}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center mt-8">
                    <div className="w-full h-1 bg-gray-300 rounded"></div>
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-xs text-gray-500">ENTRANCE/EXIT</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-1">
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
                    <span>Bus</span>
                    <span className="font-medium">{busInfo?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Departure Time</span>
                    <span className="font-medium">{busInfo?.departureTime}</span>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <p className="font-medium mb-2">Selected Seats ({selectedSeats.length})</p>
                    {selectedSeats.length > 0 ? (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {selectedSeats.map(seatId => {
                          const seat = seats.find(s => s.id === seatId);
                          return seat ? (
                            <Badge key={seatId} variant="outline" className="bg-blue-50">
                              {seat.number}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No seats selected yet</p>
                    )}
                    
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Price</span>
                        <span className="text-blue-700">${calculateTotalPrice()}</span>
                      </div>
                      
                      <Button 
                        onClick={handleProceedToPayment}
                        disabled={selectedSeats.length === 0}
                        className="w-full mt-4 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300"
                      >
                        {selectedSeats.length > 0 
                          ? `Proceed to Payment ($${calculateTotalPrice()})` 
                          : 'Select at least one seat'
                        }
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default SeatSelection;
