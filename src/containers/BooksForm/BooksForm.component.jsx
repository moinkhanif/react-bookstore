import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CREATE_BOOK } from '../../actions/index';
import './BooksForm.styles.css';

export const BOOK_CATEGORY = ['Action', 'Biography', 'History', 'Horror', 'Kids', 'Learning', 'Sci-Fi'];

const BooksForm = () => {
  const initialInput = {
    text: '', category: 'Default', valid: true, errorId: 0, errorMessage: '',
  };
  const [input, handleChange] = useState(initialInput);
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    if (input.text.length < 2) {
      handleChange({
        ...input, text: '', errorId: 1, valid: false, errorMessage: 'Enter Valid Book Name',
      });
    } else if (input.category === 'Default') {
      handleChange({
        ...input, errorId: 2, valid: false, errorMessage: 'Category cannot be Default value',
      });
    } else {
      dispatch(CREATE_BOOK({
        id: Math.floor(Math.random() * 1000),
        title: input.text,
        category: input.category,
      }));
      handleChange(initialInput);
    }
  };

  const cancelError = () => {
    handleChange({ ...input, valid: true });
  };

  return (
    <div className="max-width-limit">
      <h2 className="form-title">Add New Book</h2>
      <form id="book-form" className="max-width-limit" action="#">
        <div className="form-content">
          <input
            type="text"
            name="title"
            id="title"
            onChange={e => handleChange({ ...input, text: e.target.value })}
            minLength="2"
            placeholder={input.valid ? 'Enter Book Name' : 'Enter Valid Book Name'}
            className={input.valid && input.errorId === 1 ? 'valid' : 'invalid'}
            value={input.text}
            required
          />
          <select name="category" id="category" className={input.errorId === 2 && !input.valid ? 'invalid' : ''} onChange={e => handleChange({ ...input, category: e.target.value })} value={input.category}>
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
          <input type="submit" onClick={handleSubmit} value="ADD BOOK" />
        </div>
        {input.valid ? '' : (
          <div className="error-message">
            <div tabIndex={0} role="button" className="error-close" onKeyDown={cancelError} onClick={cancelError}>X</div>
            <p>{`Error: ${input.errorMessage}`}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default BooksForm;
