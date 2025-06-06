
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const popularRoutes = [
  {
    from: "New York",
    to: "Boston",
    price: "$35",
    duration: "4h 30m",
    departureTime: "Daily 7:00 AM",
    image: "https://images.unsplash.com/photo-1617419250411-98aa962b070f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    from: "Chicago",
    to: "Detroit",
    price: "$30",
    duration: "5h 15m",
    departureTime: "Daily 8:30 AM",
    image: "https://images.unsplash.com/photo-1564694202883-46e7448c1b26?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    from: "Washington",
    to: "Philadelphia",
    price: "$25",
    duration: "3h 10m",
    departureTime: "Daily 9:15 AM",
    image: "https://images.unsplash.com/photo-1612530316991-aa6d27bdbb7b?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

const PopularRoutes = () => {
  const navigate = useNavigate();
  
  const handleBookNow = (from: string, to: string) => {
    const fromSlug = from.toLowerCase().replace(/\s+/g, '-');
    const toSlug = to.toLowerCase().replace(/\s+/g, '-');
    const today = new Date().toISOString().split('T')[0];
    
    navigate(`/available-buses?from=${fromSlug}&to=${toSlug}&date=${today}`);
  };
  
  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Popular Routes</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our most booked routes with comfortable buses and convenient schedules
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {popularRoutes.map((route, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="h-48 overflow-hidden">
              <img 
                src={route.image} 
                alt={`${route.from} to ${route.to}`} 
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            </div>
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-semibold">
                    {route.from} to {route.to}
                  </h3>
                  <p className="text-gray-500">{route.departureTime}</p>
                </div>
                <div className="text-lg font-bold text-blue-600">
                  {route.price}
                </div>
              </div>
              
              <div className="flex justify-between text-sm mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">Duration:</span>
                  <span className="font-medium">{route.duration}</span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600"
                onClick={() => handleBookNow(route.from, route.to)}
              >
                Book Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PopularRoutes;
