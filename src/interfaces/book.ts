export default interface Book {
    id?: number;
    title: string;
    authors: string[];
    dateAdded: Date;
    lastRead?: Date;
    publisher: string;
    publishedDate: Date;
    description: string;
    industryIdentifiers: {
        type: "ISBN_10" | "ISBN_13";
        identifier: string;
    }[],
    pageCount: number;
    progress: number;
    categories: string[];
    imageLinks: { 
        smallThumbnail: string; 
        thumbnail: string 
    };
    isCurrentlyReading: boolean;
    language: string;
}
