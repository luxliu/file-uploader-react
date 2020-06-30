import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import UploadComponent from './Upload.component';
import axios from 'axios';

jest.mock('axios');

describe('Upload page', () => {
  it('should  correctly', async () => {
    const { container, queryByText, queryAllByRole } = render(
      <UploadComponent />
    );

    // two inputs
    expect(container.querySelector('#password')).toBeInTheDocument();
    expect(container.querySelector('#file-input')).toBeInTheDocument();

    // disabled upload button
    const uploadButton = container.querySelector('#upload-file-button');
    expect(uploadButton).toHaveAttribute('disabled');

    //simulate file select
    const fileInput = container.querySelector('#file-input');
    const file = new File(['123'], 'file.png', { type: 'image/png' });
    const event = {
      target: {
        files: [file],
      },
    };

    fireEvent.change(fileInput, event);
    expect(uploadButton).not.toHaveAttribute('disabled');
    expect(queryByText('file.png')).toBeInTheDocument();

    axios.post.mockResolvedValueOnce({ data: 'success' });
    fireEvent.click(uploadButton);
    await wait(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(queryAllByRole('progressbar').length).toEqual(1);
      expect(queryAllByRole('progressbar')[0]).toHaveClass('bg-success');
    });

    axios.post.mockRejectedValueOnce({ data: 'failed' });
    fireEvent.click(uploadButton);
    await wait(() => {
      expect(axios.post).toHaveBeenCalledTimes(2);
      expect(queryAllByRole('progressbar').length).toEqual(2);
      expect(queryAllByRole('progressbar')[0]).toHaveClass('bg-danger');
    });
  });
});
