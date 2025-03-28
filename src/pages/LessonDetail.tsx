
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowLeft, Clock, Award, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { Lesson, LessonSection, QuizQuestion } from "@/types/learning";
import LessonContent from "@/components/learning/LessonContent";
import LessonQuiz from "@/components/learning/LessonQuiz";

// Enhanced lesson content
const generateDetailedSections = (lessonId: number, title: string): LessonSection[] => {
  const sections: LessonSection[] = [];
  
  // Generate different content based on the lesson title
  if (title.includes("Night of Power") || title.includes("Laylatul Qadr")) {
    sections.push(
      {
        id: 1,
        title: "Understanding Laylatul Qadr",
        type: "introduction",
        content: `# The Night of Power (Laylatul Qadr)

Laylatul Qadr, often translated as "The Night of Power" or "The Night of Decree," is one of the most significant nights in the Islamic calendar. It is believed to be the night when the first verses of the Quran were revealed to Prophet Muhammad (peace be upon him) through the angel Jibreel (Gabriel).

This night falls within the last ten days of Ramadan, although the exact date is not specified. Many scholars believe it is most likely to occur on one of the odd-numbered nights of the last ten days (the 21st, 23rd, 25th, 27th, or 29th night).

## Significance in Islamic Tradition

The Quran explicitly mentions the extraordinary status of this night in Surah Al-Qadr (Chapter 97):

"Indeed, We sent the Quran down during the Night of Decree. And what can make you know what is the Night of Decree? The Night of Decree is better than a thousand months. The angels and the Spirit descend therein by permission of their Lord for every matter. Peace it is until the emergence of dawn." (Quran 97:1-5)

This passage highlights several key aspects of Laylatul Qadr:

1. It was the night when the Quran was revealed
2. It is better than a thousand months (equivalent to over 83 years)
3. Angels descend to earth in abundance
4. It is characterized by peace until dawn`
      },
      {
        id: 2,
        title: "Historical Context and Revelation",
        type: "content",
        content: `## Historical Context of Laylatul Qadr

The revelation of the Quran began during Laylatul Qadr in the month of Ramadan when Prophet Muhammad (peace be upon him) was meditating in the Cave of Hira near Mecca. The angel Jibreel appeared to him and commanded him to "Read!" This moment marked the beginning of Muhammad's prophethood and the gradual revelation of the Quran over approximately 23 years.

### The First Revelation

The first verses revealed were from Surah Al-Alaq (Chapter 96):

"Read in the name of your Lord who created - Created man from a clinging substance. Read, and your Lord is the most Generous - Who taught by the pen - Taught man that which he knew not." (Quran 96:1-5)

This initial revelation on Laylatul Qadr set in motion the transmission of divine guidance that would transform not only the Arabian Peninsula but eventually a significant portion of the world.

## Why is the Date Unspecified?

There is wisdom in the exact date of Laylatul Qadr not being specified. This encourages Muslims to maximize their worship throughout the last ten days of Ramadan, especially on the odd nights. It promotes spiritual vigilance and prevents worship from being concentrated on a single night.

The Prophet Muhammad (peace be upon him) said: "Search for Laylatul Qadr in the odd nights of the last ten days of Ramadan." (Bukhari)

Some scholars note that the 27th night has particularly strong evidence supporting it as Laylatul Qadr, though one should not limit their extra worship to only this night.`
      },
      {
        id: 3,
        title: "Spiritual Dimensions and Blessings",
        type: "content",
        content: `## The Spiritual Dimensions of Laylatul Qadr

Laylatul Qadr represents a time when the veil between the divine and earthly realms is believed to be at its thinnest. The Quran states that on this night, angels and the Spirit (referring to angel Jibreel) descend to earth "for every matter."

### Spiritual Atmosphere

Several hadith describe the unique atmosphere of this blessed night:

* The Prophet (peace be upon him) said: "Verily, this night (Laylatul Qadr) is the 27th night of Ramadan. The angels on this night are on earth more numerous than the number of pebbles." (Ahmad)

* He also described it saying: "Laylatul Qadr is calm and pleasant, neither hot nor cold, and the sun rises on its morning white and without rays." (Muslim, Abu Dawud)

This indicates that there may be physical signs that accompany this blessed night, although they might not be noticeable to everyone.

## Multiplication of Rewards

One of the most extraordinary aspects of Laylatul Qadr is the immense multiplication of rewards. The Quran states that this night is "better than a thousand months." This means that worship performed on this single night is rewarded as if the person had worshipped continuously for over 83 years.

This represents an incredible opportunity for Muslims to earn tremendous spiritual rewards in a very short time. A person who might not live for 83 years can still earn the reward of worship spanning that duration through sincere devotion on this night.

### Types of Blessings

The blessings of Laylatul Qadr include:

1. Forgiveness of sins
2. Acceptance of supplications
3. Elevation in spiritual rank
4. Decree of one's affairs for the coming year
5. Special divine mercy and grace

These blessings are emphasized in numerous hadith and by scholars throughout Islamic history.`
      },
      {
        id: 4,
        title: "Recommended Acts of Worship",
        type: "application",
        content: `## Recommended Acts of Worship

Given the tremendous importance of Laylatul Qadr, Muslims are encouraged to engage in various forms of worship to maximize this opportunity. The Prophet Muhammad (peace be upon him) would increase his worship during the last ten days of Ramadan, staying awake at night and awakening his family for prayer.

### Specific Recommended Acts

1. **Qiyam (Night Prayer)**: Praying during the night, particularly the Tahajjud prayer.

2. **Recitation of Quran**: Engaging with the very book that began its revelation on this night.

3. **Dhikr (Remembrance of Allah)**: Particularly the repetition of declarations of God's glory and unique nature.

4. **Dua (Supplication)**: Especially the dua taught by the Prophet to Aisha (may Allah be pleased with her): "O Allah, You are the One Who pardons, and You love to pardon, so pardon me." (Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'anni)

5. **I'tikaf (Spiritual Retreat)**: Many devout Muslims spend the last ten days of Ramadan in the mosque, dedicating themselves entirely to worship.

6. **Charity**: Giving to the needy is especially encouraged during this blessed time.

7. **Seeking Forgiveness**: Engaging in sincere repentance and asking Allah for forgiveness of sins.

### Practical Tips for Worship

* Prepare a schedule for the last ten nights, particularly the odd-numbered ones
* Rest during the day if possible to have energy for night worship
* Make a list of people to pray for and specific supplications you wish to make
* Have a copy of the Quran and any dua books ready
* Set realistic goals that you can maintain without exhaustion
* Create a peaceful environment conducive to worship and reflection`
      },
      {
        id: 5,
        title: "Contemporary Observance and Impact",
        type: "reflection",
        content: `## Contemporary Observance

In the modern world, Muslims observe Laylatul Qadr in various ways, often adapting to contemporary lifestyles while maintaining the essence of the traditional practices.

### Community Observance

In many Muslim-majority countries and in Muslim communities worldwide:

* Mosques are filled to capacity on the odd nights of the last ten days of Ramadan
* Special prayers called Tarawih are extended on these nights
* Religious talks and lectures focus on the significance of the night
* Community iftars (breaking of the fast) are organized, followed by collective worship
* Charity drives reach their peak as people seek to maximize their good deeds

### Challenges of Modern Observance

Modern Muslims face certain challenges in observing Laylatul Qadr:

* Work and school commitments that may limit the ability to stay up for worship
* Distractions of technology and social media
* Physical fatigue after a month of fasting
* In non-Muslim countries, lack of community support or accommodation for religious practices

Despite these challenges, many Muslims find creative ways to honor this night, such as taking vacation days, adjusting sleep schedules, or organizing community support systems.

## Spiritual and Social Impact

The observance of Laylatul Qadr has profound effects on both individual spirituality and community cohesion:

### Individual Impact

* Spiritual renewal and recommitment to faith
* Opportunity for major life changes and repentance
* Development of discipline through extended worship
* Cultivation of hope and optimism through seeking divine favor

### Community Impact

* Strengthening of community bonds through collective worship
* Increased charitable giving that benefits the less fortunate
* Intergenerational transmission of religious knowledge and practices
* Revival of Islamic traditions and cultural practices

The night serves as a powerful reminder of the Quranic revelation that continues to guide over 1.8 billion Muslims worldwide.`
      },
      {
        id: 6,
        title: "Summary and Reflection",
        type: "summary",
        content: `## Key Takeaways about Laylatul Qadr

As we conclude our study of Laylatul Qadr, let's recall the essential points:

1. **Divine Revelation**: Laylatul Qadr marks the beginning of the Quran's revelation, serving as a pivotal moment in Islamic history.

2. **Extraordinary Value**: This single night carries spiritual weight greater than a thousand months of worship.

3. **Divine Decree**: It is called the "Night of Decree" because Allah decrees what will happen in the coming year.

4. **Abundant Blessings**: Angels descend in great numbers, bringing peace, mercy, and blessings until dawn.

5. **Opportunity for Transformation**: It offers a unique opportunity for forgiveness, acceptance of supplications, and spiritual elevation.

## Personal Reflection Questions

Take some time to reflect on these questions:

1. How can the concept of Laylatul Qadr - a single night worth more than 83 years - change your perspective on the value of time?

2. What personal supplications are most important for you to make during this blessed night?

3. How might you prepare better for next Ramadan's last ten nights to maximize your worship?

4. What spiritual lessons can you apply throughout the year from the concept of Laylatul Qadr?

5. How does the revelation of the Quran on this night emphasize the importance of seeking knowledge and guidance?

## Conclusion

Laylatul Qadr represents one of Islam's most profound spiritual opportunities - a night when divine grace is at its peak and when sincere worship can transform a person's spiritual destiny. By understanding its significance, preparing adequately, and approaching it with sincerity and hope, Muslims can experience a night that truly is "better than a thousand months."`
      }
    );
  } else {
    // Default sections for other lessons
    sections.push(
      {
        id: 1,
        title: "Introduction",
        type: "introduction",
        content: "This section introduces the key concepts and foundations of the topic. Understanding these basics will help you grasp the more complex ideas presented later in the lesson."
      },
      {
        id: 2,
        title: "Main Concepts",
        type: "content",
        content: "Here we explore the core principles and teachings related to this subject. These concepts are essential to understanding the spiritual and practical aspects of Ramadan observance."
      },
      {
        id: 3,
        title: "Practical Application",
        type: "application",
        content: "This section focuses on how to apply the knowledge in your daily life during Ramadan. It provides practical steps and guidance for implementing what you've learned."
      },
      {
        id: 4,
        title: "Reflection Questions",
        type: "reflection",
        content: "Take some time to reflect on these questions:\n\n1. How does this lesson apply to your personal spiritual journey?\n\n2. What specific actions can you take to implement these teachings?\n\n3. How might this knowledge deepen your Ramadan experience?"
      },
      {
        id: 5,
        title: "Summary",
        type: "summary",
        content: "This lesson covered the important aspects of the topic including the historical context, spiritual significance, and practical implementation. Remember to practice these teachings throughout Ramadan."
      }
    );
  }
  
  return sections;
};

// Generate quiz questions based on the lesson
const generateQuizQuestions = (lessonId: number, title: string): QuizQuestion[] => {
  const questions: QuizQuestion[] = [];
  
  if (title.includes("Night of Power") || title.includes("Laylatul Qadr")) {
    questions.push(
      {
        id: 1,
        question: "When was the Quran first revealed to Prophet Muhammad (peace be upon him)?",
        options: [
          "During the month of Rajab", 
          "During Laylatul Qadr in Ramadan", 
          "On the first day of Ramadan", 
          "During the Hajj pilgrimage"
        ],
        correctAnswer: 1,
        explanation: "The Quran was first revealed to Prophet Muhammad (peace be upon him) during Laylatul Qadr (the Night of Power) in the month of Ramadan, as mentioned in Surah Al-Qadr in the Quran."
      },
      {
        id: 2,
        question: "According to the Quran, Laylatul Qadr is better than how many months?",
        options: ["100 months", "500 months", "1000 months", "10,000 months"],
        correctAnswer: 2,
        explanation: "Surah Al-Qadr (Chapter 97) in the Quran states that 'The Night of Decree is better than a thousand months.' This equals over 83 years of worship."
      },
      {
        id: 3,
        question: "Which of the following is NOT a characteristic of Laylatul Qadr according to Islamic traditions?",
        options: [
          "Angels descend in abundance", 
          "It is filled with peace until dawn", 
          "It is marked by thunderstorms and strong winds", 
          "It occurs during the last ten days of Ramadan"
        ],
        correctAnswer: 2,
        explanation: "According to hadith, Laylatul Qadr is described as a calm and pleasant night, neither hot nor cold. Thunderstorms and strong winds are not characteristic of this night according to traditional descriptions."
      },
      {
        id: 4,
        question: "What was revealed first to Prophet Muhammad (peace be upon him)?",
        options: [
          "Surah Al-Fatiha (Chapter 1)", 
          "Surah Al-Baqarah (Chapter 2)", 
          "Verses from Surah Al-Alaq (Chapter 96)", 
          "The entire Quran at once"
        ],
        correctAnswer: 2,
        explanation: "The first revelation consisted of the first five verses of Surah Al-Alaq (Chapter 96), which begin with 'Read in the name of your Lord who created...'"
      },
      {
        id: 5,
        question: "Which dua (supplication) did the Prophet Muhammad (peace be upon him) recommend to Aisha (may Allah be pleased with her) for Laylatul Qadr?",
        options: [
          "A prayer seeking wealth and prosperity", 
          "A prayer for health and well-being", 
          "A prayer for forgiveness: 'O Allah, You are the One Who pardons, and You love to pardon, so pardon me'", 
          "A prayer for protection from evil"
        ],
        correctAnswer: 2,
        explanation: "The Prophet Muhammad (peace be upon him) taught Aisha to say: 'Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'anni' which means 'O Allah, You are the One Who pardons, and You love to pardon, so pardon me.'"
      }
    );
  } else {
    // Default quiz for other lessons
    questions.push(
      {
        id: 1,
        question: "What is the primary benefit of studying this topic?",
        options: [
          "Cultural awareness", 
          "Academic knowledge", 
          "Spiritual growth", 
          "Social status"
        ],
        correctAnswer: 2,
        explanation: "While all options have some merit, the primary benefit of studying Islamic topics like this is spiritual growth and connection with faith."
      },
      {
        id: 2,
        question: "How should this knowledge be applied in daily life?",
        options: [
          "Only during Ramadan", 
          "Through consistent, year-round practice", 
          "Only when convenient", 
          "Only in theory, not practice"
        ],
        correctAnswer: 1,
        explanation: "The teachings from this lesson should be applied consistently throughout the year, not just during Ramadan or when convenient."
      },
      {
        id: 3,
        question: "What is an essential component of effective learning in Islamic studies?",
        options: [
          "Memorization without understanding", 
          "Reflection and contemplation", 
          "Studying only from one source", 
          "Learning without application"
        ],
        correctAnswer: 1,
        explanation: "Reflection and contemplation (tadabbur) are essential components of effective learning in Islamic studies. The Quran itself encourages people to reflect on its verses."
      }
    );
  }
  
  return questions;
};

const LessonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [sections, setSections] = useState<LessonSection[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        
        // Try to get the lesson from location state first
        if (location.state?.lesson) {
          setLesson(location.state.lesson);
          setCompleted(location.state.lesson.completed);
        } else if (id) {
          // If not available in state, fetch from Supabase
          const { data, error } = await supabase
            .from('learning_resources')
            .select('*')
            .eq('id', parseInt(id))
            .single();
          
          if (error) {
            throw error;
          }
          
          if (data) {
            const validateDifficulty = (difficulty: string): "Beginner" | "Intermediate" | "Advanced" => {
              if (difficulty === "Beginner" || difficulty === "Intermediate" || difficulty === "Advanced") {
                return difficulty;
              }
              return "Beginner";
            };

            setLesson({
              id: data.id,
              title: data.title,
              description: data.description,
              duration: data.duration,
              difficulty: validateDifficulty(data.difficulty),
              completed: Boolean(data.completed),
              category: data.category,
              created_at: data.created_at
            });
            setCompleted(Boolean(data.completed));
          }
        }
      } catch (error) {
        console.error('Error fetching lesson:', error);
        toast({
          title: "Error",
          description: "Failed to load lesson. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id, location.state]);

  useEffect(() => {
    if (lesson) {
      // Generate detailed sections for the lesson
      const generatedSections = generateDetailedSections(lesson.id, lesson.title);
      setSections(generatedSections);
      setQuizQuestions(generateQuizQuestions(lesson.id, lesson.title));
      
      // Ensure currentSection is valid
      if (generatedSections.length > 0 && currentSection >= generatedSections.length) {
        setCurrentSection(0);
      }
    }
  }, [lesson]);

  const handleNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo(0, 0);
    } else if (!showQuiz) {
      setShowQuiz(true);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevSection = () => {
    if (showQuiz) {
      setShowQuiz(false);
      setCurrentSection(sections.length - 1);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
    window.scrollTo(0, 0);
  };

  const handleQuizComplete = async (score: number) => {
    if (!lesson) return;
    setQuizScore(score);
    setQuizCompleted(true);
    
    const passedQuiz = score / quizQuestions.length >= 0.7; // 70% to pass
    
    if (passedQuiz) {
      try {
        const { error } = await supabase
          .from('learning_resources')
          .update({ completed: true })
          .eq('id', lesson.id);
        
        if (error) {
          throw error;
        }
        
        setCompleted(true);
        
        toast({
          title: "Lesson Completed!",
          description: "Great job! You've completed this lesson and passed the quiz.",
        });
      } catch (error) {
        console.error('Error marking lesson as completed:', error);
        toast({
          title: "Error",
          description: "Failed to mark lesson as completed. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Quiz Score",
        description: "You've completed the quiz but need to score at least 70% to mark the lesson as completed.",
      });
    }
  };

  const goBackToHub = () => {
    navigate('/learning-hub');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted-foreground/20 rounded w-3/4"></div>
            <div className="h-4 bg-muted-foreground/20 rounded w-full"></div>
            <div className="h-64 bg-muted-foreground/20 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl font-serif font-bold mb-4">Lesson Not Found</h1>
          <p className="text-muted-foreground mb-6">The lesson you're looking for could not be found.</p>
          <Button onClick={goBackToHub}>Return to Learning Hub</Button>
        </div>
      </div>
    );
  }

  const progressPercentage = !showQuiz 
    ? ((currentSection + 1) / (sections.length + 1)) * 100 
    : quizCompleted ? 100 : 95;

  // Ensure sections and currentSection are valid before rendering
  const currentSectionData = sections.length > 0 && currentSection < sections.length 
    ? sections[currentSection] 
    : null;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <Button 
          variant="ghost" 
          className="mb-6 pl-0" 
          onClick={goBackToHub}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Learning Hub
        </Button>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="md:w-2/3">
            <div className="mb-2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {lesson.category}
                </span>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {lesson.duration}
                </div>
              </div>
              {completed && (
                <div className="flex items-center text-green-500">
                  <CheckCircle className="h-5 w-5 mr-1" />
                  <span>Completed</span>
                </div>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-3">
              {lesson.title}
            </h1>
            <p className="text-muted-foreground mb-6">
              {lesson.description}
            </p>
          </div>
          
          <div className="md:w-1/3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Your Progress</CardTitle>
                <CardDescription>
                  {!showQuiz 
                    ? `Section ${currentSection + 1} of ${sections.length}` 
                    : quizCompleted ? "Quiz Completed" : "Quiz Section"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-0">
                <Progress value={progressPercentage} className="h-2 mb-4" />
                <div className="grid grid-cols-1 gap-1">
                  {sections.map((section, index) => (
                    <Button 
                      key={section.id}
                      variant={!showQuiz && currentSection === index ? "default" : "ghost"} 
                      className="justify-start h-auto py-2"
                      onClick={() => {
                        setCurrentSection(index);
                        setShowQuiz(false);
                      }}
                    >
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-muted-foreground/10 mr-2">
                        {index + 1}
                      </span>
                      {section.title}
                    </Button>
                  ))}
                  <Button 
                    variant={showQuiz ? "default" : "ghost"} 
                    className="justify-start h-auto py-2"
                    onClick={() => setShowQuiz(true)}
                  >
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-muted-foreground/10 mr-2">
                      {sections.length + 1}
                    </span>
                    Quiz
                  </Button>
                </div>
              </CardContent>
              {completed && (
                <CardFooter className="pt-4">
                  <div className="flex items-center justify-center w-full text-green-500 gap-2">
                    <Award className="h-5 w-5" />
                    <span>Lesson Completed</span>
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>

        {!showQuiz ? (
          currentSectionData ? (
            <LessonContent section={currentSectionData} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No content available for this section.</p>
            </div>
          )
        ) : (
          <LessonQuiz 
            questions={quizQuestions} 
            onComplete={handleQuizComplete}
          />
        )}

        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevSection}
            disabled={currentSection === 0 && !showQuiz}
          >
            Previous Section
          </Button>
          
          {!showQuiz && currentSection < sections.length - 1 ? (
            <Button onClick={handleNextSection}>
              Next Section
            </Button>
          ) : !showQuiz ? (
            <Button onClick={handleNextSection} className="bg-primary-600 hover:bg-primary-700">
              <BookOpen className="mr-2 h-4 w-4" />
              Take Quiz
            </Button>
          ) : quizCompleted ? (
            <Button 
              disabled={!completed} 
              onClick={goBackToHub}
              className="bg-green-600 hover:bg-green-700"
            >
              <Award className="mr-2 h-4 w-4" />
              {completed ? "Return to Learning Hub" : "Quiz Completed"}
            </Button>
          ) : (
            <Button 
              disabled={true} 
              className="bg-primary-600 opacity-50"
            >
              Complete Quiz
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;
