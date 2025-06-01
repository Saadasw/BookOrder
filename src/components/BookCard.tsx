import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

interface Author {
  id: string;
  name: string;
  selected: boolean;
}

interface BookCardProps {
  subject: string;
  authors: Author[];
  onAuthorToggle: (subjectId: string, authorId: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ subject, authors, onAuthorToggle }) => {
  return (
    <Card className="bg-gray-900 border-cyan-500 border-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-cyan-400 text-lg font-bold flex items-center gap-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          {subject}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {authors.map((author) => (
          <div key={author.id} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors">
            <Checkbox
              id={author.id}
              checked={author.selected}
              onCheckedChange={() => onAuthorToggle(subject, author.id)}
              className="border-cyan-400 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
            />
            <label htmlFor={author.id} className="text-gray-300 cursor-pointer flex-1 hover:text-cyan-300 transition-colors">
              {author.name}
            </label>
            {author.selected && (
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500">
                Selected
              </Badge>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default BookCard;