
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Circle, BookOpen, Heart, Calendar, BookMarked } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [prayers, setPrayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch prayer tracking data when logged in
  useEffect(() => {
    if (isLoggedIn) {
      const fetchPrayerTracking = async () => {
        try {
          setLoading(true);
          
          // Fetch worship tracking data from Supabase
          // In a real app with auth, you would filter by user_id
          const { data, error } = await supabase
            .from('worship_tracking')
            .select('*')
            .eq('date', new Date().toISOString().split('T')[0]);
          
          if (error) {
            throw error;
          }
          
          if (data && data.length > 0) {
            setPrayers(data);
            console.log("Fetched worship tracking:", data);
          }
        } catch (error) {
          console.error('Error fetching prayer tracking:', error);
          toast({
            title: "Error",
            description: "Failed to load prayer tracking data. Please try again later.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };

      fetchPrayerTracking();
    }
  }, [isLoggedIn]);

  // This is a mock - in a real application, you would check authentication state
  // For demo purposes, we're showing a login prompt
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <Card className="glass-card w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-serif">Dashboard Access</CardTitle>
            <CardDescription>
              Please log in to access your personal dashboard and track your Ramadan journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <Button 
                onClick={() => setIsLoggedIn(true)} 
                className="w-full rounded-full"
              >
                Continue to Demo Dashboard
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                This is a demo. In a complete application, this would redirect to the login page.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Define fallback prayers if the API call fails or is empty
  const fallbackPrayers = [
    { prayer_name: "Fajr", completed: true },
    { prayer_name: "Dhuhr", completed: true },
    { prayer_name: "Asr", completed: false },
    { prayer_name: "Maghrib", completed: false },
    { prayer_name: "Isha", completed: false },
    { prayer_name: "Taraweeh", completed: false },
    { prayer_name: "Tahajjud", completed: false },
  ];

  // Use fetched prayers or fallback if empty
  const displayPrayers = prayers.length > 0 ? prayers : fallbackPrayers;

  // Dashboard widgets
  const widgets = [
    {
      title: "Quran Progress",
      icon: <BookOpen className="h-5 w-5" />,
      value: "3 pages",
      description: "Today's reading",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Fasting",
      icon: <Calendar className="h-5 w-5" />,
      value: "Day 7",
      description: "of Ramadan",
      color: "bg-amber-500/10 text-amber-500",
    },
    {
      title: "Dua Collection",
      icon: <Heart className="h-5 w-5" />,
      value: "12",
      description: "Duas memorized",
      color: "bg-rose-500/10 text-rose-500",
    },
    {
      title: "Learning",
      icon: <BookMarked className="h-5 w-5" />,
      value: "5",
      description: "Lessons completed",
      color: "bg-emerald-500/10 text-emerald-500",
    },
  ];

  // Handle prayer completion toggle
  const togglePrayerCompletion = async (prayerName: string, currentStatus: boolean) => {
    try {
      // In a real app with auth, this would update the user's specific record
      const { error } = await supabase
        .from('worship_tracking')
        .update({ completed: !currentStatus })
        .eq('prayer_name', prayerName)
        .eq('date', new Date().toISOString().split('T')[0]);
      
      if (error) {
        throw error;
      }
      
      // Update local state
      setPrayers(prayers.map(prayer => 
        prayer.prayer_name === prayerName 
          ? { ...prayer, completed: !currentStatus } 
          : prayer
      ));
      
      toast({
        title: "Updated",
        description: `${prayerName} prayer marked as ${!currentStatus ? 'completed' : 'not completed'}.`,
      });
    } catch (error) {
      console.error('Error updating prayer status:', error);
      toast({
        title: "Error",
        description: "Failed to update prayer status. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Dashboard</h1>
            <p className="text-muted-foreground">
              Track your worship and progress throughout Ramadan
            </p>
          </div>
          <Button className="self-start md:self-auto rounded-full">
            Update Daily Progress
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {widgets.map((widget, i) => (
            <Card key={i} className="border">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    {widget.title}
                  </CardTitle>
                  <div className={`p-1.5 rounded-full ${widget.color}`}>
                    {widget.icon}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{widget.value}</div>
                <p className="text-xs text-muted-foreground">
                  {widget.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="prayers" className="space-y-4">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 h-auto p-1 rounded-lg">
            <TabsTrigger value="prayers" className="py-2">
              Daily Prayers
            </TabsTrigger>
            <TabsTrigger value="journal" className="py-2">
              Reflection Journal
            </TabsTrigger>
            <TabsTrigger value="checklist" className="py-2">
              Ibadah Checklist
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="prayers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Prayer Tracker</CardTitle>
                <CardDescription>
                  Track your daily prayers throughout Ramadan
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className="h-16 bg-muted-foreground/20 rounded animate-pulse"
                      ></div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {displayPrayers.map((prayer, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-muted/30 transition-colors"
                        onClick={() => togglePrayerCompletion(prayer.prayer_name, prayer.completed)}
                      >
                        <span className="font-medium">{prayer.prayer_name}</span>
                        {prayer.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="journal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reflection Journal</CardTitle>
                <CardDescription>
                  Record your thoughts and reflections for each day of Ramadan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <textarea
                    className="w-full h-32 p-3 border rounded-md"
                    placeholder="Write your reflection for today..."
                  ></textarea>
                  <Button className="rounded-full">Save Reflection</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="checklist" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ibadah Checklist</CardTitle>
                <CardDescription>
                  Track your daily worship activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="fasting" className="h-4 w-4 rounded text-primary" />
                    <label htmlFor="fasting" className="text-sm font-medium">
                      Completed today's fast
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="quran" className="h-4 w-4 rounded text-primary" />
                    <label htmlFor="quran" className="text-sm font-medium">
                      Read Quran (daily portion)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="dua" className="h-4 w-4 rounded text-primary" />
                    <label htmlFor="dua" className="text-sm font-medium">
                      Made du'a for family and friends
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="charity" className="h-4 w-4 rounded text-primary" />
                    <label htmlFor="charity" className="text-sm font-medium">
                      Gave charity today
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="dhikr" className="h-4 w-4 rounded text-primary" />
                    <label htmlFor="dhikr" className="text-sm font-medium">
                      Completed daily dhikr
                    </label>
                  </div>
                  <Button className="rounded-full mt-4">Save Progress</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
