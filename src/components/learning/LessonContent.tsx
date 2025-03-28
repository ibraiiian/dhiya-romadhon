
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LessonSection } from "@/types/learning";

interface LessonContentProps {
  section: LessonSection;
}

const LessonContent = ({ section }: LessonContentProps) => {
  const [expanded, setExpanded] = useState(true);

  // Pastikan section tidak undefined sebelum mengakses propertinya
  if (!section) {
    return null;
  }

  const formatContent = (content: string) => {
    // Replace markdown-style headers with styled HTML
    let formattedContent = content
      .replace(/#{3}\s(.+)/g, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      .replace(/#{2}\s(.+)/g, '<h2 class="text-xl font-semibold mt-6 mb-3">$1</h2>')
      .replace(/#{1}\s(.+)/g, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>');
    
    // Replace markdown-style bullet points with styled HTML
    formattedContent = formattedContent.replace(
      /^\*\s(.+)$/gm, 
      '<li class="ml-6 list-disc mb-2">$1</li>'
    );
    
    // Replace markdown-style numbered lists with styled HTML
    formattedContent = formattedContent.replace(
      /^\d+\.\s(.+)$/gm, 
      '<li class="ml-6 list-decimal mb-2">$1</li>'
    );
    
    // Replace double new lines with paragraph breaks
    formattedContent = formattedContent.split('\n\n').map(para => 
      para.startsWith('<li') || para.startsWith('<h') 
        ? para 
        : `<p class="mb-4">${para}</p>`
    ).join('');

    // Wrap lists in ul or ol tags
    formattedContent = formattedContent
      .replace(/(<li class="ml-6 list-disc mb-2">.*?<\/li>)+/gs, match => `<ul class="my-4">${match}</ul>`)
      .replace(/(<li class="ml-6 list-decimal mb-2">.*?<\/li>)+/gs, match => `<ol class="my-4">${match}</ol>`);
    
    return formattedContent;
  };

  const getSectionIcon = (type: string) => {
    switch(type) {
      case 'introduction':
        return '📝';
      case 'content':
        return '📚';
      case 'application':
        return '🔍';
      case 'reflection':
        return '💭';
      case 'summary':
        return '📋';
      default:
        return '📔';
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'introduction':
        return 'Introduction';
      case 'content':
        return 'Main Content';
      case 'application':
        return 'Practical Application';
      case 'reflection':
        return 'Reflection';
      case 'summary':
        return 'Summary';
      default:
        return 'Content';
    }
  };

  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader 
        className="py-4 cursor-pointer hover:bg-muted/50 transition-colors" 
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{getSectionIcon(section.type)}</span>
            <CardTitle className="text-lg">{section.title}</CardTitle>
          </div>
          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
            {getTypeLabel(section.type)}
          </span>
        </div>
      </CardHeader>
      
      {expanded && (
        <CardContent className="prose max-w-none">
          <div 
            className="whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: formatContent(section.content) }}
          />
        </CardContent>
      )}
    </Card>
  );
};

export default LessonContent;
