
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatDate } from "@/lib/utils";

interface Bus {
  id: string;
  busName: string;
  busType: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
  amenities: string[];
  rating: number;
}

const AvailableBuses = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const date = searchParams.get("date") || "";
  
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // This would be an API call in a real application
    setTimeout(() => {
      setBuses([
        {
          id: "bus1",
          busName: "Express Liner",
          busType: "Luxury",
          departureTime: "07:00 AM",
          arrivalTime: "11:30 AM",
          duration: "4h 30m",
          price: 35,
          availableSeats: 23,
          amenities: ["WiFi", "AC", "Snacks", "Charging Port"],
          rating: 4.5
        },
        {
          id: "bus2",
          busName: "City Connector",
          busType: "Standard",
          departureTime: "09:15 AM",
          arrivalTime: "02:30 PM",
          duration: "5h 15m",
          price: 28,
          availableSeats: 18,
          amenities: ["WiFi", "AC"],
          rating: 4.1
        },
        {
          id: "bus3",
          busName: "Royal Travels",
          busType: "Premium",
          departureTime: "11:30 AM",
          arrivalTime: "03:45 PM",
          duration: "4h 15m",
          price: 42,
          availableSeats: 12,
          amenities: ["WiFi", "AC", "Food", "Charging Port", "Entertainment"],
          rating: 4.8
        },
        {
          id: "bus4",
          busName: "Budget Express",
          busType: "Economy",
          departureTime: "01:00 PM",
          arrivalTime: "06:00 PM",
          duration: "5h 00m",
          price: 22,
          availableSeats: 30,
          amenities: ["AC"],
          rating: 3.9
        }
      ]);
      setLoading(false);
    }, 1000);
  }, [from, to, date]);
  
  const handleViewSeats = (busId: string) => {
    navigate(`/seat-selection?busId=${busId}&from=${from}&to=${to}&date=${date}`);
  };
  
  const formatLocation = (location: string) => {
    return location
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`star-${i}`} className="text-yellow-400">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half-star" className="text-yellow-400">★</span>);
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-star-${i}`} className="text-gray-300">★</span>);
    }
    
    return stars;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="bg-blue-800 py-10">
        <div className="container mx-auto px-4">
          <div className="text-white mb-2">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {formatLocation(from)} to {formatLocation(to)}
            </h1>
            <p className="text-blue-200">{formatDate(date)} • {buses.length} buses found</p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {buses.map(bus => (
              <Card key={bus.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="md:flex">
                    <div className="p-6 md:w-1/4 border-r border-gray-200">
                      <h3 className="text-lg font-bold mb-1">{bus.busName}</h3>
                      <div className="flex items-center mb-3">
                        {renderStars(bus.rating)}
                        <span className="ml-2 text-sm text-gray-600">{bus.rating}/5</span>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {bus.busType}
                      </Badge>
                    </div>
                    
                    <div className="p-6 md:w-2/4 flex flex-col md:flex-row justify-between space-y-3 md:space-y-0">
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Departure</p>
                        <p className="text-xl font-semibold">{bus.departureTime}</p>
                        <p className="text-sm font-medium">{formatLocation(from)}</p>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <div className="hidden md:flex items-center">
                          <div className="h-1 w-2 bg-gray-400 rounded-full"></div>
                          <div className="h-0.5 w-16 bg-gray-300"></div>
                          <div className="text-xs text-gray-500 mx-2">{bus.duration}</div>
                          <div className="h-0.5 w-16 bg-gray-300"></div>
                          <div className="h-1 w-2 bg-gray-400 rounded-full"></div>
                        </div>
                        <div className="md:hidden">
                          <div className="text-xs text-gray-500">{bus.duration}</div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Arrival</p>
                        <p className="text-xl font-semibold">{bus.arrivalTime}</p>
                        <p className="text-sm font-medium">{formatLocation(to)}</p>
                      </div>
                    </div>
                    
                    <div className="p-6 md:w-1/4 bg-gray-50 flex flex-col justify-between">
                      <div>
                        <p className="text-gray-500 text-sm mb-1">Amenities</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {bus.amenities.map((amenity, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-gray-500 text-sm">
                          {bus.availableSeats} seats available
                        </p>
                      </div>
                      
                      <div className="mt-4 flex flex-col items-end">
                        <p className="text-2xl font-bold text-blue-700 mb-2">${bus.price}</p>
                        <Button 
                          onClick={() => handleViewSeats(bus.id)} 
                          className="w-full bg-orange-500 hover:bg-orange-600"
                        >
                          View Seats
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default AvailableBuses;
