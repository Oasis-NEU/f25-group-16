// 'use client';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";


// export default function Feed() {


// // placeholder posts (empty)
// const posts = Array.from({length: 3}, (_, i) => ({ id: i + 1 }));


//   return (
//     <div className="min-h-screen bg-gray-200 flex flex-col items-center p-4">
     
//       {/* Search bar + search button*/}
//       <div className="flex w-full max-w-4xl mb-6 gap-x-2">
//         <Input
//           type="text"
//           placeholder="Search . . ."
//           className="w-full h-12 px-4 rounded-lg border-none
//                      bg-white text-slate-800 placeholder-slate-400
//                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
//         />
//         <Button
//           className="h-12 px-6 rounded-lg"
//           onClick={() => console.log("Search button clicked")}
//         >
//           Enter
//         </Button>
//       </div>


//       {/* Feed placeholder posts */}
//       <div className="w-full max-w-4xl flex flex-col gap-4">
//         {posts.map((post) => (
//           <div
//             key={post.id}
//             className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-2 animate-pulse"
//           >
//             {/* Title placeholder */}
//             <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
//             {/* Info line placeholder */}
//             <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
//             {/* Image placeholder */}
//             <div className="h-48 w-full bg-gray-300 rounded"></div>
//             {/* Tags / footer placeholder */}
//             <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
//           </div>
//         ))}
//       </div>

     
//     </div>
//   );
// }

'use client';
import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { supabase } from '@/lib/supabaseClient';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  // Fetch posts from Supabase
  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching posts:', error);
    else setPosts(data);
  }

  // Optional: filter posts by search term
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center p-4">
     
      {/* Search bar + button */}
      <div className="flex w-full max-w-4xl mb-6 gap-x-2">
        <Input
          type="text"
          placeholder="Search . . ."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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

      {/* Feed posts */}
      <div className="w-full max-w-4xl flex flex-col gap-4">
        {filteredPosts.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet.</p>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-2"
            >
              {/* Title */}
              <h2 className="font-semibold text-lg">{post.title}</h2>

              {/* Info line */}
              <p className="text-sm text-gray-500">
                {post.date} {post.time} • {post.location}
              </p>

              {/* Image (optional) */}
              {post.image_url && (
                <div className="relative h-48 w-full">
                  <Image
                    src={post.image_url}
                    alt={post.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}

              {/* Description */}
              {post.description && <p>{post.description}</p>}

              {/* Tags */}
              {post.tags && (
                <p className="text-sm text-blue-500">
                  {post.tags.join(', ')}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
