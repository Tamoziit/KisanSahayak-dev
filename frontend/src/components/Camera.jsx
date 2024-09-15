/* eslint-disable no-unused-vars */
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import useGetPredictions from "../hooks/useGetPredictions";
import Predictions from "../components/Predictions";

const videoConstraints = {
	width: 540,
	facingMode: "environment",
};

const Camera = () => {
	const webcamRef = useRef(null);
	const [url, setUrl] = useState(null);
	const [uploading, setUpLoading] = useState(false);
	const { loading, getPredictions } = useGetPredictions();
	const [data, setData] = useState(null);
	const [captureData, setCaptureData] = useState([]);

	const handleImageUpload = (imgUrl) => {
		captureData.push(imgUrl);
		console.log(captureData);
	}

	const capturePhoto = useCallback(async () => {
		const imageSrc = await webcamRef.current.getScreenshot();

		setUpLoading(true);
		const publicUrl = await uploadToCloudinary(imageSrc);
		setUrl(publicUrl);
		setUpLoading(false);

		console.dir({ publicUrl });
		handleImageUpload(publicUrl);
	}, [webcamRef]);

	const onUserMedia = (e) => {
		console.log(e);
	};

	const handlePredictions = async () => {
		const predData = await getPredictions(captureData);
		setData(predData);
	}

	console.log(data);

	return (
		<>
			<div className="upload-body" style={{ display: "flex", flexDirection: "column" }}>
				<Webcam
					ref={webcamRef}
					audio={false}
					screenshotFormat="image/png"
					videoConstraints={videoConstraints}
					onUserMedia={onUserMedia}
					mirrored={true}
					style={{ position: 'relative', zIndex: 1 }}
				/>
				<br />
				<div>
					<button onClick={capturePhoto} disabled={uploading} className="primary-button-new">
						{uploading ? "Uploading..." : "Capture"}
					</button>
					<button onClick={() => {
						setUrl(null);
						setData(null);
					}} className="primary-button-new">Refresh</button>
				</div>

				<section >
					{captureData.map((data, _idx) => (
						<div className="uploaded-row" key={_idx}>
							<div className="content">
								{url && (
									<div className="h-[100px] w-[150px]">
										<img src={data} alt="Screenshot" className="w-full p-3" />
									</div>
								)}
							</div>
						</div>
					))}
					{captureData.length === 3 && !data && <button className="primary-button-new" onClick={handlePredictions} disabled={loading}>Predict</button>}
				</section>

				{data && <div>
					<Predictions data={data} />
				</div>}
			</div>
		</>
	)
}
export default Camera;