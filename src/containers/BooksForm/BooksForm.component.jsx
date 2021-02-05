import { useState } from 'react';

const BOOK_CATEGORY = ['Action', 'Biography', 'History', 'Horror', 'Kids', 'Learning', 'Sci-Fi'];

const BooksForm = () => {
  const [input, handleChange] = useState({ text: '', category: 'Default' });

  return (
    <form id="book-form" action="#">
      <input type="text" name="title" id="title" onChange={e => handleChange({ ...input, text: e.target.value })} />
      <select name="category" id="category" onChange={e => handleChange({ ...input, category: e.target.value })}>
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
};

export default BooksForm;
