import Book from "../interfaces/book";

const books: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    authors: ["F. Scott Fitzgerald"],
    categories: ["Fiction"],
    dateAdded: new Date("2024-06-15"),
    description:
      "A mysterious American millionaire tries to recapture the sweetheart of his youth, which results in tragedy.",
    imageLinks: {
      thumbnail:
        "https://books.google.com/books/content?id=fIlQDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      smallThumbnail:
        "https://books.google.com/books/content?id=fIlQDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    },
    industryIdentifiers: [
      {
        type: "ISBN_10",
        identifier: "0743273567",
      },
      {
        type: "ISBN_13",
        identifier: "9780743273565",
      },
    ],
    isCurrentlyReading: true,
    language: "en",
    lastRead: new Date("2024-06-28"),
    pageCount: 208,
    progress: 65,
    publishedDate: new Date("2004-09-30"),
    publisher: "Simon and Schuster",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    authors: ["Harper Lee"],
    categories: ["Fiction"],
    dateAdded: new Date("2024-06-01"),
    description:
      "Harper Lee's Pulitzer Prize-winning masterwork of honor and injustice in the deep South -- and the heroism of one man in the face of blind and violent hatred One of the best-loved stories of all time, To Kill a Mockingbird has been translated into more than forty languages, sold more than thirty million copies worldwide, served as the basis of an enormously popular motion picture, and was voted one of the best novels of the twentieth century by librarians across the country. A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice, it views a world of great beauty and savage inequities through the eyes of a young girl, as her father -- a crusading local lawyer -- risks everything to defend a black man unjustly accused of a terrible crime.",
    imageLinks: {
      thumbnail:
        "https://books.google.com/books/content?id=ncuX8p2xLIUC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      smallThumbnail:
        "https://books.google.com/books/content?id=ncuX8p2xLIUC&printsec=frontcover&img=1&zoom=5&source=gbs_api",
    },
    industryIdentifiers: [
      {
        type: "ISBN_10",
        identifier: "0061120081",
      },
      {
        type: "ISBN_13",
        identifier: "9780061120084",
      },
    ],
    isCurrentlyReading: false,
    language: "en",
    lastRead: new Date("2024-06-20"),
    pageCount: 346,
    progress: 86,
    publishedDate: new Date("2006-05-23"),
    publisher: "Harper Perennial Modern Classics",
  },
];

export default books;
