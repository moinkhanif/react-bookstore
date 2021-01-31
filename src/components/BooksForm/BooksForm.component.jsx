const BOOK_CATEGORY = ['Action', 'Biography', 'History', 'Horror', 'Kids', 'Learning', 'Sci-Fi'];

const BooksForm = () => (
  <form id="book-form" action="#">
    <input type="text" name="title" id="title" />
    <select name="category" id="category">
      <option value="Default">Default</option>
      {
        BOOK_CATEGORY.map(bookCategory => (
          <option
            key={BOOK_CATEGORY.indexOf(bookCategory)}
            value={bookCategory}
          >
            {bookCategory}
          </option>
        ))
      }
    </select>
  </form>
);

export default BooksForm;
