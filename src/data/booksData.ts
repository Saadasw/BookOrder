export interface Author {
  id: string;
  name: string;
  selected: boolean;
}

export interface Subject {
  id: string;
  name: string;
  authors: Author[];
}

export const booksData: Subject[] = [
  {
    id: 'physics1',
    name: 'Physics First Paper',
    authors: [
      { id: 'p1a1', name: 'Dr. Shahjahan Tapan', selected: false },
      { id: 'p1a2', name: 'Hajari & Nag', selected: false },
      { id: 'p1a3', name: 'Dr. Mohammad Ali', selected: false }, 
      { id: 'p1a4', name: 'Dr. Mohammad Ali', selected: false }
    ]
  },
  {
    id: 'physics2',
    name: 'Physics Second Paper',
    authors: [
      { id: 'p2a1', name: 'Dr. Shahjahan Tapan', selected: false },
      { id: 'p2a2', name: 'Hajari & Nag', selected: false },
      { id: 'p2a3', name: 'Dr. Mohammad Ali', selected: false }
    ]
  },
  {
    id: 'biology1',
    name: 'Biology First Paper',
    authors: [
      { id: 'b1a1', name: 'Dr. Gazi Azmal', selected: false },
      { id: 'b1a2', name: 'Dr. Mahbubur Rahman', selected: false },
      { id: 'b1a3', name: 'Touhidul Alam', selected: false }
    ]
  },
  {
    id: 'biology2',
    name: 'Biology Second Paper',
    authors: [
      { id: 'b2a1', name: 'Dr. Gazi Azmal', selected: false },
      { id: 'b2a2', name: 'Dr. Mahbubur Rahman', selected: false },
      { id: 'b2a3', name: 'Touhidul Alam', selected: false }
    ]
  },
  {
    id: 'math1',
    name: 'Math First Paper',
    authors: [
      { id: 'm1a1', name: 'Dr. Ketab Uddin', selected: false },
      { id: 'm1a2', name: 'S.U Ahmed', selected: false },
      { id: 'm1a3', name: 'Dr. Sarwar Jahan', selected: false }
    ]
  },
  {
    id: 'math2',
    name: 'Math Second Paper',
    authors: [
      { id: 'm2a1', name: 'Dr. Ketab Uddin', selected: false },
      { id: 'm2a2', name: 'S.U Ahmed', selected: false },
      { id: 'm2a3', name: 'Dr. Sarwar Jahan', selected: false }
    ]
  },
  {
    id: 'chemistry1',
    name: 'Chemistry First Paper',
    authors: [
      { id: 'c1a1', name: 'Dr. Hajari', selected: false },
      { id: 'c1a2', name: 'Pradip Kumar Das', selected: false },
      { id: 'c1a3', name: 'Dr. Saifur Rahman', selected: false }
    ]
  },
  {
    id: 'chemistry2',
    name: 'Chemistry Second Paper',
    authors: [
      { id: 'c2a1', name: 'Dr. Hajari', selected: false },
      { id: 'c2a2', name: 'Pradip Kumar Das', selected: false },
      { id: 'c2a3', name: 'Dr. Saifur Rahman', selected: false }
    ]
  },
  {
    id: 'accounting',
    name: 'Accounting',
    authors: [
      { id: 'aa1', name: 'Dr. Abdul Halim', selected: false },
      { id: 'aa2', name: 'Mian Ahmed Ali', selected: false },
      { id: 'aa3', name: 'Prof. Hanif', selected: false }
    ]
  },
  {
    id: 'economics',
    name: 'Economics',
    authors: [
      { id: 'ea1', name: 'Dr. Akhtaruzzaman', selected: false },
      { id: 'ea2', name: 'Prof. Nurul Islam', selected: false },
      { id: 'ea3', name: 'Dr. Bazlul Haque', selected: false }
    ]
  },
  {
    id: 'finance',
    name: 'Finance',
    authors: [
      { id: 'fa1', name: 'Dr. Khan Sarwar Murshid', selected: false },
      { id: 'fa2', name: 'Prof. Abdul Awwal', selected: false },
      { id: 'fa3', name: 'Dr. Shamsul Alam', selected: false }
    ]
  },
    {
    id: 'finance',
    name: 'Finance',
    authors: [
      { id: 'fa1', name: 'Dr. Khan Sarwar Murshid', selected: false },
      { id: 'fa2', name: 'Prof. Abdul Awwal', selected: false },
      { id: 'fa3', name: 'Dr. Shamsul Alam', selected: false }
    ]
  }
];