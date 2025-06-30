import { ChangeEvent, useState } from "react";

type VolumeInfo = {
    title?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    pageCount?: number;
    categories?: string[];
    imageLinks?: {
        thumbnail?: string;
    };
    previewLink?: string;
};

export function BookInfo() {
    const [isbn, setISBN] = useState<string>('');
    const [bookInfo, setBookInfo] = useState<VolumeInfo | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setISBN(e.target.value);
    };

    const getBookInfoByISBN = async () => {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        const data = await response.json();
        if (data.totalItems > 0) {
            setBookInfo(data.items[0].volumeInfo);
        } else {
            setBookInfo(null);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Get your full book info by inputting your ISBN</h1>
            <div className="flex flex-col gap-4 mb-6">
                <input
                    type="text"
                    value={isbn}
                    onChange={handleChange}
                    className="border rounded-md p-4"
                    placeholder="Input your ISBN here"
                />
                <button
                    onClick={getBookInfoByISBN}
                    className="bg-black text-white p-2 rounded-md hover:bg-gray-800"
                >
                    Submit
                </button>
            </div>

            <div className="bg-gray-100 p-4 rounded-md shadow">
                <h2 className="text-lg font-semibold mb-2">Book Info</h2>
                {bookInfo ? (
                    <div className="space-y-2">
                        {bookInfo.imageLinks?.thumbnail && (
                            <img
                                src={bookInfo.imageLinks.thumbnail}
                                alt="Book Cover"
                                className="w-32 mb-2"
                            />
                        )}
                        <p><strong>Title:</strong> {bookInfo.title}</p>
                        {bookInfo.authors && (
                            <p><strong>Author(s):</strong> {bookInfo.authors.join(', ')}</p>
                        )}
                        {bookInfo.publisher && (
                            <p><strong>Publisher:</strong> {bookInfo.publisher}</p>
                        )}
                        {bookInfo.publishedDate && (
                            <p><strong>Published:</strong> {bookInfo.publishedDate}</p>
                        )}
                        {bookInfo.pageCount && (
                            <p><strong>Pages:</strong> {bookInfo.pageCount}</p>
                        )}
                        {bookInfo.categories && (
                            <p><strong>Categories:</strong> {bookInfo.categories.join(', ')}</p>
                        )}
                        {bookInfo.description && (
                            <p><strong>Description:</strong> {bookInfo.description.substring(0, 200)}...</p>
                        )}
                        {bookInfo.previewLink && (
                            <p>
                                <a
                                    href={bookInfo.previewLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    Preview Book
                                </a>
                            </p>
                        )}
                    </div>
                ) : (
                    <p>No book info found</p>
                )}
            </div>
        </div>
    );
}
