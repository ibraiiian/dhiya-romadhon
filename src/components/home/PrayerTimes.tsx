
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

interface PrayerTime {
  id: number;
  name: string;
  time: string;
  arabic_name: string;
  location: string;
  date: string;
}

const PrayerTimes = () => {
  const [loading, setLoading] = useState(true);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [location, setLocation] = useState("Loading location...");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        setDate(formattedDate);

        // Fetch prayer times from Supabase for current date
        const { data, error } = await supabase
          .from('prayer_times')
          .select('*')
          .order('id', { ascending: true });
        
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
          setPrayerTimes(data);
          setLocation(data[0].location);
          console.log("Fetched prayer times:", data);
        }
      } catch (error) {
        console.error('Error fetching prayer times:', error);
        toast({
          title: "Error",
          description: "Failed to load prayer times. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, []);

  // Find the next prayer
  const findNextPrayer = () => {
    if (prayerTimes.length === 0) return null;
    
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    for (const prayer of prayerTimes) {
      const [time, period] = prayer.time.split(" ");
      const [hour, minute] = time.split(":").map(Number);
      
      let prayerHour = hour;
      if (period === "PM" && hour !== 12) prayerHour += 12;
      if (period === "AM" && hour === 12) prayerHour = 0;
      
      if (
        prayerHour > currentHour ||
        (prayerHour === currentHour && minute > currentMinute)
      ) {
        return prayer;
      }
    }
    
    // If no prayer found, return the first prayer of the day (for tomorrow)
    return prayerTimes[0];
  };

  const nextPrayer = findNextPrayer();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-transparent to-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
            Prayer Schedule
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
            Today's Prayer Times
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Stay connected with your spiritual obligations throughout the day
          </p>
        </div>

        <Card className="glass-card max-w-4xl mx-auto overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <div>
                <CardTitle className="text-xl font-medium">{date}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  {location}
                </CardDescription>
              </div>
              {nextPrayer && !loading && (
                <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
                  <Clock className="h-4 w-4 text-primary" />
                  <div className="text-sm">
                    <span className="text-muted-foreground">Next Prayer: </span>
                    <span className="font-medium">{nextPrayer.name}</span>
                    <span className="mx-1">•</span>
                    <span>{nextPrayer.time}</span>
                  </div>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-24 rounded-xl bg-muted/50 animate-pulse"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {prayerTimes.map((prayer) => (
                  <div
                    key={prayer.id}
                    className={`rounded-xl p-4 border transition-all ${
                      nextPrayer?.id === prayer.id
                        ? "bg-primary/5 border-primary/30"
                        : "bg-card border-border hover:border-primary/20"
                    }`}
                  >
                    <div className="flex flex-col h-full justify-between">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{prayer.name}</h3>
                        <span className="text-xs font-arabic text-muted-foreground">
                          {prayer.arabic_name}
                        </span>
                      </div>
                      <div
                        className={`text-xl font-medium mt-1 ${
                          nextPrayer?.id === prayer.id
                            ? "text-primary"
                            : "text-foreground"
                        }`}
                      >
                        {prayer.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 text-center">
              <Link to="/prayer-times">
                <Button variant="outline" className="rounded-full">
                  See Full Monthly Schedule
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PrayerTimes;
