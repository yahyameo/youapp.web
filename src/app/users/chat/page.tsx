"use client";

import React, { useState, useEffect } from 'react';
import ChatList from './ChatList';
import MessageInput from './MessageInput';
import Link from 'next/link';
import { ArrowLeft } from '@geist-ui/icons';
import io from 'socket.io-client';
import { getAuthtoken, getUserId } from '@/app/utils/appUtils';
import { connectToWebSocket } from '@/app/utils/socket';
import { MessageProps } from './Message';
import { useSearchParams } from 'next/navigation';
import { Profile } from '@/app/profile/interfaces/Profile';
import axios from 'axios';
import { URLs, baseURL } from '@/app/utils/api.urls';

const Chat: React.FC = () => {

    const [chatMessages, setChatMessages] = useState<MessageProps[]>([]);
    const [profileData, setProfileData] = useState<Profile>();
    const token = getAuthtoken();
    const searchParams = useSearchParams();
    const userId = searchParams.get('id');

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(URLs.getUserById + "/" + userId, {
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


    useEffect(() => {
        const socket = connectToWebSocket(token);
        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
            // Emit an authentication event to the server
            socket.emit('authenticate', { token });
        });

        socket.on('authenticated', () => {
            console.log('Authenticated with WebSocket server');
            socket.emit("joinRoom", getUserId());
        });

        socket.on('unauthorized', (error: any) => {
            console.error('Failed to authenticate:', error.message);
        });

        socket.on('onNewMessage', (data) => {
            console.log(chatMessages);
            setChatMessages((prevMessages) => [...prevMessages, { date: data.date, sender: data.userId, content: data.message, isCurrentUser: false }]);
            console.log('Received message from server:', data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);


    const onMessageSend = (message: string) => {
        const socket = connectToWebSocket(token);
        setChatMessages([...chatMessages, { date: new Date().toString(), sender: getUserId(), content: message, isCurrentUser: true }]);
        socket.emit('sendMessageToRoom', { message: message, userId: userId });
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div style={{ minHeight: "500px",position:"relative" }} className="max-w-md w-full px-8 py-6 bg-white shadow-lg rounded-lg">
                <div className="mb-4">
                    <h2> <Link className='pull-left' href="/users"><ArrowLeft></ArrowLeft></Link>
                        <img
                            className="rounded-full object-cover avatar-user pull-left"
                            src={profileData?.picture ? baseURL + profileData?.picture : "../avatar.png"}
                        />
                        <span>{profileData?.name || profileData?.email}</span></h2>
                </div>
                <div style={{clear:"both",overflow:"auto",height:"450px"}} className="flex flex-col items-center justify-center">
                    <div className="chat-container w-100 mr-2">
                        <ChatList messages={chatMessages} />

                    </div>
                </div>
               <div className='w-100' style={{position:"absolute",bottom:0}}>
               <MessageInput onMessageSend={onMessageSend} />
               </div>
            </div></div>
    );
};

export default Chat;
