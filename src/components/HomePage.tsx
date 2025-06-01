import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BookCard from './BookCard';
import OrderDialog from './OrderDialog';
import { booksData, Subject } from '@/data/booksData';
import { ShoppingCart, Book } from 'lucide-react';

const HomePage: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>(booksData);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);

  const handleAuthorToggle = (subjectName: string, authorId: string) => {
    setSubjects(prev => prev.map(subject => {
      if (subject.name === subjectName) {
        return {
          ...subject,
          authors: subject.authors.map(author => 
            author.id === authorId 
              ? { ...author, selected: !author.selected }
              : author
          )
        };
      }
      return subject;
    }));
  };

  const getSelectedBooks = () => {
    const selected: string[] = [];
    subjects.forEach(subject => {
      subject.authors.forEach(author => {
        if (author.selected) {
          selected.push(`${subject.name} - ${author.name}`);
        }
      });
    });
    return selected;
  };

  const selectedCount = getSelectedBooks().length;

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b-2 border-cyan-500 shadow-lg shadow-cyan-500/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Book className="w-8 h-8 text-cyan-400" />
              <h1 className="text-3xl font-bold text-cyan-400 tracking-wider">
                BOOK<span className="text-white">STORE</span>
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {selectedCount > 0 && (
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500 px-3 py-1">
                  {selectedCount} Selected
                </Badge>
              )}
              <Button
                onClick={() => setOrderDialogOpen(true)}
                disabled={selectedCount === 0}
                className="bg-cyan-600 hover:bg-cyan-500 text-black font-bold px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Order Now
              </Button>
            </div>
          </div>
          <p className="text-gray-400 mt-2 text-center">
            Select books for Class 11 & 12 Bangladeshi College Students (All Updated Editions)
          </p>
        </div>
      </div>

      {/* Books Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <BookCard
              key={subject.id}
              subject={subject.name}
              authors={subject.authors}
              onAuthorToggle={handleAuthorToggle}
            />
            
          ))}
        </div>
      </div>

      <OrderDialog
        open={orderDialogOpen}
        onOpenChange={setOrderDialogOpen}
        selectedBooks={getSelectedBooks()}
      />
    </div>
  );
};

export default HomePage;