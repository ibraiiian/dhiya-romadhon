
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useLessons } from "@/hooks/useLessons";
import LearningProgress from "@/components/learning/LearningProgress";
import LessonCategoryTabs from "@/components/learning/LessonCategoryTabs";
import LoadingLessons from "@/components/learning/LoadingLessons";
import { Lesson } from "@/types/learning";

const LearningHub = () => {
  const { lessons, loading, categories } = useLessons();
  const navigate = useNavigate();
  
  const handleStartLesson = (lesson: Lesson) => {
    // Navigate to the lesson page with the lesson ID
    navigate(`/learning-hub/lesson/${lesson.id}`, { state: { lesson } });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-10">
          <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
            Learning Hub
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-2">
            Enhance Your Knowledge
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Deepen your understanding of Ramadan with our curated collection of lessons and resources
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="glass-card mb-8">
          <CardHeader className="pb-2">
            <CardTitle>Your Learning Progress</CardTitle>
            <CardDescription>Track your journey through our Ramadan learning content</CardDescription>
          </CardHeader>
          <CardContent>
            <LearningProgress 
              lessons={lessons}
              loading={loading}
              categories={categories}
            />
          </CardContent>
        </Card>

        {/* Lesson Categories and Content */}
        {loading ? (
          <LoadingLessons />
        ) : (
          <LessonCategoryTabs 
            categories={categories}
            lessons={lessons}
            onStartLesson={handleStartLesson}
          />
        )}
      </div>
    </div>
  );
};

export default LearningHub;
