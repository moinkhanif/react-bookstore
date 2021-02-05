import { render, screen } from '@testing-library/react';
import App from './App.component';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Heya/i);
  expect(linkElement).toBeInTheDocument();
});
