import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('should render correctly', () => {
    const { queryByText } = render(<App />);
    expect(queryByText(/File Upload/)).toBeInTheDocument();
    expect(queryByText(/Progress/)).toBeInTheDocument();
  });
});
