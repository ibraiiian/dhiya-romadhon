
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Lesson } from "@/types/learning";
import { toast } from "@/components/ui/use-toast";

export const useLessons = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(["All Lessons"]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        
        // Fetch lessons from Supabase
        const { data, error } = await supabase
          .from('learning_resources')
          .select('*');
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Map data to ensure correct types
          const typedLessons: Lesson[] = data.map(lesson => ({
            id: lesson.id,
            title: lesson.title,
            description: lesson.description,
            duration: lesson.duration,
            // Ensure difficulty is one of the allowed values
            difficulty: validateDifficulty(lesson.difficulty),
            completed: Boolean(lesson.completed),
            category: lesson.category,
            created_at: lesson.created_at
          }));
          
          setLessons(typedLessons);
          console.log("Fetched learning resources:", typedLessons);
          
          // Extract unique categories from the data
          const uniqueCategories = [...new Set(typedLessons.map(lesson => lesson.category))];
          setCategories(["All Lessons", ...uniqueCategories]);
        }
      } catch (error) {
        console.error('Error fetching lessons:', error);
        toast({
          title: "Error",
          description: "Failed to load learning resources. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  // Helper function to validate difficulty values
  const validateDifficulty = (difficulty: string): "Beginner" | "Intermediate" | "Advanced" => {
    if (difficulty === "Beginner" || difficulty === "Intermediate" || difficulty === "Advanced") {
      return difficulty;
    }
    // Default to Beginner if value is not valid
    return "Beginner";
  };

  return { lessons, loading, categories };
};
