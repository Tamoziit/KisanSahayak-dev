//import toast from "react-hot-toast";

export const uploadBlobToCloudinary = async (imageUrl) => {
    const url = "https://api.cloudinary.com/v1_1/dhjyjsyvt/image/upload";
    const uploadPreset = "KisanSahayak"; 

    const formData = new FormData();
    formData.append("upload_preset", uploadPreset);

    try {
        // Fetch the Blob data from the localhost or Blob URL
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        // Append the Blob to formData
        formData.append("file", blob);

        // Upload to Cloudinary
        const res = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        
        // Access the correct property for the URL
        return data.secure_url;
    } catch (error) {
        console.error("Error uploading image: ", error);
        //toast.error("Couldn't upload image");
        return null;
    }
};
