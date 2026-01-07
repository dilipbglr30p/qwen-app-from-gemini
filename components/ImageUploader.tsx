import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (url: string) => void;
  selectedImage: string | null;
  onClear: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, selectedImage, onClear }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    // In a real app, upload to S3/Cloudinary here.
    // For this boilerplate, we use a local object URL to simulate the upload.
    setIsUploading(true);
    
    // Simulate network delay
    setTimeout(() => {
      const objectUrl = URL.createObjectURL(file);
      onImageSelect(objectUrl);
      setIsUploading(false);
    }, 1500);
  };

  if (selectedImage) {
    return (
      <div className="relative group rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white aspect-[4/3] flex items-center justify-center">
        <img 
          src={selectedImage} 
          alt="Selected source" 
          className="w-full h-full object-contain"
        />
        <button
          onClick={onClear}
          className="absolute top-3 right-3 p-2 bg-white/90 text-red-600 rounded-full shadow-lg hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
          title="Remove image"
        >
          <X size={20} />
        </button>
        <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
          Source Image
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative flex flex-col items-center justify-center w-full aspect-[4/3] 
        rounded-xl border-2 border-dashed transition-all cursor-pointer
        ${isDragging 
          ? 'border-indigo-500 bg-indigo-50' 
          : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
        }
      `}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileSelect}
      />

      {isUploading ? (
        <div className="flex flex-col items-center animate-pulse">
          <Loader2 size={40} className="text-indigo-600 animate-spin mb-3" />
          <p className="text-sm font-medium text-gray-500">Uploading to secure storage...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center p-6">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
            <Upload size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Upload Product Image</h3>
          <p className="text-sm text-gray-500 max-w-xs">
            Drag & drop or click to upload.
            <br />
            Supports JPG, PNG, WEBP.
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;