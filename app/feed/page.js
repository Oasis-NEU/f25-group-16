'use client';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";


export default function Feed() {


// placeholder posts (empty)
const posts = Array.from({length: 3}, (_, i) => ({ id: i + 1 }));


  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center p-4">
     
      {/* Search bar + search button*/}
      <div className="flex w-full max-w-4xl mb-6 gap-x-2">
        <Input
          type="text"
          placeholder="Search . . ."
          className="w-full h-12 px-4 rounded-lg border-none
                     bg-white text-slate-800 placeholder-slate-400
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
        />
        <Button
          className="h-12 px-6 rounded-lg"
          onClick={() => console.log("Search button clicked")}
        >
          Enter
        </Button>
      </div>


      {/* Feed placeholder posts */}
      <div className="w-full max-w-4xl flex flex-col gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-2 animate-pulse"
          >
            {/* Title placeholder */}
            <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
            {/* Info line placeholder */}
            <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
            {/* Image placeholder */}
            <div className="h-48 w-full bg-gray-300 rounded"></div>
            {/* Tags / footer placeholder */}
            <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

     
    </div>
  );
}



