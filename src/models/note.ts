export type NoteFormData = {
    bookId?: number;
    title: string;
    content: string;
    page?: number;
    sourceType?: 'book' | 'blog' | 'article';
    tags?: string[];
    url?: string;
};

export type NoteType = NoteFormData & {
    id: number;
    createdAt: string;
};

export class Note implements NoteType {
    id!: number;
    bookId?: number;
    title!: string;
    content!: string;
    page?: number;
    createdAt!: string;
    sourceType?: 'book' | 'blog' | 'article';
    tags?: string[];
    url?: string;

    constructor(data: NoteType) {
        Object.assign(this, data);
    }
}

export type NoteWithBook = NoteType & {
    bookTitle: string;
    imageUrl?: string;
};
