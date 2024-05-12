"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URLs, baseURL } from '../../utils/api.urls';
import { Plus, Delete, ArrowLeft } from '@geist-ui/icons';
import Link from 'next/link'
import { ApiResponse } from '@/app/utils/api.response';
import Toaster, { showToast, showToastError } from '@/app/components/Toaster';
import ImageUpload from '@/app/components/ImageUpload';
import { Profile } from '../interfaces/Profile';
import { getAuthtoken } from '@/app/utils/appUtils';


const UserProfile: React.FC = () => {
  const [profileData, setProfileData] = useState<Profile>();
  const [interest, setInterest] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
 
        const response = await axios.get(URLs.getProfile, {
          headers: {
            Authorization: `Bearer ${getAuthtoken()}`,
          },
        });
        let data = response.data["data"];
        if(data["birthday"]) data["birthday"] = data["birthday"].split("T")[0];
        setProfileData(data);
      } catch (error) {
        showToastError('Error fetching profile data');
      }
    };

    fetchProfileData();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const authToken = getAuthtoken();

      const response = await fetch(URLs.updateProfile, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(profileData),
      });
      if (response.ok) {
        let data = await response.json() as ApiResponse;
        if (!data.success) return showToastError(data.message);
        showToast(data.message);
      } else {
        const data = await response.json();
        showToastError(data.message || 'An error occurred while processing your request');
      }
    } catch (error) {
      showToastError('An error occurred');
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      addInterest();
    }
  };
  const addInterest = () => {
    if (!interest) return;
    const interests: string[] | undefined = profileData?.interests;
    interests?.push(interest)
    setProfileData(prevData => ({
      ...prevData,
      interests: interests
    }));
    setInterest("");
  }
  const onUpload = (picture: string) => {
    setProfileData(prevData => ({
      ...prevData,
      picture: picture
    }));
  }
  return (
    (profileData && <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Toaster />
      <div className="max-w-md w-full px-8 py-6 bg-white shadow-lg rounded-lg">

        <div className="mb-4">
          <h2> <Link className='pull-left' href="/"><ArrowLeft></ArrowLeft></Link> <span>Edit Profile</span></h2>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="mb-2 text-center">
            <div className="mb-4">
              <img
                className="w-32 h-32 rounded-full object-cover"
                src={profileData.picture ? baseURL + profileData.picture : "../avatar.png"}
              />
              <ImageUpload onUpload={onUpload}></ImageUpload>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div>
              <label className='block text-sm font-medium text-gray-700'>Name</label>
              <input id="name" type="text" onChange={(e) => {
                setProfileData(prevData => ({
                  ...prevData,
                  name: e.target.value
                }));
              }} value={profileData?.name || ''} className="mt-1 p-2 border rounded-md w-full" />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Birthday</label>
              <input id="birthday" type="date" onChange={(e) => {
                setProfileData(prevData => ({
                  ...prevData,
                  birthday: e.target.value
                }));
              }} value={profileData?.birthday || ''} className="mt-1 p-2 border rounded-md w-full" />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Horoscope</label>
              <input id="Horoscope" type="text" onChange={(e) => {
                setProfileData(prevData => ({
                  ...prevData,
                  horoscope: e.target.value
                }));
              }} value={profileData?.horoscope || ''} className="mt-1 p-2 border rounded-md w-full" />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Width</label>
              <input id="width" type="number" onChange={(e) => {
                setProfileData(prevData => ({
                  ...prevData,
                  width: parseFloat(e.target.value)
                }));
              }} value={profileData?.width} className="mt-1 p-2 border rounded-md w-full" />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Height</label>
              <input id="height" type="number" onChange={(e) => {
                setProfileData(prevData => ({
                  ...prevData,
                  height: parseFloat(e.target.value)
                }));
              }} value={profileData?.height} className="mt-1 p-2 border rounded-md w-full" />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Zodiac</label>
              <input id="zodiac" type="text" onChange={(e) => {
                setProfileData(prevData => ({
                  ...prevData,
                  zodiac: e.target.value
                }));
              }} value={profileData?.zodiac || ''} className="mt-1 p-2 border rounded-md w-full" />
            </div>

          </div>
        </div>
        <div className="card">
          <label className="card-title">Interests</label>
          <div className="card-body">
            <input placeholder='Enter interest' id="interest" type="text"
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setInterest(e.target.value);
              }} value={interest || ''} className="mt-1 p-2 border rounded-md" />
            <button onClick={addInterest}><Plus></Plus></button>
            <div className="list-disc list-inside mt-4">
              {profileData?.interests && profileData.interests.map((interest, index) => (
                <div className='badge mt-1 mr-1 pull-left w-fit' key={index}>{interest}
                  <Delete onClick={() => {
                    let interests: string[] | undefined = profileData?.interests;
                    interests = interests?.filter(x => x != interest);
                    setProfileData(prevData => ({
                      ...prevData,
                      interests: interests
                    }));
                  }} className='pull-right'></Delete>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button onClick={handleUpdateProfile} type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md mt-2">Save Changes</button>
      </div>
    </div>)
  );
};

export default UserProfile;
