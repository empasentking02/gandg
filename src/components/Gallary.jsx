import React, { useCallback, useState } from "react";
import { X, Upload, Copy, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useDocuments } from "../hooks/useDocuments";
import useUploadImage from "../hooks/useUploadImage";

const Gallery = ({ setShowGallery }) => {
    const [file, setFile] = useState(null);
    const { createDocument, data } = useDocuments("Gallery");
    const { uploadImage } = useUploadImage();
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setFile(file);
        }
    }, []);

    const handleChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
        }
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        try {
            if (!file) {
                return toast.error("Select an image");
            }
            const imageUrl = await uploadImage(file, "Gallery");
            const imageData = {
                url: imageUrl,
                createdAt: new Date(),
            };
            await createDocument(imageData, "Gallery");
            toast.success("Image uploaded successfully");
            setFile(null);
        } catch (err) {
            toast.error("Some error");
            console.log(err);
        }
    };

    return (
        <div className="bg-gray-100 p-4 rounded-md shadow-md overflow-y-scroll  w-[86vw] h-[86vh]">
            <div className="flex justify-between items-center w-full border-b-2 pb-3 border-gray-300">
                <p className="text-4xl text-gray-500 font-semibold">Add Media</p>
                <X
                    className="text-gray-600 cursor-pointer"
                    onClick={() => setShowGallery(false)}
                />
            </div>

            {/* image input */}
            <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-gray-300 bg-white rounded-lg p-6 mt-4 text-center hover:border-blue-500 transition-colors"
            >
                <input
                    type="file"
                    onChange={handleChange}
                    id="image-upload"
                    className="hidden"
                    accept="image/jpeg,image/png"
                />
                <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center gap-2 cursor-pointer"
                >
                    <Upload className="w-12 h-12 text-gray-400" />
                    <div className="bg-white">
                        <p className="text-lg font-medium text-gray-700">
                            Drop an image here, or click to upload
                        </p>
                        {file && <p className="text-slate-800">{file.name} </p>}
                        <p className="text-sm text-gray-500">Supports JPEG and PNG</p>


                    </div>
                </label>
            </div>

            <div className="flex justify-center">
                <button className="border-black border mx-auto text-blue-600 font-semibold text-xl rounded-lg px-4 py-1 mt-2 " disabled={file ? false : true} onClick={handleFileUpload}>Upload</button>

            </div>
            {/* image viewer */}
            {data && (
                <div className="grid grid-cols-1  xl:grid-cols-5 lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-2  gap-4 my-7">
                    {data.map((file) => {
                        return <ImageCard file={file} />;
                    })}
                </div>
            )}
        </div>
    );
};

export default Gallery;

const ImageCard = ({ file }) => {
    const [showOption, setShowOption] = useState(false);
    const { deleteDocument } = useDocuments("Gallery");

    const handleCopy = (link) => {
        navigator.clipboard.writeText(link).then(() => {
            alert("copied");
        });
    };
    return (
        <div
            className="relative border-2  border-gray-400 shadow-xl w-48 h-48"
            onMouseEnter={() => {
                setShowOption(true);
            }}
            onMouseLeave={() => {
                setShowOption(false);
            }}
        >
            <img
                src={file.url}
                alt="gallery Image"
                className="w-full h-full object-cover"
            />
            <div
                className={`${showOption ? "flex" : "hidden pointer-events-none"
                    } absolute  bottom-1 ml-2  items-center  justify-between px-7 text-white h-10 bg-black/60  rounded-lg  w-[90%]`}
            >
                <Copy className="cursor-pointer" onClick={() => handleCopy(file.url)} />
                <Trash2
                    className="cursor-pointer"
                    onClick={() => {
                        deleteDocument(file.id, 'Gallery');
                    }}
                />
            </div>
        </div>
    );
};
