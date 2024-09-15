import { useState, useRef } from "react";
import './Upload.css';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { uploadBlobToCloudinary } from "../../utils/uploadBlobToCloudinary.js";
import useGetPredictions from "../../hooks/useGetPredictions.js";
import Predictions from "../../components/Predictions.jsx";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";

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
		<main className="upload-body">
			<div className="w-1/2 h-full flex flex-col items-center justify-center p-10">
				<div
					onClick={handleImageUpload}
					className="w-full h-auto flex items-center justify-center cursor-pointer border-2 border-dashed border-blue-600 p-4"
				>
					<div className="flex flex-col items-center gap-2">
						<MdCloudUpload className="h-[250px] w-[350px]" />
						<span className="text-gray-700">No files chosen</span>
					</div>

					<input
						type="file"
						accept="image/*"
						ref={inputRef}
						className="hidden"
						onChange={handleImageChange}
					/>
				</div>
			</div>
			<section>
				{images.map((image, idx) => (
					<div className="uploaded-row" key={idx}>
						<div className="content">
							<span>
								<MdDelete onClick={() => handleDeletion(image)} />
							</span>
						</div>
						<img src={image} width={150} height={150} alt="image" />
					</div>
				))}

				{images.length === 3 && uploadData.length === 0 && (
					<button
						onClick={handleUploadToCloudinary}
						disabled={uploading}
						className="primary-button-new"
					>
						{uploading ? <Spinner /> : "Upload"}
					</button>
				)}

				{uploadData.length === 3 && !predictedData && (
					<button
						className="primary-button-new"
						onClick={handlePredictions}
						disabled={predicting}
					>
						{predicting ? <Spinner /> : "Predict"}
					</button>
				)}
			</section>
			
			<div>
				{predictedData && <Predictions data={predictedData} />}
			</div>
		</main>
	);
}

export default Uploader;
