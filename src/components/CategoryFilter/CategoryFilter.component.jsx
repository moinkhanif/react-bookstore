import PropTypes from 'prop-types';
import { BOOK_CATEGORY } from '../../containers/BooksForm/BooksForm.component';
import './CategoryFilter.styles.css';

const CategoryFilter = ({ handleFilterChange }) => (
  <form>
    <span>Filter: </span>
    <select id="category-filter" onChange={handleFilterChange}>
      <option value="All">All</option>
      {
        BOOK_CATEGORY.map(category => (
          <option
            key={BOOK_CATEGORY.indexOf(category)}
            value={category}
          >
            {category}
          </option>
        ))
      }
    </select>
  </form>
);

CategoryFilter.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
};

export default CategoryFilter;
