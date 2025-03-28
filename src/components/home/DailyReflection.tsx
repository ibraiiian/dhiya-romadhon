
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface Reflection {
  id: number;
  type: "quote" | "verse" | "hadith";
  content: string;
  source: string;
  arabic?: string;
}

// Function to validate reflection type
const isValidReflectionType = (type: string): type is "quote" | "verse" | "hadith" => {
  return type === "quote" || type === "verse" || type === "hadith";
};

const DailyReflection = () => {
  const [reflection, setReflection] = useState<Reflection | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchReflection = async () => {
      try {
        setLoading(true);
        
        // Get the current day of the month to cycle through reflections
        const day = new Date().getDate();
        
        // Fetch reflections from Supabase
        const { data, error } = await supabase
          .from('daily_reflections')
          .select('*');
        
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
          // Use day of month to determine which reflection to show
          const index = day % data.length;
          const item = data[index];
          
          // Validate the type before setting to state
          if (isValidReflectionType(item.type)) {
            setReflection({
              id: item.id,
              type: item.type,
              content: item.content,
              source: item.source,
              arabic: item.arabic || undefined
            });
            console.log("Fetched reflection:", item);
          } else {
            throw new Error(`Invalid reflection type: ${item.type}`);
          }
        }
      } catch (error) {
        console.error('Error fetching reflection:', error);
        toast({
          title: "Error",
          description: "Failed to load daily reflection. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReflection();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-10 md:mb-16">
            <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
              Daily Inspiration
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
              Today's Reflection
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl">
              Each day brings a new opportunity for spiritual growth and reflection
            </p>
          </div>
          <Card className="glass-card max-w-3xl mx-auto h-64 animate-pulse">
            <CardHeader className="pb-3">
              <div className="h-6 bg-muted-foreground/20 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-muted-foreground/20 rounded w-1/4"></div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-4 bg-muted-foreground/20 rounded w-full mb-2"></div>
              <div className="h-4 bg-muted-foreground/20 rounded w-full mb-2"></div>
              <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  if (!reflection) return null;

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "verse":
        return "Quranic Verse";
      case "hadith":
        return "Hadith";
      case "quote":
        return "Islamic Quote";
      default:
        return "Reflection";
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
            Daily Inspiration
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
            Today's Reflection
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Each day brings a new opportunity for spiritual growth and reflection
          </p>
        </div>

        <Card className="glass-card max-w-3xl mx-auto transform transition-all hover:scale-[1.01] duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-medium">
                {getTypeLabel(reflection.type)}
              </CardTitle>
              <span className="text-xs font-medium text-muted-foreground px-3 py-1 bg-muted rounded-full">
                Day {new Date().getDate()}
              </span>
            </div>
            <CardDescription>{reflection.source}</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {reflection.arabic && (
              <p className="text-xl md:text-2xl font-arabic leading-relaxed text-right mb-6 text-foreground">
                {reflection.arabic}
              </p>
            )}
            <blockquote className="text-lg md:text-xl italic font-serif relative pl-4 border-l-2 border-primary">
              <p className="mb-4">{reflection.content}</p>
            </blockquote>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DailyReflection;
