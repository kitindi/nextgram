"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { collection, deleteDoc, doc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";
import { app } from "@/firebase";

const LikesSection = ({ id }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  const { data: session } = useSession();

  const db = getFirestore(app);

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db]);

  useEffect(() => {
    // check if the user liked the post before
    if (likes.findIndex((like) => like.id === session?.user?.uid) !== -1) {
      setHasLiked(true);
    } else {
      setHasLiked(false);
    }
  }, [likes]);

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), { username: session?.user?.username });
    }
  };

  return (
    <div className="py-4">
      <div className="flex items-center space-x-3 ">
        <div className="flex items origin-center">
          {hasLiked ? (
            <span onClick={likePost}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#f87171" viewBox="0 0 256 256" className="cursor-pointer">
                <path d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"></path>
              </svg>
            </span>
          ) : (
            <span onClick={likePost}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256" className="cursor-pointer">
                <path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"></path>
              </svg>
            </span>
          )}
        </div>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256" className="cursor-pointer">
            <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"></path>
          </svg>
        </span>
      </div>
      <div>{likes.length > 0 && <p className="text-sm font-semibold">{likes.length} likes</p>}</div>
    </div>
  );
};

export default LikesSection;
