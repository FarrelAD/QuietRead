export type BookJSON = {
    id?: number;
    title: string;
    authors: string[];
    dateAdded: string;
    lastRead?: string;
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: {
        type: "ISBN_10" | "ISBN_13";
        identifier: string;
    }[];
    pageCount: number;
    progress: number;
    categories: string[];
    imageLinks: {
        smallThumbnail: string | null;
        thumbnail: string | null;
    };
    isCurrentlyReading: boolean;
    language: string;
};

export type BookType =
    & Omit<BookJSON, "dateAdded" | "lastRead" | "publishedDate">
    & {
        dateAdded: Date;
        lastRead?: Date;
        publishedDate: Date;
    };

export class Book implements BookType {
    id?: number;
    title!: string;
    authors!: string[];
    dateAdded!: Date;
    lastRead?: Date;
    publisher!: string;
    publishedDate!: Date;
    description!: string;
    industryIdentifiers!: {
        type: "ISBN_10" | "ISBN_13";
        identifier: string;
    }[];
    pageCount!: number;
    progress!: number;
    categories!: string[];
    imageLinks!: {
        smallThumbnail: string | null;
        thumbnail: string | null;
    };
    isCurrentlyReading!: boolean;
    language!: string;

    constructor(data: BookType) {
        Object.assign(this, data);
    }

    static fromJson(json: BookJSON): Book {
        return new Book({
            id: json.id ?? undefined,
            title: json.title ?? "Untitled",
            authors: json.authors ?? [],
            dateAdded: json.dateAdded ? new Date(json.dateAdded) : new Date(),
            lastRead: json.lastRead ? new Date(json.lastRead) : undefined,
            publisher: json.publisher ?? "Unknown Publisher",
            publishedDate: json.publishedDate
                ? new Date(json.publishedDate)
                : new Date(),
            description: json.description ?? "No description available.",
            industryIdentifiers: json.industryIdentifiers ?? [],
            pageCount: json.pageCount ?? 0,
            progress: json.progress ?? 0,
            categories: json.categories ?? [],
            imageLinks: json.imageLinks ?? {
                smallThumbnail: null,
                thumbnail: null,
            },
            isCurrentlyReading: json.isCurrentlyReading ?? false,
            language: json.language ?? "unknown",
        });
    }

    toJson(): BookJSON {
        return {
            ...this,
            dateAdded: this.dateAdded.toISOString(),
            lastRead: this.lastRead?.toISOString(),
            publishedDate: this.publishedDate.toISOString(),
        };
    }
}
