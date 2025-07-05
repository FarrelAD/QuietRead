export default interface Book {
    id?: number;
    title: string;
    authors: string[];
    publisher: string;
    publisedDate: Date;
    description: string;
    industryIdentifiers: {
        type: "ISBN_10" | "ISBN_13";
        identifier: string;
    }[],
    pageCount: number;
    categories: string[];
    imageLinks: { 
        smallThumbnail: string; 
        thumbnail: string 
    };
    language: string;
}
