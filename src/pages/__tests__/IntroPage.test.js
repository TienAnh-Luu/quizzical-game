import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import IntroPage from '../IntroPage';

test('loads and displays correctly', async () => {
  const RoutedComponent = () => (
    <BrowserRouter>
      <IntroPage />
    </BrowserRouter>
  );
  render(<RoutedComponent />);

  expect(screen.getByText('Quizzical')).toBeVisible();
  expect(screen.getByText('Welcome to the quizzical game')).toBeVisible();
  expect(screen.getByRole('button')).toHaveTextContent('Start quiz');
});
