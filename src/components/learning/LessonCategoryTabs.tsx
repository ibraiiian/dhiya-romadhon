
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lesson } from "@/types/learning";
import LessonCard from "./LessonCard";

interface LessonCategoryTabsProps {
  categories: string[];
  lessons: Lesson[];
  onStartLesson: (lesson: Lesson) => void;
}

const LessonCategoryTabs = ({ categories, lessons, onStartLesson }: LessonCategoryTabsProps) => {
  return (
    <Tabs defaultValue="All Lessons" className="space-y-6">
      <TabsList className="flex flex-wrap h-auto p-1 rounded-lg">
        {categories.map((category) => (
          <TabsTrigger key={category} value={category} className="py-2">
            {category}
          </TabsTrigger>
        ))}
      </TabsList>

      {categories.map((category) => (
        <TabsContent key={category} value={category} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lessons
              .filter(lesson => 
                category === "All Lessons" ? true : lesson.category === category
              )
              .map((lesson) => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  onStartLesson={onStartLesson} 
                />
              ))}
          </div>
          
          {lessons.filter(lesson => 
            category === "All Lessons" ? true : lesson.category === category
          ).length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No lessons available in this category yet.</p>
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default LessonCategoryTabs;
