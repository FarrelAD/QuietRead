import Book from "../../interfaces/book";

type props = {
  book: Book;
};

export function BigBookCard(props: props) {
  const { book } = props;

  return (
    <div
      key={book.id}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <img
        src={book.imageLinks.thumbnail}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1 text-sm leading-tight">
          {book.title}
        </h3>
        {book.authors.map((author, index) => (
          <p key={index} className="text-gray-600 mb-3">
            {author}
          </p>
        ))}
        <div className="flex items-center justify-between">
          {book.progress < 100 && (
            <span className="text-xs text-blue-600 font-medium">
              {book.progress}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

type MediumBookCard = {
  book: Book;
};

export function MediumBookCard(props: MediumBookCard) {
  const { book } = props;

  return (
    <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-100">
      <div className="flex items-center space-x-3">
        <img
          src={book.imageLinks.smallThumbnail}
          alt={book.title}
          className="w-12 h-16 object-cover rounded"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{book.title}</h3>
          {book.authors.map((author, index) => (
            <p key={index} className="text-gray-600 mb-3">
              {author}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

type PreviewBookCardProps = {
  book: Book;
};

export function PreviewBookCard(props: PreviewBookCardProps) {
  const { book } = props;

  return (
    <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-xl">
      <h4 className="font-semibold text-gray-700 mb-3">Book Preview</h4>
      <div className="flex space-x-4">
        {book.imageLinks?.thumbnail ? (
          <img
            src={book.imageLinks.thumbnail}
            alt={book.title}
            className="w-16 h-24 object-cover rounded-lg shadow-sm"
          />
        ) : (
          <div className="w-16 h-24 bg-gray-200 flex items-center justify-center rounded-lg shadow-sm text-xs text-gray-500">
            No Image
          </div>
        )}

        <div className="flex-1">
          <h5 className="font-semibold text-gray-800 mb-1">{book.title}</h5>
          {book.authors.map((author, index) => (
            <p key={index} className="text-gray-600 text-sm mb-1">
              {author}
            </p>
          ))}
          <ul className="text-gray-500 text-xs mb-2">
            {book.industryIdentifiers.map((idn, index) => (
              <li key={index}>
                {idn.type} - {idn.identifier}
              </li>
            ))}
          </ul>
          <p className="text-gray-500 text-xs">{book.pageCount} pages</p>
        </div>
      </div>
      {book.description && (
        <p className="text-gray-600 text-sm mt-3 leading-relaxed">
          {book.description.substring(0, 150)}...
        </p>
      )}
    </div>
  );
}

export function NotFoundBookCard() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex items-center gap-4 bg-white rounded-lg shadow-md border border-gray-200 p-4 max-w-md">
        <div className="flex-1">
          <h5 className="text-lg font-semibold text-gray-800 mb-1">
            Book Not Found
          </h5>
          <p className="text-sm text-gray-600">
            The book you're looking for doesn't exist.
          </p>
        </div>
        <div className="flex-shrink-0">
          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-red-500 text-sm font-bold">!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
