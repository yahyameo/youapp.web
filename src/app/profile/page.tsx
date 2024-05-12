"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URLs, baseURL } from '../utils/api.urls';
import { formatDate } from "../utils/formate.date";
import { Edit } from '@geist-ui/icons';
import Link from 'next/link';
import { Profile } from './interfaces/Profile';
import { getAuthtoken } from '../utils/appUtils';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const UserProfile: React.FC = () => {
    const [profileData, setProfileData] = useState<Profile>();
    const router = useRouter();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(URLs.getProfile, {
                    headers: {
                        Authorization: `Bearer ${getAuthtoken()}`,
                    },
                });
                setProfileData(response.data["data"]);
            } catch (error) {
            }
        };

        fetchProfileData();
    }, []);

    const handleLogout = () => {
        Cookies.remove("authToken");
        router.push('/', { scroll: false });
    }
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="max-w-md w-full px-8 py-6 bg-white shadow-lg rounded-lg">
                <Link className="w-32 h-32 rounded-full object-cover" href="/users"> Chat</Link>
                <button onClick={handleLogout} className='p-1 bg-blue-500 text-white rounded-md pull-right'> Log out</button>
                <div className="flex flex-col items-center justify-center">
                    <div className="mb-4">
                        <img
                            className="w-32 h-32 rounded-full object-cover"
                            src={profileData?.picture ? baseURL + profileData?.picture : "../avatar.png"}
                        />
                    </div>
                    <div className="mb-2 text-center">
                        <h2 className="text-xl font-semibold">{profileData?.name}</h2>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h4 style={{ width: "100%" }} className="card-title"><strong>About</strong>
                            <Link href='/profile/edit' style={{ float: "right" }}><Edit></Edit></Link>
                        </h4>
                        <p><label>Birthday</label>: <span className="text-gray-600">{formatDate(profileData?.birthday)}</span></p>
                        <p><label>Horoscope</label>: <span className="text-gray-600">{profileData?.horoscope}</span></p>
                        <p><label>Width</label>: <span className="text-gray-600">{profileData?.width}</span></p>
                        <p><label>Height</label>: <span className="text-gray-600">{profileData?.height}</span></p>
                        <p><label>Zodiac</label>: <span className="text-gray-600">{profileData?.zodiac} </span></p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title"><strong>Interests</strong></h4>
                        <div className="list-disc list-inside">
                            {profileData?.interests && profileData?.interests.map((interest, index) => (
                                <label className='badge mr-1' key={index}>{interest}</label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
