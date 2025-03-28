
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Award } from "lucide-react";
import { Lesson } from "@/types/learning";

interface LearningProgressProps {
  lessons: Lesson[];
  loading: boolean;
  categories: string[];
}

const LearningProgress = ({ lessons, loading, categories }: LearningProgressProps) => {
  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const progressPercentage = lessons.length > 0 ? (completedLessons / lessons.length) * 100 : 0;

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-6 bg-muted-foreground/20 rounded"></div>
        <div className="h-2 bg-muted-foreground/20 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-muted-foreground/20 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          {completedLessons} of {lessons.length} lessons completed
        </span>
        <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
      </div>
      <Progress value={progressPercentage} className="h-2" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border">
          <BookOpen className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium">{lessons.length} Total Lessons</p>
            <p className="text-xs text-muted-foreground">Across {categories.length - 1} categories</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/5 border">
          <Clock className="h-5 w-5 text-amber-500" />
          <div>
            <p className="text-sm font-medium">~2 hours</p>
            <p className="text-xs text-muted-foreground">Total learning time</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/5 border">
          <Award className="h-5 w-5 text-green-500" />
          <div>
            <p className="text-sm font-medium">Certificate</p>
            <p className="text-xs text-muted-foreground">Upon completion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningProgress;
