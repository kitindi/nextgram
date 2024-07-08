import Image from "next/image";
import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white my-5 border-b border-gray-200 pb-4">
      <div className="flex items-center p-5">
        <Image src={post.profileImage} alt={post.username} width={50} height={50} className="rounded-full object-cover p-1 mr-3" />
        <p className="flex-1 font-medium">{post.username}</p>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#000000" viewBox="0 0 256 256">
            <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM128,72a12,12,0,1,0-12-12A12,12,0,0,0,128,72Zm0,112a12,12,0,1,0,12,12A12,12,0,0,0,128,184Z"></path>
          </svg>
        </span>
      </div>
      <Image src={post.image} alt={post.caption} className="w-full object-cover w-full" width={1000} height={1000} />
      <p className="text-sm font-regular p-5 trancate">
        <span className="text-sm font-semibold mr-2">{post.username}</span>
        {post.caption}
      </p>
    </div>
  );
};

export default PostCard;
