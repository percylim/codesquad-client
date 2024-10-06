import React,{useState } from 'react';
import axios from 'axios';
import './fileUpload.css';
//require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;
var companyID= localStorage.getItem('companyID');
var renFile = '';
function App () {

    const [userInfo, setuserInfo] = useState({
        file:[],
        filepreview:null,

    });

    const handleInputChange = (event) => {
        setuserInfo({
        ...userInfo,
        file: event.target.files[0],
        filepreview:URL.createObjectURL(event.target.files[0]),
        });
        renFile = companyID+"-"+event.target.files[0].name;
       // alert(event.target.files[0].name);
      // alert(renFile);
    };
    //const id = 'Percy';
   // const user = {companyID: companyID};
    const [isSucces, setSuccess] = useState(null);
    const submit = async () =>{
        const formdata = new FormData();
       // alert(renFile);
         if (renFile === '') {
            alert('No Image selected');
            return false;
         }
        //formdata.append('avatar', companyID);
        formdata.append('avatar', userInfo.file, renFile);

   axios.post(url+"/imageupload", formdata, {
    headers: { "Content-Type": "multipart/form-data"},
    'accept': 'application/json',
     companyID: companyID,
})
        .then(res => { // then print response status
            console.warn(res.data);
         //   alert(res.data);
            if(res.data.success === 1){
                setSuccess("Image upload successfully");
                alert(res.data);



            }


        })


// updat image sql database

const data = {
    companyID: companyID,
    imageID: renFile,
}
fetch(url+'/imageSql', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify( data )
         // We convert the React state to JSON and send it as the POST body
        // data: JSON.stringify(user,user.ame)
         }).then(function(response) {
          return response.text()
       }).then(function(text) {

       console.log(text);
        alert(text);
       });

    };


    return(
        <div className="container mr-60">
            <h3 className="text-white">React Image Upload And Preview Using Node Js - <span> Image Upload</span> </h3>

            <div className="formdesign">
                {isSucces !== null ? <h4> {isSucces} </h4> :null }
                <div className="form-row">
                    <label className="text-white">Select Image :</label>
                    <input type="file" className="form-control" name="upload_file" onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <button type="submit" className="btn btn-dark" onClick={()=>submit()}> Upload </button>
                </div>
            </div>

            {userInfo.filepreview !== null ?
                <img className="previewimg"  src={userInfo.filepreview} alt="UploadImage" />
            : null}
        </div>
    )
}
export default App;
