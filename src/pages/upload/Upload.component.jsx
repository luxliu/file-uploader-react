import React, { useState, useRef } from 'react';
import axios from 'axios';

import cancelIcon from '../../assets/images/cancel.png';
import UploaderComponent from './components/Uploader.component';
import ProgressListComponent from './components/ProgressList.component';
import { generateKey, encryptFile, toBase64 } from '../../utils/encrypt.util';

const UploadComponent = () => {
  const [displayAlert, setDisplayAlert] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadDisabled, setUploadDisabled] = useState(true);
  const [fileList, setFileList] = useState([]);

  const passwordInputRef = useRef(null);
  const closeAlert = () => setDisplayAlert(false);

  const onFileInputChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setUploadDisabled(false);
  };

  const updateFileList = (updateFile, updateObj) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };

  const onUpload = async () => {
    if (selectedFile.size > 20 * 1024 * 1024) {
      setDisplayAlert(true);
      return;
    }

    const date = new Date();
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    let _file = {
      uid: date.getTime() + 'upload-file',
      date: formattedDate,
      status: 'ready',
      isFinished: false,
      name: selectedFile.name,
      size: selectedFile.size,
      percent: 0,
      raw: selectedFile,
    };

    setFileList((prevList) => {
      return [_file, ...prevList];
    });

    const formData = new FormData();
    // encrypt file
    const key = generateKey();
    const base64String = await toBase64(selectedFile);
    const encryptedFile = encryptFile(base64String, key);
    formData.append('encryptedFile', encryptedFile);
    formData.append('password', passwordInputRef.current.value);

    axios
      .post('https://www.mocky.io/v2/5cc8019d300000980a055e76', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          updateFileList(_file, { percent: percentage, status: 'uploading' });
        },
      })
      .then((resp) => {
        updateFileList(_file, { status: 'success', response: resp.data });
      })
      .catch((err) => {
        updateFileList(_file, { status: 'error', error: err });
      })
      .finally(() => updateFileList(_file, { isFinished: true }));
  };

  return (
    <div className="row file-uploader-wrapper">
      <div className="col-4 upload-wrapper">
        <img src={cancelIcon} alt="cancel" />
        <UploaderComponent
          displayAlert={displayAlert}
          closeAlert={closeAlert}
          fileLabelText={selectedFile?.name}
          passwordInputRef={passwordInputRef}
          uploadDisabled={uploadDisabled}
          onFileInputChange={onFileInputChange}
          onUpload={onUpload}
        />
      </div>
      <div className="col-8 progress-wrapper">
        <h4>Progress</h4>
        <hr />
        <ProgressListComponent fileList={fileList} />
      </div>
    </div>
  );
};

export default UploadComponent;
