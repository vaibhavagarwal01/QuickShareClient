import axios from "axios";
import { useState } from "react";
import api from '../services/api';
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

export const FileUpload = () => {
	const [file, setFile] = useState(null);
	const [uplodMessage, setUploadMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	

	const handleUpload = async () => {
		setLoading(true);
		if (!file) {
			setUploadMessage("Please select a file to upload.");
			return;
		}

		const formData = new FormData();
		formData.append("file", file);

		try {
			await api.file.upload(formData);
			setUploadMessage("Upload successful!");
			alert("Upload successfull!!");
			navigate('/listFile');
		} catch (error) {
			console.error("Error uploading file:", error);
			setUploadMessage(
				"Upload failed: " + (error.response?.data?.message || error.message)
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-slate-300 h-screen flex justify-center">
			<div className="flex flex-col justify-center">
				<div className="bg-white rounded-lg w-80 p-2 px-4 h-max text-center">
					<h2 className="text-xl font-bold">Upload file</h2>
					{/* <input type="file" onChange={handleFileChange} /> */}
					{/* Styled File Input */}
					{/* File Input with Label */}
					<label className="block w-full cursor-pointer bg-gray-200 text-gray-700 rounded-lg border 
						border-gray-300 p-2 text-sm font-medium hover:bg-gray-300 mt-3">
						{/* {file ? file : "Choose a file"} */}
						
						<input
							type="file"
							onChange={handleFileChange}
						/>
					</label>
					{
						loading ? (
							<div>
								<Spinner aria-label="Default status example" />
								</div>

						) : (
							<button
								onClick={handleUpload}
								className="w-2/3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
									focus:ring-gray-300 font-medium rounded-lg 
									text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer mt-3"
							>
								Upload
							</button>
					)}
					
					{uplodMessage && <p>{uplodMessage}</p>}
				</div>
			</div>
		</div>
	);
};
