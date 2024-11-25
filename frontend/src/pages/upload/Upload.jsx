import { useState, useRef } from "react";
import './Upload.css';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { uploadBlobToCloudinary } from "../../utils/uploadBlobToCloudinary.js";
import useGetPredictions from "../../hooks/useGetPredictions.js";
import Predictions from "../../components/Predictions.jsx";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";
import Navbar from "../../components/navbars/Navbar-actions.jsx";
import Suggestions from "../../components/Suggestions.jsx";

function Uploader() {
	const inputRef = useRef(null);
	const [images, setImages] = useState([]); // To store blob URLs
	const [uploadData, setUploadData] = useState([]); // To store Cloudinary URLs
	const [uploading, setUploading] = useState(false);
	const [predicting, setPredicting] = useState(false);
	const [predictedData, setPredictedDta] = useState(null);
	const { getPredictions } = useGetPredictions();

	const handleImageUpload = () => {
		inputRef.current?.click();
	};

	const handleImageChange = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			const img = URL.createObjectURL(file);

			setImages((prevImages) => [...prevImages, img]);
		}
	};

	const handleUploadToCloudinary = async () => {
		setUploading(true);
		try {
			const uploadPromises = images.map(async (imageBlob) => {
				const cloudinaryUrl = await uploadBlobToCloudinary(imageBlob);
				return cloudinaryUrl;
			});

			const cloudinaryUrls = await Promise.all(uploadPromises);
			setUploadData((prevData) => [...prevData, ...cloudinaryUrls]);
		} catch (error) {
			if (error instanceof Error) {
				console.log("Error in uploading image", error.message);
				toast.error(error.message);
			} else {
				console.log("An unknown error occurred");
			}
		} finally {
			setUploading(false);
		}
	};

	const handleDeletion = (data) => {
		setImages(images.filter((img) => img !== data));
		setUploadData(uploadData.filter((url) => url !== data));
	};

	const handlePredictions = async () => {
		try {
			setPredicting(true);
			const predData = await getPredictions(uploadData);
			setPredictedDta(predData);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setPredicting(false);
		}
	};

	console.log("Images:", images);
	console.log("Upload Data:", uploadData);
	console.log(predictedData);

	return (
		<>
			<Navbar />
			<main className="upload-body">

				<div className="w-full flex flex-1 gap-3 px-4">
					<div className="w-full h-full flex flex-col items-center justify-center px-10">
						<div
							onClick={handleImageUpload}
							className="w-full h-auto flex items-center justify-center cursor-pointer border-2 border-dashed border-blue-600 p-4"
						>
							<div className="flex flex-col items-center gap-2">
								<MdCloudUpload className="h-[250px] w-[350px] text-blue-500" />

								{images.length === 0 && uploadData.length === 0 && <span className="text-gray-700">No files chosen</span>}
								{uploadData.length !== 3 && images.length !== 0 && <span className="text-gray-700">Choose 3 files in total to upload</span>}
							</div>

							<input
								type="file"
								accept="image/*"
								ref={inputRef}
								className="hidden"
								onChange={handleImageChange}
							/>
						</div>

						<div className="flex gap-2 w-full items-center justify-center">
							{images.map((image, idx) => (
								<div className="uploaded-row max-h-full" key={idx}>
									<div className="content">
										<span>
											<MdDelete onClick={() => handleDeletion(image)} />
										</span>
									</div>
									<img src={image} width={150} height={150} alt="image" />
								</div>
							))}
						</div>

						<div className="flex items-center justify-center w-full">
							{images.length === 3 && uploadData.length === 0 && (
								<button
									onClick={handleUploadToCloudinary}
									disabled={uploading}
									className="primary-button-new w-3/4"
								>
									{uploading ? <Spinner /> : "Upload"}
								</button>
							)}

							{uploadData.length === 3 && !predictedData && (
								<button
									className="primary-button-new w-full"
									onClick={handlePredictions}
									disabled={predicting}
								>
									{predicting ? <Spinner /> : "Predict"}
								</button>
							)}
						</div>
					</div>

					<div className="flex items-center justify-center w-full p-3">
						{predictedData ? (<Predictions data={predictedData} />) : (<img src="gifend.gif" alt="loading img" className="w-1/2" />)}
					</div>
				</div>

				{predictedData && (
					<div className="flex justify-center w-full px-6 mt-6 mb-3">
						<Suggestions keys={predictedData.pesticides} />
					</div>
				)}
			</main>
		</>
	);
}

export default Uploader;