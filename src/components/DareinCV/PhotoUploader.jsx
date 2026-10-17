import React, { useState } from "react";

export function PhotoUploader({ labelText, width, height, className = "" }) {
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`photo-uploader-box ${className}`}
      style={{ width: width || "100%", height: height || "100%" }}
    >
      <label className="photo-uploader-label">
        <input
          type="file"
          accept="image/*"
          className="photo-file-input"
          onChange={handleFileChange}
        />
        {imageSrc ? (
          <img src={imageSrc} alt="Uploaded" className="photo-preview-img" />
        ) : (
          <span className="photo-uploader-text">{labelText}</span>
        )}
      </label>
    </div>
  );
}