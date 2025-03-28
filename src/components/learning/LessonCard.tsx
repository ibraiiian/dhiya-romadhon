
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock } from "lucide-react";
import { Lesson } from "@/types/learning";
import LessonBadge from "./LessonBadge";

interface LessonCardProps {
  lesson: Lesson;
  onStartLesson: (lesson: Lesson) => void;
}

const LessonCard = ({ lesson, onStartLesson }: LessonCardProps) => {
  return (
    <Card key={lesson.id} className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{lesson.title}</CardTitle>
          {lesson.completed && (
            <CheckCircle className="h-5 w-5 text-green-500" />
          )}
        </div>
        <CardDescription>{lesson.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{lesson.duration}</span>
          </div>
          <div>
            <LessonBadge difficulty={lesson.difficulty} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          className="w-full rounded-full" 
          variant={lesson.completed ? "outline" : "default"}
          onClick={() => onStartLesson(lesson)}
        >
          {lesson.completed ? "Review Lesson" : "Start Lesson"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LessonCard;
