import React from 'react';
import { render } from '@testing-library/react';
import Alertcomponent from './Alert.component';

describe('Alert component', () => {
  it('should render correctly', async () => {
    const { queryByText } = render(<Alertcomponent message="alert message" />);
    expect(queryByText(/alert message/)).toBeInTheDocument();
  });
});
