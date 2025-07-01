export default interface Book {
    id: number;
    title: string;
    author: string;
    cover: string;
    isbn: string;
    description: string;
    rating: number;
    pages: number;
    publishedDate: string;
    dateAdded: string;
    lastRead: string;
    isCurrentlyReading: boolean;
    progress: number;
}
