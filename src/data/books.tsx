import Book from "../interfaces/book";

const books: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop",
    isbn: "9780743273565",
    description: "The Great Gatsby description",
    rating: 4,
    pages: 180,
    publishedDate: "1925-04",
    dateAdded: "2024-06-15",
    lastRead: "2024-06-28",
    isCurrentlyReading: true,
    progress: 65,
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop",
    isbn: "9780061120084",
    description: "To Kill a Mockingbird description",
    rating: 5,
    pages: 384,
    publishedDate: "1960-07",
    dateAdded: "2024-06-01",
    lastRead: "2024-06-20",
    isCurrentlyReading: false,
    progress: 100,
  },
];

export default books;