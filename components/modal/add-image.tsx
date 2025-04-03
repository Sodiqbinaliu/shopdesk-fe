"use client";

import { useState, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  addImages,
  removeImage,
  setImages,
} from "@/redux/features/productImage/productImage.slice";
import { useCreateProductImageMutation } from "@/redux/features/productImage/productImage.api";
import { useStore } from "@/store/useStore";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  itemName: string;
  onSave: (images: { url: string; filename: string }[]) => void;
  onCancel: () => void;
  isOpen: boolean;
  product_id: string;
}

export default function ImageUploader({
  itemName,
  onSave,
  onCancel,
  isOpen,
  product_id,
}: ImageUploaderProps) {
  const [error, setError] = useState<string | null>(null);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const productImages = useSelector(
    (state: RootState) => state.productImages.images
  );
  const dispatch = useDispatch();
  const organizationId = useStore((state) => state.organizationId);
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const validFormats = ["image/jpeg", "image/png"];
    const files = Array.from(event.target.files);

    const invalidFiles = files.filter(
      (file) => !validFormats.includes(file.type)
    );
    if (invalidFiles.length > 0) {
      setError("Only JPG/PNG images are supported");
      return;
    }

    setUploadFiles((prev) => [...prev, ...files]);

    const newImages = files.map((file) => ({
      filename: file.name,
      url: URL.createObjectURL(file),
    }));
    dispatch(addImages(newImages));

    setError(null);
  };

  const [createProductImage, { isLoading }] = useCreateProductImageMutation();
  const handleSave = async () => {
    if (uploadFiles.length === 0) return;

    try {
      const formData = new FormData();
      formData.append("organization_id", organizationId);
      uploadFiles.forEach((file) => formData.append("product_image", file));

      const uploadImages = await createProductImage({
        product_id,
        formData,
      }).unwrap();
      const newProductImages = uploadImages.data.photos.map((image) => ({
        filename: image.filename,
        url: `https://api.timbu.cloud/images/${image.url}`,
        model_id: image.model_id,
        position: image.position,
      }));
      dispatch(setImages(newProductImages));
      toast.success("Image uploaded successfully");
      if (productImages) onSave(productImages);

      setUploadFiles([]);
    } catch (error) {
      toast.error("Could Not Upload Image");
    }
  };

  const handleRemoveImage = (filename: string) => {
    dispatch(removeImage(filename));

    setUploadFiles((prev) => prev.filter((file) => file.name !== filename));
    if (fileInputRef.current) fileInputRef.current.value = "";

    const imageToRemove = productImages?.find(
      (img) => img.filename === filename
    );
    if (imageToRemove?.url.startsWith("blob:")) {
      URL.revokeObjectURL(imageToRemove.url);
    }
  };

  return (
    isOpen && (
      <>
        <div className="lg:fixed lg:inset-0 lg:bg-black lg:opacity-50 z-40"></div>

        <div className="lg:fixed lg:inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full p-4 md:p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2 items-center">
                <Image
                  src="/modal-images/image-icon.svg"
                  alt="image icon"
                  width={48}
                  height={48}
                  className="w-8 h-8 md:w-12 md:h-12"
                />
                <h2 className="text-sm md:text-xl font-circular-bold">
                  Add Stock Images
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={onCancel}
                className="p-[9px] border border-[#1B1B1B] rounded-[9px] cursor-pointer hover:bg-[#D0D0D0]"
              >
                <FaTimes />
              </button>
            </div>

            {/* Item Name */}
            <div className="mb-4">
              <p className="text-gray-600 mb-1">Item Name</p>
              <h3 className="text-lg font-medium">{itemName}</h3>
            </div>

            {/* Image Upload Section - Empty State or Images Grid */}

            <div className="w-full mb-6">
              {productImages?.length === 0 ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-56 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                >
                  <div className="mb-2">
                    <Image
                      src="/icons/image-plus.svg"
                      alt="Upload image"
                      width={48}
                      height={48}
                    />
                  </div>
                  <p className="text-gray-500 mb-1">
                    Upload 1 - 3 images for this product
                  </p>
                  <p className="text-sm text-gray-400">
                    Supported formats: .jpg & .png
                  </p>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    multiple
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                  />
                </div>
              ) : (
                <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4">
                    {/* Display existing images */}
                    {productImages?.map((image, index) => (
                      <div
                        key={index}
                        className="relative border border-dashed border-gray-300 rounded-lg p-1 aspect-square"
                      >
                        <Image
                          src={image.url}
                          alt={`Product image ${index + 1}`}
                          layout="fill"
                          className="rounded-lg object-cover"
                        />
                        <button
                          onClick={() => handleRemoveImage(image.filename)}
                          className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white text-red-500 rounded-full border border-red-500 hover:bg-[#FFCCCF] w-6 h-6 flex items-center justify-center shadow-md"
                        >
                          <FaTimes size={14} />
                        </button>
                      </div>
                    ))}

                    {/* Add more images button (if less than 3) */}
                    {productImages && productImages?.length < 3 && (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 aspect-square"
                      >
                        <span className="text-gray-400 text-4xl">
                          <FaTimes size={12} />
                        </span>

                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          multiple
                          className="hidden"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                        />
                      </div>
                    )}
                  </div>
                  {/* Error Message */}
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-col md:flex-row md:justify-end gap-3 ">
              <button
                onClick={onCancel}
                className="px-4 py-2 border border-[#1B1B1B] rounded-md text-[#2A2A2A] hover:text-white hover:bg-[#2A2A2A]"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 border border-[#1B1B1B] rounded-md text-[#2A2A2A] hover:text-white hover:bg-[#2A2A2A]"
              >
                {isLoading ? (
                  <div className="flex gap-1 items-center">
                    <Loader2 className="animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      </>
    )
  );
}
