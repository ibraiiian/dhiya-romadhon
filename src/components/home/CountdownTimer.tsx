import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set Ramadhan start date to March 30, 2025
    const ramadhanDate = new Date(2025, 2, 30); // Month is 0-based, so 2 = March
    
    const calculateTimeLeft = () => {
      const difference = ramadhanDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // Ramadhan has started
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="text-center">
          <h2 className="text-3xl font-serif font-bold tracking-tight mb-4">Countdown to Ramadhan 1446H</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-secondary p-4 rounded-lg">
              <div className="text-4xl font-bold">{timeLeft.days.toString().padStart(2, "0")}</div>
              <div className="text-sm text-muted-foreground">Days</div>
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <div className="text-4xl font-bold">{timeLeft.hours.toString().padStart(2, "0")}</div>
              <div className="text-sm text-muted-foreground">Hours</div>
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <div className="text-4xl font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</div>
              <div className="text-sm text-muted-foreground">Minutes</div>
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <div className="text-4xl font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</div>
              <div className="text-sm text-muted-foreground">Seconds</div>
            </div>
          </div>
          <p className="text-muted-foreground mt-6">
            Prepare yourself for the blessed month of Ramadhan
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CountdownTimer;
