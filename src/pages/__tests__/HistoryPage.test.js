import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import HistoryPage from '../HistoryPage';

test('loads and displays correctly', async () => {
  const RoutedComponent = () => (
    <BrowserRouter>
      <HistoryPage />
    </BrowserRouter>
  );
  render(<RoutedComponent />);

  expect(screen.getByText('History page')).toBeVisible();
  expect(screen.getByRole('button')).toHaveTextContent('Back');
  expect(screen.getByRole('link')).toHaveAttribute('href', '/questions');
});
