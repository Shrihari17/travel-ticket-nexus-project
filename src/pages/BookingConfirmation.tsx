
import { useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatDate, cn } from "@/lib/utils";
import { Printer, Download } from "lucide-react";
import { toast } from "sonner";

const BookingConfirmation = () => {
  const [searchParams] = useSearchParams();
  const ticketRef = useRef<HTMLDivElement>(null);
  
  const bookingReference = searchParams.get("reference") || "";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const date = searchParams.get("date") || "";
  const seats = searchParams.get("seats")?.split(",") || [];
  const totalPrice = searchParams.get("price") || "0";
  const passengerName = searchParams.get("name") || "";
  const passengerEmail = searchParams.get("email") || "";
  const passengerPhone = searchParams.get("phone") || "";
  
  const [isDownloading, setIsDownloading] = useState(false);
  
  const formatLocation = (location: string) => {
    return location
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleDownloadTicket = () => {
    setIsDownloading(true);
    
    // Simulate download - in a real app, this would generate a PDF
    setTimeout(() => {
      setIsDownloading(false);
      toast.success("Ticket downloaded successfully!");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="print:hidden">
        <Header />
      </div>
      
      <div className="bg-green-600 py-8 print:hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h1>
          <p className="text-green-100">
            Your booking has been confirmed and your tickets are ready.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div ref={ticketRef} className={cn(
            "bg-white rounded-lg overflow-hidden",
            "print:shadow-none"
          )}>
            <div className="print:mb-8">
              <Card className="border-0 shadow-lg print:shadow-none">
                <CardHeader className="bg-blue-600 text-white print:bg-white print:text-black">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-bold">
                      <span className="text-white print:text-black">Bus Ticket</span>
                    </CardTitle>
                    <div className="text-sm print:text-black">
                      <p className="font-bold">Booking Reference</p>
                      <p>{bookingReference}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
                    <div>
                      <h3 className="font-medium text-gray-500 mb-1">Journey</h3>
                      <p className="font-bold text-lg">{formatLocation(from)} to {formatLocation(to)}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-500 mb-1">Date</h3>
                      <p className="font-bold">{formatDate(date)}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-500 mb-1">Passenger</h3>
                      <p className="font-bold">{passengerName}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-500 mb-1">Contact</h3>
                      <p>{passengerPhone}</p>
                      <p className="text-sm">{passengerEmail}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-500 mb-1">Seat(s)</h3>
                      <p className="font-bold">{seats.join(", ")}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-500 mb-1">Total Price</h3>
                      <p className="font-bold text-blue-600">${totalPrice}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 border-t border-dashed pt-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-bold">BusTracker</h3>
                        <p className="text-sm text-gray-500">Your trusted bus reservation platform</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Ticket issued on</p>
                        <p className="font-medium">{new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <svg
                      className="h-24 w-64"
                      viewBox="0 0 100 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Mock barcode for visual effect */}
                      {Array.from({ length: 30 }).map((_, i) => (
                        <rect
                          key={i}
                          x={i * 3 + 5}
                          y={5}
                          width={Math.random() > 0.3 ? 2 : 1}
                          height={20}
                          fill="#000"
                        />
                      ))}
                    </svg>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-6 flex gap-4 print:hidden">
                <Button 
                  onClick={handlePrint}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print Ticket
                </Button>
                <Button 
                  onClick={handleDownloadTicket}
                  className="flex-1"
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Download Ticket
                    </>
                  )}
                </Button>
              </div>
              
              <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-200 print:hidden">
                <h3 className="font-medium mb-2">Important Information</h3>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li>Please arrive at least 15 minutes before departure time</li>
                  <li>Present your ticket (printed or digital) at the boarding gate</li>
                  <li>Carry a valid ID proof for verification</li>
                  <li>Cancellations can be made up to 4 hours before departure</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto print:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default BookingConfirmation;
