
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PopularRoutes from "@/components/PopularRoutes";

const Index = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/available-buses?from=${from}&to=${to}&date=${date}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <HeroSection />
      
      <div className="container mx-auto px-4 py-8 -mt-20 relative z-10">
        <Card className="shadow-xl">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="space-y-5 md:space-y-0 md:flex md:gap-4 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">From</label>
                <Select onValueChange={setFrom} required>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select departure city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new-york">New York</SelectItem>
                    <SelectItem value="boston">Boston</SelectItem>
                    <SelectItem value="chicago">Chicago</SelectItem>
                    <SelectItem value="washington">Washington DC</SelectItem>
                    <SelectItem value="philadelphia">Philadelphia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">To</label>
                <Select onValueChange={setTo} required>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select destination city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new-york">New York</SelectItem>
                    <SelectItem value="boston">Boston</SelectItem>
                    <SelectItem value="chicago">Chicago</SelectItem>
                    <SelectItem value="washington">Washington DC</SelectItem>
                    <SelectItem value="philadelphia">Philadelphia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">Date</label>
                <Input 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)}
                  className="h-12"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              <div>
                <Button type="submit" className="h-12 px-8 bg-orange-500 hover:bg-orange-600 w-full md:w-auto">
                  Search Buses
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="container mx-auto px-4 py-12">
        <PopularRoutes />
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
