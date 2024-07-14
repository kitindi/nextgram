"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { addDoc, collection, getFirestore, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { app } from "../firebase";
import Moment from "react-moment";

const CommentSection = ({ id }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { data: session } = useSession();
  const db = getFirestore(app);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // add a comment to firestore
    const commentToPost = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToPost,
      username: session?.user?.username,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  };

  // fetching comments fro firestore db
  useEffect(() => {
    onSnapshot(query(collection(db, "posts", id, "comments"), orderBy("timestamp", "desc")), (snapshot) => {
      setComments(snapshot.docs);
    });
  }, [db]);
  return (
    <div>
      <div>
        {comments.length > 0 && (
          <div className="py-2 overflow-y-scroll max-h-28 mb-3">
            {comments.map((comment, id) => (
              <div key={id} className=" mb-3">
                <div className="flex items-center space-x-2">
                  <Image src={comment.data().userImage} alt="useriamge" width={40} height={40} className="w-6 h-6 rounded-full" />{" "}
                  <span className="font-semibold text-sm">{comment.data().username}</span>
                  <p className=" text-sm">{comment.data().comment}</p>
                </div>
                <Moment fromNow className="text-xs text-gray-400 pl-2">
                  {comment.data().timestamp?.toDate()}
                </Moment>
              </div>
            ))}
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2">
          <div>
            {/* <Image
              src={session?.user.image}
              alt="user image"
              width={50}
              height={50}
              className="w-10 h-10  rounded-full object-cover border-none outline-none flex-1"
            /> */}
          </div>
          <input
            type="text"
            className="flex-grow p-2 border-b border-gray-200 focus:outline-none text-sm"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment ..."
          />
          <button type="submit" className="text-blue-400 font-semibold text-sm disabled:text-blue-200 disabled:cursor-not-allowed" disabled={!comment.trim()}>
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;
