import React from "react";
import { app } from "../firebase";
import { collection, getDoc, getDocs, getFirestore, orderBy, query } from "firebase/firestore";
import PostCard from "./PostCard";

const Posts = async () => {
  // connecting to firestore database and query database table
  const db = getFirestore(app);
  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

  const quesrySnapshot = await getDocs(q);

  let data = [];
  quesrySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return (
    <div>
      {data.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
