import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CREATE_BOOK } from '../../actions/index';

const BOOK_CATEGORY = ['Action', 'Biography', 'History', 'Horror', 'Kids', 'Learning', 'Sci-Fi'];

const BooksForm = () => {
  const initialInput = { text: '', category: 'Default', valid: true };
  const [input, handleChange] = useState(initialInput);
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    if (input.text.length < 2) {
      handleChange({ ...input, text: '', valid: false });
    } else {
      dispatch(CREATE_BOOK({
        id: Math.floor(Math.random() * 1000),
        title: input.text,
        category: input.category,
      }));
      handleChange(initialInput);
    }
  };

  return (
    <form id="book-form" action="#">
      <input
        type="text"
        name="title"
        id="title"
        onChange={e => handleChange({ ...input, text: e.target.value })}
        minLength="2"
        placeholder={input.valid ? 'Enter Book Name' : 'Enter Valid Book Name'}
        className={input.valid ? 'valid' : 'invalid'}
        value={input.text}
        required
      />
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
      <input type="submit" onClick={handleSubmit} />
    </form>
  );
};

export default BooksForm;
