
import HeroSection from "@/components/home/HeroSection";
import DailyReflection from "@/components/home/DailyReflection";
import PrayerTimes from "@/components/home/PrayerTimes";
import CountdownTimer from "@/components/home/CountdownTimer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Heart, Calendar, BookMarked } from "lucide-react";

const features = [
  {
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    title: "Daily Reflections",
    description: "Access daily Quranic verses, hadiths, and inspiring quotes throughout Ramadan.",
    link: "/reflections"
  },
  {
    icon: <Calendar className="h-6 w-6 text-primary" />,
    title: "Prayer Times",
    description: "Stay connected with accurate prayer times based on your location.",
    link: "/prayer-times"
  },
  {
    icon: <Heart className="h-6 w-6 text-primary" />,
    title: "Worship Tracking",
    description: "Track your prayers, fasting, Quran recitation, and more with our dashboard.",
    link: "/worship-tracking"
  },
  {
    icon: <BookMarked className="h-6 w-6 text-primary" />,
    title: "Learning Resources",
    description: "Enhance your knowledge with our collection of Ramadan-related educational content.",
    link: "/learning-hub"
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <DailyReflection />

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-10 md:mb-16">
            <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
              Enhance Your Ramadan Experience
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl">
              Discover tools and resources designed to deepen your spiritual journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link to={feature.link} key={index} className="block">
                <Card 
                  className="border bg-card transition-all hover:shadow-md hover:border-primary/20 hover:translate-y-[-2px]"
                >
                  <CardHeader className="pb-2">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/login">
              <Button size="lg" className="rounded-full">Get Started</Button>
            </Link>
          </div>
        </div>
      </section>

      <PrayerTimes />
      <CountdownTimer />

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl overflow-hidden border shadow-lg">
            <div className="p-8 md:p-12">
              <div className="flex flex-col justify-center text-center max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-4">
                  Start Your Ramadan Journey Today
                </h2>
                <p className="text-muted-foreground mb-6 md:mb-8">
                  Create your personal Dhiya' Ramadhan account to access all features,
                  track your worship activities, and make the most of this blessed month.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/login">
                    <Button size="lg" className="rounded-full">Sign Up Now</Button>
                  </Link>
                  <Link to="/learning-hub">
                    <Button size="lg" variant="outline" className="rounded-full">Explore Resources</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
