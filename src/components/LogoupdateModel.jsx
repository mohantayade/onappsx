import React, { useState } from 'react'
import MyModel from './MyModel'
import axios from 'axios';


function Model({modelFunction,data}) {

   const [showModel, setShowModel]=useState(false)

   const [selectedFile, setSelectedFile] = useState(null); // State for the file
  
   const [uploadStatus, setUploadStatus] = useState(""); // Optional status message
   const [loading, setLoading] = useState(false); // State for loading

   const closeModel = ()=> setShowModel(false)

 
   const mainfunction = ()=>{
  
   }

   const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Set the selected file
  };

  const handleUpload = async (e) => {

    e.preventDefault();
    if (!selectedFile) {
      setUploadStatus("Please select a file first.");
      return;
    }
    setLoading(true); 
    setUploadStatus("");
    const tokens = localStorage.getItem('token')

    const formData = new FormData();

    formData.append("logo", selectedFile); // Add file to formData
    formData.append("appid", data); // Include any other data if necessary
    formData.append("token", tokens);

    console.log(formData);
    
    try {
      const token = localStorage.getItem('token')

      const response = await axios.post("/api/user/logoupload", formData, {
        params: {
          token: token },
        headers: {
          "Content-Type": "multipart/form-data",
        },
        
      });
      console.log("File uploaded successfully:", response.data);
      setUploadStatus("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Failed to upload file.");
    } finally {
      setLoading(false); // Stop loading
    }


  };



   const mainModel = (
    <MyModel closeModel={closeModel} mainfunction={mainfunction} >
        <div className=''>

        <div className="flex  flex-col text-black w-[250px] md:w-[300px] ">
         
            
        <form onSubmit={handleUpload} className="flex flex-col gap-2">
            <input
              type="file"
              onChange={handleFileChange}
              className="my-2 text-center"
            />
            <button
              type="submit"
              className="text-lg font-bold p-3 bg-red-500 rounded-lg text-white grow hover:bg-red-800"
            >
              {loading ? "Uploading..." : `Upload`}
            </button>

            <button
              type="button"
              onClick={closeModel}
              className="text-lg font-bold p-3 bg-blue-500 rounded-lg text-white grow hover:bg-blue-800"
            >
              Close
            </button>
          </form>

          {uploadStatus && (
            <p className="mt-2 text-center text-sm text-gray-700">
              {uploadStatus}
            </p>
          )}

            </div>
        </div>
    </MyModel>
   );
    

  return (
    <div>
      <button 
          onClick={()=> setShowModel(true)}
          className='bg-green-500 text-white  font-semibold  hover:bg-green-800 rounded-lg h-12  px-4 max-w-[180px] mx-2'>Upload Logo</button>
      {showModel && mainModel}
    </div>
  )
}

export default Model
