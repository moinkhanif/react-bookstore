import './App.styles.css';
import BooksList from '../BooksList/BooksList.component';
import BooksForm from '../../containers/BooksForm/BooksForm.component';
import Header from '../Header/Header.component';

function App() {
  return (
    <div className="App">
      <Header />
      <BooksList />
      <BooksForm />
    </div>
  );
}

export default App;
