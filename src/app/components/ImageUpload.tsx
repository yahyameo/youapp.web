import React, { FC, useRef, useState } from 'react';
import { URLs } from '../utils/api.urls';
import { ApiResponse } from '../utils/api.response';
import { showToast, showToastError } from './Toaster';

const ImageUpload: FC<{ onUpload(url: string): void }> = ({ onUpload }) => {
    const fileInputRef = useRef<any>(null);

    const handleFileChange = (event: any) => {
        let file = event.target.files[0];
        if (file) handleSubmit(file);
    };

    const handleSubmit = async (file:any) => {

        if (!file) {
            showToastError('Please select a file.');
            return;
        }

        // Create FormData object
        const formData = new FormData();
        formData.append('file', file);

        // Send formData to your API
        try {
            const authToken = localStorage.getItem('authToken');
            const response = await fetch(URLs.uploadProfilePicture, {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            let data = await response.json() as ApiResponse;
            if (response.ok) {
                onUpload(data.data);
                showToast(data.message);
            } else {
                showToastError(data.message);
            }
        } catch (error) {
            showToastError('An error occurred while uploading the image.');
        }
    };
    const handleButtonClick = () => {
        fileInputRef?.current?.click();
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input ref={fileInputRef} hidden type="file" accept="image/*" onChange={handleFileChange} />
                <button className="w-full bg-blue-500 text-white rounded-md" type='button' onClick={handleButtonClick}>Change picture</button>
            </form>
        </div>
    );
};

export default ImageUpload;
