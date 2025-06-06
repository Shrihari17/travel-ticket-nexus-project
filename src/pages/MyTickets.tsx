
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatDate } from "@/lib/utils";

interface Ticket {
  id: string;
  bookingReference: string;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  seats: string[];
  price: number;
  status: "upcoming" | "completed" | "cancelled";
}

const MyTickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // This would be an API call in a real application
    setTimeout(() => {
      const mockTickets: Ticket[] = [
        {
          id: "1",
          bookingReference: "BT-982731",
          from: "New York",
          to: "Boston",
          date: "2025-07-15",
          departureTime: "07:00 AM",
          seats: ["3A", "3B"],
          price: 70,
          status: "upcoming"
        },
        {
          id: "2",
          bookingReference: "BT-876543",
          from: "Chicago",
          to: "Detroit",
          date: "2025-06-20",
          departureTime: "09:15 AM",
          seats: ["5C"],
          price: 30,
          status: "upcoming"
        },
        {
          id: "3",
          bookingReference: "BT-762135",
          from: "Washington",
          to: "Philadelphia",
          date: "2025-06-01",
          departureTime: "11:30 AM",
          seats: ["8D"],
          price: 25,
          status: "completed"
        },
        {
          id: "4",
          bookingReference: "BT-654321",
          from: "Boston",
          to: "New York",
          date: "2025-05-15",
          departureTime: "02:00 PM",
          seats: ["12A", "12B"],
          price: 70,
          status: "completed"
        },
        {
          id: "5",
          bookingReference: "BT-543210",
          from: "Philadelphia",
          to: "Washington",
          date: "2025-05-10",
          departureTime: "10:30 AM",
          seats: ["4C"],
          price: 25,
          status: "cancelled"
        }
      ];
      
      setTickets(mockTickets);
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleViewTicket = (bookingReference: string) => {
    navigate(`/booking-confirmation?reference=${bookingReference}`);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-green-500">Upcoming</Badge>;
      case "completed":
        return <Badge variant="outline" className="text-gray-500">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return null;
    }
  };
  
  const filterTickets = (status: string) => {
    return tickets.filter(ticket => ticket.status === status);
  };
  
  const renderTicketList = (filteredTickets: Ticket[]) => {
    if (filteredTickets.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No tickets found</p>
        </div>
      );
    }
    
    return filteredTickets.map(ticket => (
      <Card key={ticket.id} className="mb-4 hover:shadow-md transition-shadow">
        <CardContent className="p-0">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Booking Reference</p>
              <p className="font-medium">{ticket.bookingReference}</p>
            </div>
            {getStatusBadge(ticket.status)}
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Route</p>
                <p className="font-medium">{ticket.from} to {ticket.to}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="font-medium">{formatDate(ticket.date)}, {ticket.departureTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Seat(s)</p>
                <p className="font-medium">{ticket.seats.join(", ")}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-between items-center gap-4">
              <p className="font-bold text-blue-600">${ticket.price.toFixed(2)}</p>
              <Button 
                onClick={() => handleViewTicket(ticket.bookingReference)} 
                variant={ticket.status === "cancelled" ? "outline" : "default"}
                className={ticket.status === "cancelled" ? "" : "bg-blue-600 hover:bg-blue-700"}
              >
                View Ticket
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    ));
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="bg-blue-800 py-6">
        <div className="container mx-auto px-4">
          <div className="text-white">
            <h1 className="text-2xl font-bold mb-2">My Tickets</h1>
            <p className="text-blue-200">
              View and manage your bus tickets
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Tickets</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <TabsContent value="all">
                {renderTicketList(tickets)}
              </TabsContent>
              <TabsContent value="upcoming">
                {renderTicketList(filterTickets("upcoming"))}
              </TabsContent>
              <TabsContent value="completed">
                {renderTicketList(filterTickets("completed"))}
              </TabsContent>
              <TabsContent value="cancelled">
                {renderTicketList(filterTickets("cancelled"))}
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default MyTickets;
