import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from "react-icons/fi";
import { uploadResume } from "../../../../../services/operations/settingsAPI"; // Ensure this path is correct

const Upload = ({ name, label, register, setValue, errors, editApplicant = null }) => {
  const { user } = useSelector((state) => state.user);
  const { jobApplicant, applicantReal } = useSelector((state) => state.jobApplicant);
  const [selectedFile, setSelectedFile] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [previewSrc, setPreviewSrc] = useState(editApplicant ? editApplicant : "");

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
      setPreviewSrc(null); // Hide the cloud URL once the new file is dropped
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSrc(reader.result);
    };
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] }, // Restrict to PDF files
    onDrop,
  });

  useEffect(() => {
    register(name, { required: true });
  }, [register]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue]);

  // Function to upload the file to the backend
  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("resume", selectedFile); // Correct key based on your backend

    try {
      await dispatch(uploadResume(token, formData));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.error("ERROR MESSAGE - ", error.message);
    }
  };

  // Function to handle file removal
  const handleFileRemove = () => {
    setPreviewSrc(null);
    setSelectedFile(null);
    setValue(name, null); // Remove the uploaded file
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>

      {/* Show the file name and delete button if the applicant has uploaded a file */}
      {editApplicant ? (
        <div className="flex flex-col p-6">
          <p className="text-richblack-200">Uploaded File: {editApplicant}</p>
          <button
            type="button"
            onClick={handleFileRemove}
            className="mt-3 text-richblack-400 underline"
          >
            Remove and Upload New File
          </button>
        </div>
      ) : (
        // Show drag-and-drop interface if no file has been uploaded
        <div className={`${isDragActive ? "bg-richblack-600" : "bg-richblack-700"} flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}>
          {previewSrc ? (
            <div className="flex w-full flex-col p-6">
              <p className="text-richblack-200">{selectedFile?.name}</p>
              <button
                type="button"
                onClick={() => {
                  setPreviewSrc(null);
                  setSelectedFile(null);
                  setValue(name, null);
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex w-full flex-col items-center p-6" {...getRootProps()}>
              <input ref={inputRef} {...getInputProps()} />
              <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
                <FiUploadCloud className="text-2xl text-yellow-50" />
              </div>
              <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                Drag and drop a file, or click to <span className="font-semibold text-yellow-50">Browse</span> a file
              </p>
              <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
                <li>PDF format only</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}

      {/* Upload Button */}
      {!editApplicant && (
        <button type="button" onClick={handleFileUpload} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md">
          Upload File
        </button>
      )}
    </div>
  );
};

export default Upload;
