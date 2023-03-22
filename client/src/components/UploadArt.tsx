import React from "react";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../data";
import upload from "../services/FileUploadService";
import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { SERVER_URL } from '../constants/serverUrl';
import storage from '../utils/Firebase';
import FormAction from "./FormAction";


const UploadArt = () => {

    const [file, setFile] = useState<File>()
    const [percent, setPercent] = useState(0);
    const handleChange = (e: any) => {
        setFile(e.target.files[0]);
    }

    const handleUpload = (e: any): any => {
        e.preventDefault();


        if (!file) {
            alert('Please provide a file');
            return;
        }
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPercent(progress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                //download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log(downloadURL);
                });
            }
        );
        // update progress
    };


    return (
        <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
            <div className=" w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
                <form onSubmit={handleUpload} className="flex justify-start items-center">
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 w-full"
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                    />
                    <button className="focus:outline-none text-white bg-purple-600 hover:bg-purple-700 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 mb-2 ml-2" type="submit" onClick={handleUpload}>Upload</button>
                </form>
            </div>

        </div>
    );
};

export default UploadArt;
