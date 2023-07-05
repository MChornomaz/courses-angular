export interface Course {
  id: number;
  name: string;
  date: Date;
  length: number;
  description: string;
  isTopRated: boolean;
  authors?: Author[];
}

export interface Author {
  id: string;
  name: string;
}
