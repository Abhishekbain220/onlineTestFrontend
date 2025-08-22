import React, { use, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  let navigate=useNavigate()

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage(""); // reset message on new file selection
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please choose an Excel file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post("/mcq/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(`✅ File uploaded successfully! Saved ${data.count} questions.`);
      setFile(null);
      navigate("/test"); // Redirect to test page after successful upload
    } catch (error) {
      setMessage("❌ Upload failed. Please check your file and try again.");
    }
  };

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center">Upload Questions</h2>
        <p className="text-gray-600 text-sm mb-6 text-center">
          Please upload an Excel file (<b>.xlsx</b> or <b>.xls</b>) containing the questions.
        </p>

        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="block w-full mb-4 border border-gray-300 rounded px-2 py-2 text-sm cursor-pointer"
        />

        {file && (
          <p className="text-sm text-gray-700 mb-4">
            Selected file: <span className="font-medium">{file.name}</span>
          </p>
        )}

        <button
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded w-full transition"
        >
          {file ? "Upload File" : "Choose a File First"}
        </button>

        {message && (
          <p className={`mt-4 text-center text-sm ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Upload;
