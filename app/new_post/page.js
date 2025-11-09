"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [ampm, setAmpm] = useState("AM");
  const [location, setLocation] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ handle image selection
  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImage({ file, url });
  }

  // ✅ handle post upload
  async function handlePost(e) {
    e.preventDefault();
    console.log("DEBUG image:", image);
    console.log({ title, date, time, image });
    if (!title || !date || !time || !image) {
      alert("Please fill in title, date, time, and select an image.");
      return;
    }

    setLoading(true);
    try {
      // Step 1️⃣: Get logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("Not logged in");

      // Step 2️⃣: Upload image to Supabase Storage
      const fileExt = image.file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `posts/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images") // make sure you have an "images" bucket in Supabase Storage
        .upload(filePath, image.file);

      if (uploadError) throw uploadError;

      // Step 3️⃣: Get public URL for uploaded image
      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filePath);

      // Step 4️⃣: Insert post record into database
      const { error: insertError } = await supabase.from("posts").insert([
        {
          user_id: user.id,
          title,
          location,
          date,
          time: `${time} ${ampm}`,
          image_url: publicUrl,
          tags: [],
          created_at: new Date(),
        },
      ]);

      if (insertError) throw insertError;

      alert("✅ Post created successfully!");
      setTitle("");
      setDate("");
      setTime("");
      setAmpm("AM");
      setLocation("");
      setCaption("");
      setImage(null);
    } catch (err) {
      console.error("Error creating post:", err.message);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSave(e) {
    e.preventDefault();
    console.log("DRAFT", { title, date, time, ampm, location, caption, image });
    alert("Saved draft (console).");
  }

  // ✅ UI (same as before, only handlePost replaced)
  return (
    <main className="min-h-screen bg-neutral-200 p-6">
      <div className="mx-auto max-w-6xl rounded-2xl bg-neutral-100 p-6 shadow">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">New Post</h1>

        <form className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <section>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block aspect-square w-full cursor-pointer overflow-hidden rounded-lg bg-neutral-300"
                title="Click to upload"
              >
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image.url} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-neutral-600">
                    Click to upload image
                  </div>
                )}
              </label>
              <input id="image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>

            <div className="mb-4">
              <label className="block text-2xl font-semibold text-slate-800">Event Title</label>
              <input
                className="mt-1 w-full border-b-2 border-neutral-400 bg-transparent p-2 outline-none focus:border-slate-700"
                placeholder="Type title…"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-2xl font-semibold text-slate-800">Date:</label>
              <input
                type="date"
                className="mt-1 w-48 rounded-md border border-neutral-300 bg-white p-2"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-2xl font-semibold text-slate-800">Time:</label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  type="time"
                  className="rounded-md border border-neutral-300 bg-white p-2"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
                <select
                  className="rounded-md border border-neutral-300 bg-white p-2"
                  value={ampm}
                  onChange={(e) => setAmpm(e.target.value)}
                >
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </div>

            <div className="mb-2">
              <label className="block text-2xl font-semibold text-slate-800">Location:</label>
              <input
                className="mt-1 w-full rounded-md border border-neutral-300 bg-white p-2"
                placeholder="Street Address, City, State Zip Code"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Caption</h2>
            <textarea
              className="h-64 w-full rounded-lg border border-neutral-300 bg-white p-3"
              placeholder="Type your caption here"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />

            <div className="mt-4 flex gap-4">
              <button
                onClick={handleSave}
                className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
                type="button"
              >
                Save
              </button>
              <button
                onClick={handlePost}
                disabled={loading}
                className={`rounded-lg px-6 py-3 font-semibold text-white ${
                  loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Posting..." : "Post"}
              </button>
            </div>
          </section>
        </form>
      </div>
    </main>
  );
}
