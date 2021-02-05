import './App.styles.css';
import BooksList from '../BooksList/BooksList.component';
import BooksForm from '../../containers/BooksForm/BooksForm.component';

function App() {
  return (
    <div className="App">
      <BooksList />
      <BooksForm />
    </div>
  );
}

export default App;
