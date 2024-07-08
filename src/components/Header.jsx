"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import instalogo from "../../public/logo.svg";
import Link from "next/link";
import Modal from "react-modal";
import { useSession, signOut } from "next-auth/react";
import { app } from "@/firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [postUploading, setPostUploading] = useState(false);
  const { data: session } = useSession();

  const filePickerRef = useRef(null);
  const db = getFirestore(app);

  const addImageToPost = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
      console.log(file);
    }
  };

  // uploading an image to firebase storage

  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();
    }
  }, [selectedFile]);

  const uploadImageToStorage = async () => {
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + selectedFile.name;

    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is" + progress + "% done");
      },
      (error) => {
        console.log(error);
        setImageFileUploading(false);
        setImageFileUrl(null);
        setSelectedFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
  };

  // uploading image and caption to the firestore database

  const handleSubmit = async () => {
    setPostUploading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      caption: caption,
      profileImage: session.user.image,
      image: imageFileUrl,
      timestamp: serverTimestamp(),
    });

    setPostUploading(false);
    setIsOpen(false);
    setCaption("");
    setImageFileUrl("");
    // refresh the page after successful post upload

    location.reload();
  };
  return (
    <div className=" grid grid-cols-12 lg:gap-16 lg:px-16 lg:py-4 items-center ">
      <div className="col-span-9 flex items-center space-x-4 lg:px-8">
        {/* real */}
        <div>
          <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gray-200"></div>
          <div className="py-2">
            <p className="text-xs">Username</p>
          </div>
        </div>
        {/* real */}
        <div>
          <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gray-200"></div>
          <div className="py-2">
            <p className="text-xs">Username</p>
          </div>
        </div>
        {/* real */}
        <div>
          <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gray-200"></div>
          <div className="py-2">
            <p className="text-xs">Username</p>
          </div>
        </div>
      </div>

      {/* Saerch Input */}
      <div className="col-span-3">
        {session ? (
          <div className=" ">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 lg:w-10 lg:h-10 text-gray-600" fill="#000000" viewBox="0 0 256 256">
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
                </svg>
              </button>
              <Image src={session.user.image} className="w-12 h-12 lg:w-16 lg:h-16 rounded-full" width={100} height={100} alt={session.user.name} />
            </div>
            <p className="text-xs font-medium mt-2 lg:pl-12">{session.user.name}</p>
          </div>
        ) : (
          <div className="flex items-start space-x-3 ">
            <div className="w-14 h-14 rounded-full bg-gray-200 text-white text-2xl flex items-center justify-center font-bold"></div>
            <div className="py-2"></div>
          </div>
        )}
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          className="max-w-xl w-[90%] p-6 lg:ml-[8%]  absolute top-48 left-[5%] lg:lef-[20%] lg:translate-x-[50%] bg-white border-2 rounded-md shadow-md"
          onRequestClose={() => setIsOpen(false)}
          ariaHideApp={false}
        >
          <div className="flex flex-col justify-center items-center h-[100%] mb-4">
            {selectedFile ? (
              <Image
                src={imageFileUrl}
                alt="Selected file"
                className={`h-72 w-full max-h-[300px] object-contain cursor-pointer ${imageFileUploading ? "animate-pulse" : ""}`}
                width={1000}
                height={1000}
                onClick={() => setSelectedFile(null)}
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 cursor-pointer"
                fill="#000000"
                viewBox="0 0 256 256"
                onClick={() => filePickerRef.current.click()}
              >
                <path d="M208,56H180.28L166.65,35.56A8,8,0,0,0,160,32H96a8,8,0,0,0-6.65,3.56L75.71,56H48A24,24,0,0,0,24,80V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V80A24,24,0,0,0,208,56Zm-44,76a36,36,0,1,1-36-36A36,36,0,0,1,164,132Z"></path>
              </svg>
            )}

            <input type="file" hidden ref={filePickerRef} accept="image/*" onChange={addImageToPost} />
          </div>
          <input
            type="text"
            maxLength="150"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Enter your caption ...."
            className=" border border-gray-300 text-center w-full py-2 focus:outline-none text-sm"
          />
          <button
            onClick={handleSubmit}
            disabled={!selectedFile || caption.trim() === "" || postUploading || imageFileUploading}
            className="w-full bg-emerald-500 text-white rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed mt-2 py-2 "
          >
            Upload Post
          </button>
          <div className="absolute top-2 right-2 cursor-pointer" onClick={() => setIsOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#000000" viewBox="0 0 256 256">
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
            </svg>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Header;

// <Image src={imageFileUrl} alt="Selected file" className="h-72 w-full max-h-[300px] object-contain cursor-pointer" width={1000} height={1000} onClick={()=>setSelectedFile(null)}/>
