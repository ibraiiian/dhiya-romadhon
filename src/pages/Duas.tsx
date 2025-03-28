import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Volume, Heart, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Dua {
  id: number;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
  category: string;
}

const duaData: Dua[] = [
  {
    id: 1,
    title: "Dua for Breaking Fast (Iftar)",
    arabic: "اللَّهُمَّ إِنِّي لَكَ صُمْتُ، وَعَلَى رِزْقِكَ أَفْطَرْتُ",
    transliteration: "Allahumma inni laka sumtu, wa 'ala rizqika aftartu",
    translation: "O Allah, I fasted for You and I break my fast with Your provision.",
    reference: "Abu Dawud",
    category: "Ramadan",
  },
  {
    id: 2,
    title: "Dua for Laylatul Qadr",
    arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    transliteration: "Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'anni",
    translation: "O Allah, You are forgiving and love forgiveness, so forgive me.",
    reference: "Tirmidhi, Ibn Majah",
    category: "Ramadan",
  },
  {
    id: 3,
    title: "Dua Before Breaking Fast",
    arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
    transliteration: "Dhahabadh-dhama'u wabtallatil 'urooqu, wa thabatal-ajru insha-Allah",
    translation: "The thirst is gone, the veins are moistened, and the reward is confirmed, if Allah wills.",
    reference: "Abu Dawud",
    category: "Ramadan",
  },
  {
    id: 4,
    title: "Dua for Forgiveness",
    arabic: "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
    transliteration: "Rabbana zalamna anfusana wa in lam taghfir lana wa tarhamna lanakoonanna minal-khasireen",
    translation: "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.",
    reference: "Quran 7:23",
    category: "General",
  },
  {
    id: 5,
    title: "Dua for the First Night of Ramadan",
    arabic: "اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالْإِيمَانِ، وَالسَّلَامَةِ وَالْإِسْلَامِ، رَبِّي وَرَبُّكَ اللَّهُ",
    transliteration: "Allahumma ahillahu 'alayna bil-amni wal-iman, was-salamati wal-islam, rabbi wa rabbuka Allah",
    translation: "O Allah, let this moon appear on us with security and faith, with safety and Islam. My Lord and your Lord is Allah.",
    reference: "At-Tirmidhi",
    category: "Ramadan",
  },
  {
    id: 6,
    title: "Dua for Suhoor",
    arabic: "نَوَيْتُ صَوْمَ غَدٍ مِنْ شَهْرِ رَمَضَانَ الْمُبَارَكِ، فَرْضًا لَكَ يَا اللهُ فَتَقَبَّلْ مِنِّي",
    transliteration: "Nawaitu sawma ghadin min shahri Ramadanal-mubaraki, fardan laka ya Allah fataqqabal minni",
    translation: "I intend to observe a fast tomorrow in this blessed month of Ramadan, an obligatory act for You. O Allah, accept this from me.",
    reference: "Islamic Tradition",
    category: "Ramadan",
  },
  {
    id: 7,
    title: "Dua to Be Recited During Ramadan",
    arabic: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي شَهْرِنَا هَذَا أَنْ تُبَارِكَ لَنَا فِي رَمَضَانَ، وَأَنْ تُعِينَنَا عَلَى صِيَامِهِ وَقِيَامِهِ",
    transliteration: "Allahumma inna nas'aluka fi shahrina hadha an tubarikalana fi Ramadan, wa an tu'inana 'ala siyamihi wa qiyamihi",
    translation: "O Allah, we ask You in this month of ours to bless us in Ramadan, and to help us with its fasting and standing in prayer.",
    reference: "Islamic Tradition",
    category: "Ramadan",
  },
  {
    id: 8,
    title: "Dua When Opening Fast",
    arabic: "اللَّهُمَّ لَكَ صُمْنَا وَعَلَى رِزْقِكَ أَفْطَرْنَا فَتَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Allahumma laka sumna wa 'ala rizqika aftarna fataqabbal minna innaka antas-Sami'ul-'Alim",
    translation: "O Allah, for You we have fasted and with Your provision we have broken our fast, so accept this from us. Indeed, You are the All-Hearing, the All-Knowing.",
    reference: "Abu Dawud",
    category: "Ramadan",
  },
  {
    id: 9,
    title: "Dua for Last Ten Days of Ramadan",
    arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ كَرِيمٌ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    transliteration: "Allahumma innaka 'afuwwun karimun tuhibbul 'afwa fa'fu 'anni",
    translation: "O Allah, You are Pardoning, Generous, You love to pardon, so pardon me.",
    reference: "Ibn Majah",
    category: "Ramadan",
  },
  {
    id: 10,
    title: "Dua for Accepting Good Deeds",
    arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Rabbana taqabbal minna innaka antas-Sami'ul-'Alim",
    translation: "Our Lord, accept from us. Indeed, You are the All-Hearing, the All-Knowing.",
    reference: "Quran 2:127",
    category: "General",
  },
  {
    id: 11,
    title: "Dua for Protection During Ramadan",
    arabic: "اللَّهُمَّ سَلِّمْنِي لِرَمَضَانَ وَسَلِّمْ رَمَضَانَ لِي وَسَلِّمْهُ لِي مُتَقَبَّلًا",
    transliteration: "Allahumma sallimni li-Ramadan wa sallim Ramadan li wa sallimhu li mutaqabbala",
    translation: "O Allah, safeguard me for Ramadan, and safeguard Ramadan for me, and accept it from me.",
    reference: "Islamic Tradition",
    category: "Ramadan",
  },
  {
    id: 12,
    title: "Dua for Taqwa (God-Consciousness)",
    arabic: "اللَّهُمَّ آتِ نَفْسِي تَقْوَاهَا، وَزَكِّهَا أَنْتَ خَيْرُ مَنْ زَكَّاهَا، أَنْتَ وَلِيُّهَا وَمَوْلَاهَا",
    transliteration: "Allahumma ati nafsi taqwaha, wa zakkiha anta khayru man zakkaha, anta waliyyuha wa mawlaha",
    translation: "O Allah, grant my soul its piety and purify it, for You are the Best of those who purify it. You are its Guardian and Master.",
    reference: "Muslim",
    category: "General",
  }
];

const Duas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "Ramadan", "General", "Morning/Evening", "Protection"];

  const filteredDuas = duaData.filter((dua) => {
    const matchesSearch = dua.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          dua.translation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || dua.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-10">
          <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
            Duas Collection
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-2">
            Islamic Supplications
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            A collection of beautiful duas (supplications) to recite during Ramadan and beyond
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0 mb-6 md:mb-0">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1.5">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category === "all" ? "All Duas" : category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search duas..."
                    className="pl-8 rounded-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="rounded-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Save Dua
                </Button>
              </div>

              {filteredDuas.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No duas found matching your search.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredDuas.map((dua) => (
                    <Card key={dua.id} className="glass-card overflow-hidden transition-all hover:shadow-md">
                      <CardHeader className="border-b bg-muted/30">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{dua.title}</CardTitle>
                            <CardDescription>{dua.reference}</CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
                              <Volume className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <Tabs defaultValue="arabic" className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="arabic">Arabic</TabsTrigger>
                            <TabsTrigger value="transliteration">Transliteration</TabsTrigger>
                            <TabsTrigger value="translation">Translation</TabsTrigger>
                          </TabsList>
                          <TabsContent value="arabic" className="mt-4">
                            <p className="text-xl md:text-2xl font-arabic leading-relaxed text-right">
                              {dua.arabic}
                            </p>
                          </TabsContent>
                          <TabsContent value="transliteration" className="mt-4">
                            <p className="text-base italic">
                              {dua.transliteration}
                            </p>
                          </TabsContent>
                          <TabsContent value="translation" className="mt-4">
                            <p className="text-base">
                              {dua.translation}
                            </p>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Duas;
