import React from 'react';
import AlertComponent from '../../../components/alert';

const UploaderComponent = ({
  displayAlert,
  closeAlert,
  fileLabelText,
  passwordInputRef,
  uploadDisabled,
  onFileInputChange,
  onUpload,
}) => (
  <>
    <form>
      <h2>File Upload</h2>
      <hr />
      <div className="form-group">
        <label htmlFor="password">Enter Password to Encrypt Files</label>
        <input
          className="form-control"
          type="password"
          id="password"
          name="password"
          ref={passwordInputRef}
        />
      </div>
      <div className="form-group">
        <label>Upload File</label>
        <label
          className="form-control"
          htmlFor="file-input"
          id="file-name-label"
        >
          {fileLabelText}
        </label>
        <input
          className="form-control-file file-input--hidden"
          type="file"
          id="file-input"
          name="file-input"
          onChange={onFileInputChange}
        />
      </div>
    </form>
    <div className="button-wrapper">
      <label className="col-4 btn btn-light" htmlFor="file-input">
        Browser
      </label>
      <button
        className="btn btn-light btn-upload"
        id="upload-file-button"
        onClick={onUpload}
        disabled={uploadDisabled}
      >
        UPLOAD
      </button>
    </div>
    {displayAlert && (
      <AlertComponent
        closeAlert={closeAlert}
        message="Please select a file which is smaller than 20Mb."
      />
    )}
  </>
);

export default UploaderComponent;
