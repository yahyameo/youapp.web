"use client";

import React, { useEffect, useState } from 'react';
import { Profile } from '../profile/interfaces/Profile';
import axios from 'axios';
import { URLs, baseURL } from '../utils/api.urls';
import { getAuthtoken } from '../utils/appUtils';
import { ArrowLeft, MessageCircle } from '@geist-ui/icons';
import Link from 'next/link';


const UsersList: React.FC = () => {
    // Example initial user list
    const [users, setUsers] = useState<Profile[]>([]);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(URLs.getUsers, {
                    headers: {
                        Authorization: `Bearer ${getAuthtoken()}`,
                    },
                });
                setUsers(response.data["data"]);
            } catch (error) {
            }
        };
        fetchProfileData();
    }, []);


    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="max-w-md w-full px-8 py-6 bg-white shadow-lg rounded-lg">
            <div className="mb-4">
                    <h2> <Link className='pull-left' href="/profile"><ArrowLeft></ArrowLeft></Link>Back</h2>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className='w-100'>
                        <ul className='users-list'>
                            {users && users.map(user => (
                                <li style={{clear:"both"}} key={user.userId}>
                                    <div className='w-100'>
                                        <img
                                            className="rounded-full object-cover avatar-user pull-left"
                                            src={user?.picture ? baseURL + user?.picture : "../avatar.png"}
                                        />
                                        <span style={{verticalAlign: "-webkit-baseline-middle"}}>{user.name || user.email}</span>
                                        <Link href={"/users/chat?id="+user.userId} className='pull-right'><MessageCircle></MessageCircle></Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default UsersList;
