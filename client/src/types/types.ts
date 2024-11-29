export interface Blog {
  id: number;
  author: Author;
  comments: Comment[];
  title: string;
  timestamp: string;
  content: string;
}

export interface Comment {
  id: number;
  author: Author;
  content: string;
  timestamp: string;
}

export interface Author {
  id: number;
  username: string;
}
