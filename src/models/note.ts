export type NoteFormData = {
    bookId: number;
    title: string;
    content: string;
    page: number;
};

export type NoteType = NoteFormData & {
    id: number;
    createdAt: string;
};

export class Note implements Note {
    id!: number;
    bookId!: number;
    title!: string;
    content!: string;
    page!: number;
    createdAt!: string;

    constructor(data: NoteType) {
        Object.assign(this, data);
    }
}

export type NoteWithBook = NoteType & {
    bookTitle: string;
};
