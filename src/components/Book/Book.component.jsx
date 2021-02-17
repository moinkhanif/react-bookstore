import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { REMOVE_BOOK } from '../../actions';
import './Book.styles.css';

const Book = ({ book }) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [deleteBook, setDeleteBook] = useState(false);
  const [iniUpdateProgress, setIniUpdateProgress] = useState(false);
  const {
    title,
    category,
    author,
    progress,
  } = book;
  const dispatch = useDispatch();
  let delay;

  // Progress bar info start
  const DIAMETER = 50;
  const STROKE_WIDTH = 6;
  const RADIUS = DIAMETER / 2 - STROKE_WIDTH / 2;
  const circumference = Math.PI * RADIUS * 2;
  const position = Math.max(1 - currentProgress, 0);
  // Progress bar info end

  useEffect(() => {
    setCurrentProgress((progress || 0) / 100);
    return () => {
      clearTimeout(delay);
    };
  }, []);

  const handleRemoveBook = book => {
    delay = setTimeout(() => {
      dispatch(REMOVE_BOOK(book));
    }, 500);
    setDeleteBook(true);
  };

  return (
    <div className={`book-container${deleteBook ? ' deleted' : ''}`}>
      <div className="book-info">
        <p className="book-category">{category}</p>
        <h2 className="book-title">{title}</h2>
        <p className="book-author">{author || 'Anonymous'}</p>
        <div className="book-actionable">
          <a href="./#">Comments</a>
          <a
            href="./#"
            className="actionable-middle"
            onClick={e => {
              e.preventDefault();
              handleRemoveBook(book);
            }}
          >
            Remove
          </a>
          <a href="./#">Edit</a>
        </div>
      </div>
      <div className="progress-percent d-flex d-jc-center">
        <div className="svg-holder">
          <svg
            viewBox="0 0 50 50"
            width="100px"
            height="100px"
            className="circle-progress"
          >
            <defs>
              <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#379cf6" />
                <stop offset="100%" stopColor="#307bbe" />
              </linearGradient>
            </defs>
            <circle
              cx={DIAMETER / 2}
              cy={DIAMETER / 2}
              r={RADIUS}
              stroke="url(#linear)"
              fill="transparent"
              strokeWidth={STROKE_WIDTH}
              strokeDasharray={circumference}
              strokeDashoffset={circumference * position}
            />
          </svg>
        </div>
        <div className="progress-value-container">
          <p className="progress-value">{`${currentProgress * 100}%`}</p>
          <p className="progress-completed">Completed</p>
        </div>
      </div>
      <div className="progress-info">
        <div className="current-chapter-title">CURRENT CHAPTER</div>
        <div className="current-chapter">Chapter 17</div>
        <button type="submit" onClick={() => setIniUpdateProgress(!iniUpdateProgress)} className="update-progress-button">UPDATE PROGRESS</button>
        {
          iniUpdateProgress
            ? (
              <div className="progress-update-form">
                <input type="number" value={currentProgress * 100} max="100" onChange={e => (e.target.checkValidity() ? setCurrentProgress(e.target.value / 100) : '')} />
                <button type="submit" onClick={() => setIniUpdateProgress(false)}>Save</button>
              </div>
            )
            : ''
        }
      </div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    category: PropTypes.string,
    author: PropTypes.string,
    progress: PropTypes.number,
  }).isRequired,
};

export default Book;
