import React, { useState } from 'react';
import axios from 'axios';
import './fileUpload.css';

function App() {
    const companyID = localStorage.getItem('companyID');
    if (!companyID) {
        console.error('No companyID found');
        alert('Company ID missing. Please log in again.');
    }

    const [userInfo, setUserInfo] = useState({
        file: null,
        filepreview: null,
    });
    const [renFile, setRenFile] = useState('');
    const [isSuccess, setSuccess] = useState(null);

    const handleInputChange = (event) => {
        const selected = event.target.files[0];
        if (!selected) return;

        const MAX_FILE_SIZE = 5 * 1024 * 1024;
        if (selected.size > MAX_FILE_SIZE) {
            alert("File size exceeds 5 MB");
            return;
        }

        const newRenFile = `${companyID}-${selected.name}`;
        setRenFile(newRenFile);
        setUserInfo({
            file: selected,
            filepreview: URL.createObjectURL(selected),
        });
    };

    const submit = async () => {
        if (!userInfo.file) {
            alert('No image selected');
            return;
        }

        const formdata = new FormData();
        formdata.append('avatar', userInfo.file, renFile);

        try {
            // 1. Upload file
            const uploadRes = await axios.post("/api/imageUpload", formdata, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json",
                    "companyID": companyID
                }
            });

            if (uploadRes.data.success !== 1) {
                throw new Error(uploadRes.data.message || 'Upload failed');
            }

            alert(uploadRes.data.message);
            setSuccess("Image uploaded successfully");

            // 2. Update SQL database
            const sqlRes = await fetch('/api/imageSql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ companyID, imageID: renFile })
            });
            const text = await sqlRes.text();
            console.log(text);
            alert(text);
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
            setSuccess(null);
        }
    };

    return (
        <div className="container mr-60">
            <h3 className="text-white">React Image Upload And Preview Using Node Js - <span>Image Upload</span></h3>
            <div className="formdesign">
                {isSuccess !== null ? <h4>{isSuccess}</h4> : null}
                <div className="form-row">
                    <label className="text-white">Select Image :</label>
                    <input type="file" className="form-control" name="upload_file" onChange={handleInputChange} />
                </div>
                <div className="form-row">
                    <button type="submit" className="btn btn-dark" onClick={submit}>Upload</button>
                </div>
            </div>
            {userInfo.filepreview !== null &&
                <img className="previewimg" src={userInfo.filepreview} alt="UploadImage" />
            }
        </div>
    );
}

export default App;