import { useState } from "react";

const useUploadImage = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "gandgimages"); // Ensure this preset exists in Cloudinary

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dt0bqbfol/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Cloudinary Response:", data);

      if (!res.ok) throw new Error(`Cloudinary error: ${data.error?.message || res.statusText}`);
    //   return data.secure_url;
      setImageUrl(data.secure_url);
      return data.secure_url; // Return the image URL after successful upload
    } catch (error) {
      console.error("Upload Error:", error);
      return null;
    }
  };

  return { uploadImage, imageUrl };
};

export default useUploadImage;
