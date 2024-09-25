import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import useGetPredictions from "../hooks/useGetPredictions";
import Predictions from "../components/Predictions";
import Spinner from "../components/Spinner";
import { MdDelete } from 'react-icons/md';

const videoConstraints = {
	width: 540,
	facingMode: "environment",
};

const Camera = () => {
	const webcamRef = useRef(null);
	const [uploading, setUpLoading] = useState(false);
	const { loading, getPredictions } = useGetPredictions();
	const [data, setData] = useState(null);
	const [captureData, setCaptureData] = useState([]);

	const handleImageUpload = (imgUrl) => {
		setCaptureData((prevData) => [...prevData, imgUrl]);
	};

	const capturePhoto = useCallback(async () => {
		const imageSrc = await webcamRef.current.getScreenshot();

		setUpLoading(true);
		const publicUrl = await uploadToCloudinary(imageSrc);
		setUpLoading(false);

		handleImageUpload(publicUrl);
	}, [webcamRef]);

	const onUserMedia = (e) => {
		console.log(e);
	};

	const handleDeletion = (data) => {
		setCaptureData((prevData) => prevData.filter((url) => url !== data));
	};

	const handlePredictions = async () => {
		const predData = await getPredictions(captureData);
		setData(predData);
	}

	return (
		<>
			<div className="w-full flex flex-1 gap-3 px-4">
				<div className="w-full h-full flex flex-col items-center justify-center px-10">
					<div
						className="w-full h-auto flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-blue-600 p-4"
					>
						<Webcam
							ref={webcamRef}
							audio={false}
							screenshotFormat="image/png"
							videoConstraints={videoConstraints}
							onUserMedia={onUserMedia}
							mirrored={true}
							style={{ position: 'relative', zIndex: 1 }}
						/>
						<div className="flex w-full items-center justify-center">
							<button onClick={capturePhoto} disabled={uploading} className="primary-button-new w-1/2">
								{uploading ? <Spinner /> : "Capture"}
							</button>
							<button onClick={() => {
								setCaptureData(null)
							}} className="primary-button-new w-1/2">Refresh</button>
						</div>
					</div>

					<div className="flex gap-2 w-full items-center justify-center">
						{captureData?.map((image, idx) => (
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
						{captureData?.length === 3 && !data && (
							<button
								className="primary-button-new w-full"
								onClick={handlePredictions}
								disabled={loading}
							>
								{loading ? <Spinner /> : "Predict"}
							</button>
						)}
					</div>
				</div>

				<div className="flex items-center justify-center w-full p-3">
					{data ? (<Predictions data={data} />) : (<img src="gifend.gif" alt="loading img" className="w-1/2" />)}
				</div>
			</div>
		</>
	);
}

export default Camera;