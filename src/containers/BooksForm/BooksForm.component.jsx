/* eslint-disable no-nested-ternary */
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CREATE_BOOK } from '../../actions/index';
import './BooksForm.styles.css';
import loader from '../../images/spinner.svg';

export const BOOK_CATEGORY = ['Action', 'Biography', 'History', 'Horror', 'Kids', 'Learning', 'Sci-Fi'];

const BooksForm = () => {
  const initialInput = {
    text: '', category: '', valid: true, errorId: 0, errorMessage: '', getDetails: true,
  };
  const [author, setAuthor] = useState('');
  const [moreContent, setMoreContent] = useState(false);
  const [input, handleChange] = useState(initialInput);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const categoryRef = useRef(null);
  let searchDelay;

  useEffect(() => () => {
    clearTimeout(searchDelay);
  }, []);

  useEffect(() => {
    if (input.text.length >= 2 && input.getDetails) {
      fetch('http://127.0.0.1:3001/suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: input.text,
        }),
      }).then(response => response.json())
        .then(data => {
          if (data.books.totalItems > 0) {
            setMoreContent(false);
            setSuggestions(data.books.items);
          } else {
            setMoreContent(true);
            setSuggestions([]);
          }
          setLoading(false);
        });
    }
  }, [input]);

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
    } else if (!input.category.replace(/\s/g, '').length) {
      handleChange({
        ...input, errorId: 2, valid: false, errorMessage: 'Please enter valid value for category',
      });
    } else {
      dispatch(CREATE_BOOK({
        id: Math.floor(Math.random() * 1000),
        title: input.text,
        category: input.category,
        author,
      }));
      handleChange(initialInput);
      setAuthor('');
      setMoreContent(false);
      inputRef.current.value = '';
    }
  };

  const handleSuggestion = (e, book) => {
    inputRef.current.value = e.target.textContent;
    const category = book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'Default';
    const author = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Anonymous';
    handleChange({
      ...input,
      text: e.target.textContent,
      getDetails: false,
      category,
      author,
      progress: 0,
    });
    setSuggestions([]);
  };

  const cancelError = () => {
    handleChange({ ...input, valid: true });
  };

  const handleInput = e => {
    if (inputRef.current.value.length >= 2) {
      setLoading(true);
    }
    clearTimeout(searchDelay);
    searchDelay = setTimeout(() => {
      if (input.text !== e.target.value) {
        handleChange({ ...input, text: e.target.value, getDetails: true });
      }
    }, 5000);
  };

  return (
    <div className="max-width-limit">
      <h2 className="form-title">Add New Book</h2>
      <form id="book-form" className="max-width-limit" action="#">
        <div className={`form-content${moreContent ? ' more-details' : ''}`}>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleInput}
            minLength="2"
            placeholder={input.valid ? 'Enter Book Name' : 'Enter Valid Book Name'}
            className={input.valid && input.errorId === 1 ? 'valid' : 'invalid'}
            autoComplete="off"
            list="bookNames"
            ref={inputRef}
            required
          />
          <input
            type="text"
            name="category"
            id="category"
            placeholder="Default Category"
            list="categoryName"
            ref={categoryRef}
            className={input.errorId === 2 && !input.valid ? 'invalid' : ''}
            onChange={e => handleChange({ ...input, category: e.target.value })}
            value={input.category}
          />
          <datalist id="categoryName">
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
          </datalist>
          {moreContent
            ? <input type="Text" id="author" onChange={e => setAuthor(e.target.value)} value={author} placeholder="Author" />
            : ''}
          <input type="submit" onClick={handleSubmit} value="ADD BOOK" />
        </div>
        <div className="suggestion-box">
          <div className="suggestions">
            { loading
              ? (
                <div className="loading-suggestions">
                  <object type="image/svg+xml" data={loader}>loading</object>
                </div>
              )
              : moreContent
                ? <div>No content found. Please enter the details manually</div>
                : suggestions.slice(0, 2).map((book, i) => (
                  <div role="menuitem" tabIndex={i} key={book.id} onKeyDown={e => handleSuggestion(e, book)} onClick={e => handleSuggestion(e, book)} className="book">{book.volumeInfo.title}</div>
                ))}
          </div>
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
