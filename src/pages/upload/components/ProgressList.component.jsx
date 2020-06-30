import React from 'react';

import tickIcon from '../../../assets/images/tick.png';
import reuploadIcon from '../../../assets/images/reupload.png';

const ProgressListComponent = ({ fileList }) => (
  <div className="progress-display" id="progress-display">
    <div className="row header">
      <div className="col-2">DATE</div>
      <div className="col-4">NAME</div>
      <div className="col-6">PROGRESS</div>
    </div>
    {fileList.map((file) => (
      <div className="row content" key={file.uid}>
        <div className="col-2">{file.date}</div>
        <div className="col-4 name">{file.name}</div>
        <div className="col-6 progress-bar-wrapper">
          <div className="progress">
            <div
              className={`progress-bar ${
                file.status === 'error' ? 'bg-danger' : 'bg-success'
              }`}
              role="progressbar"
              style={{
                width: `${file.status === 'error' ? 100 : file.percent || 0}%`,
              }}
            ></div>
          </div>
          <div className="icon-wrapper">
            <img
              src={file.status === 'success' ? tickIcon : reuploadIcon}
              className="icon"
              alt={file.status === 'success' ? 'success' : 'failed'}
              style={{ display: file.isFinished && 'block' }}
            />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default ProgressListComponent;
