import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import './Dataset.css';
import Sidebar from '../Sidebar/Sidebar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

Modal.setAppElement('#root');

function Dataset() {
  const [files, setFiles] = useState([]);
  const [nextFileId, setNextFileId] = useState(1);
  const [fileName, setFileName] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [errorMessage] = useState('');
  const fileInputRef = useRef(null); // Ref for accessing the file input

  const clearAllFiles = async () => {
    try {
      // Delete all files from the server
      await Promise.all(
        files.map(async (file) => {
          await fetch(`http://localhost:8000/deleteCSVfile/${file.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        })
      );
  
      // Clear both state and local storage
      setFiles([]);
      setNextFileId(1);
      localStorage.removeItem('uploadedFiles');
      localStorage.removeItem('nextFileId');
  
      alert('All files deleted successfully!');
    } catch (error) {
      alert('Failed to delete all files');
    }
  };

  useEffect(() => {
    // Retrieve stored files from local storage
    const storedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    const storedNextFileId = localStorage.getItem('nextFileId') || 1;

    // Update state with stored files and nextFileId
    setFiles(storedFiles);
    setNextFileId(parseInt(storedNextFileId));
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  const updateLocalStorage = (updatedFiles) => {
    localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
    localStorage.setItem('nextFileId', (nextFileId + 1).toString());
  };

  const handleFileChange = async (e) => {
    const selectedFiles = e.target.files;

    const formData = new FormData();
    formData.append('csvFile', selectedFiles[0]);

    try {
      const response = await fetch('http://localhost:8000/uploadCSV', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data); // Log the entire response

      // Update state with the new file
      const newFile = {
        file: data.fileId,
        id: nextFileId,
        name: fileName.trim() || data.originalname,
      };

      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, newFile];
        updateLocalStorage(updatedFiles);
        return updatedFiles;
      });

      setNextFileId((prevId) => prevId + 1);
      setFileName('');

      alert(`File '${data.originalname}' uploaded successfully!`);
    } catch (error) {
      alert('File upload failed');
    }
  };

  const handleUpload = () => {
    // Programmatically click the file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const openDeleteModal = (fileId) => {
    setShowDeleteModal(true);
    setFileToDelete(fileId);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setFileToDelete(null);
  };

  const handleDelete = async () => {
    try {
      // Delete the file from the server
      const response = await fetch(`http://localhost:8000/deleteCSVfile/${fileToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data); // Log the response from the server
  
      // Update state and local storage
      const updatedFiles = files.filter((file) => file.id !== fileToDelete);
      setFiles(updatedFiles);
      updateLocalStorage(updatedFiles);
  
      closeDeleteModal();
  
      alert(`File with fileId ${fileToDelete} deleted successfully!`);
    } catch (error) {
      alert('Failed to delete the file');
    }
  };

  const handleDownload = (fileId) => {
    const selectedFile = files.find((file) => file.id === fileId);
    if (selectedFile && selectedFile.file) {
      const downloadLink = document.createElement('a');
      const blob = new Blob([selectedFile.file], { type: 'application/octet-stream' });
      const fileURL = window.URL.createObjectURL(blob);
      downloadLink.href = fileURL;
      downloadLink.download = selectedFile.name;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const handleProcess = async (fileId) => {
    const selectedFile = files.find((file) => file.id === fileId);
    if (selectedFile && selectedFile.file) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/process/${fileId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if required
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data); // Handle the response data as needed
        alert("success processed, You can now go to the Product page and Order page and see the prediction results for your dataset ");
      } catch (error) {
        alert("failed processed");
      }
    }
  };

  return (
    <div className="ssi">
      <div className="tt">
        <div className="DatasetContainer">
          <CloudUploadIcon className='cloud-icon' fontSize="large" color="rgb(9, 71, 71)" />
          <h2>Upload CSV Files</h2>
          <div className="input-container">
            <label>Name</label>
            <input
              type="text"
              className="text-box"
              placeholder="Enter file name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>
          {/* Hidden file input triggered by the "Upload" button */}
          <input
            type="file"
            accept=".csv"
            multiple
            onChange={handleFileChange}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
          <button onClick={handleUpload}>Upload</button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
        {/* Fixed message on the right side */}
        <div className="fixed-message">
          <WarningAmberIcon style={{ color: 'red', position: 'fixed', margin: '5px', marginLeft: '-180px', marginTop: '10px' }} />
          <p style={{ paddingLeft: '10px' }}>The dataset must contain four main columns to obtain accurate and correct results:</p>
          <p style={{ paddingLeft: '10px' }}>" ProductID & Quantity & InvoiceID & Date "</p>
        </div>
        
        {files.length > 0 && (
            <div className="uploaded-files">
              <button  onClick={clearAllFiles}>Clear All Files</button>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Delete</th>
                  <th>Download</th>
                  <th>Products</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.id}>
                    <td>{file.id}</td>
                    <td>{file.id}-{file.name}</td>
                    <td className='delete'>
                      <button onClick={() => openDeleteModal(file.id)}>Delete</button>
                    </td>
                    <td className='download'>
                      <button onClick={() => handleDownload(file.id)}>Download</button>
                    </td>
                    <td className='select'>
                      <button onClick={() => handleProcess(file.id)}>Process</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Sidebar />
      </div>

      {/* Modal for Delete Confirmation */}
      <Modal
        isOpen={showDeleteModal}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Confirmation"
        className="modal"
      >
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this file?</p>
        <div>
          <button onClick={handleDelete}>Yes, Delete</button>
          <button onClick={closeDeleteModal}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}

export default Dataset;