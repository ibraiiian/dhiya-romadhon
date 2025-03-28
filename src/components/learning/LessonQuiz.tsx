
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuizQuestion } from "@/types/learning";
import { toast } from "@/components/ui/use-toast";
import { CheckCircle, XCircle } from "lucide-react";

interface LessonQuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

const LessonQuiz = ({ questions, onComplete }: LessonQuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) {
      toast({
        title: "Please select an answer",
        description: "You need to select an option before checking the answer.",
        variant: "destructive",
      });
      return;
    }

    setIsAnswered(true);
    setShowExplanation(true);

    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setShowExplanation(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
      const finalScore = score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0);
      onComplete(finalScore);
    }
  };

  const calculatePercentage = () => {
    return Math.round((score / questions.length) * 100);
  };

  if (quizCompleted) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-center">Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-6xl font-bold mb-4 text-primary">{calculatePercentage()}%</div>
          <p className="text-muted-foreground mb-2">
            You answered {score} out of {questions.length} questions correctly.
          </p>
          {calculatePercentage() >= 70 ? (
            <div className="flex items-center justify-center text-green-500 gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>You've passed the quiz!</span>
            </div>
          ) : (
            <div className="flex items-center justify-center text-destructive gap-2">
              <XCircle className="h-5 w-5" />
              <span>Review the lesson to improve your score.</span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Quiz: Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <p className="text-lg mb-4">{currentQuestion.question}</p>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedOption === index 
                  ? isAnswered 
                    ? index === currentQuestion.correctAnswer ? "outline" : "destructive" 
                    : "default"
                  : "outline"}
                className={`w-full justify-start text-left ${
                  isAnswered && index === currentQuestion.correctAnswer
                    ? "border-green-500 border-2"
                    : ""
                }`}
                onClick={() => handleSelectOption(index)}
                disabled={isAnswered}
              >
                <div className="flex items-center">
                  {isAnswered && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  )}
                  {isAnswered && selectedOption === index && index !== currentQuestion.correctAnswer && (
                    <XCircle className="h-4 w-4 mr-2 text-destructive" />
                  )}
                  <span>{option}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
        {showExplanation && (
          <div className="p-4 bg-muted rounded-md mt-4">
            <p className="font-medium mb-1">Explanation:</p>
            <p>{currentQuestion.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isAnswered ? (
          <Button onClick={handleCheckAnswer} disabled={selectedOption === null}>
            Check Answer
          </Button>
        ) : (
          <Button onClick={handleNextQuestion} className="ml-auto">
            {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default LessonQuiz;
