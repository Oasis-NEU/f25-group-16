"use client";
import { useState } from "react";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [ampm, setAmpm] = useState("AM");
  const [location, setLocation] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImage({ file, url });
  }

  function handleSave(e) {
    e.preventDefault();
    // stub: save draft locally (console for now)
    console.log("DRAFT", { title, date, time, ampm, location, caption, image });
    alert("Saved draft (console).");
  }

  function handlePost(e) {
    e.preventDefault();
    // stub: would call API / DB (Supabase later)
    console.log("POST", { title, date, time, ampm, location, caption, image });
    alert("Pretend posted! (we’ll wire Supabase later)");
  }

  return (
    <main className="min-h-screen bg-neutral-200 p-6">
      <div className="mx-auto max-w-6xl rounded-2xl bg-neutral-100 p-6 shadow">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">New Post</h1>

        {/* Layout: two columns */}
        <form className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* LEFT: image + event meta */}
          <section>
            {/* Image picker / preview */}
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

            {/* Event Title */}
            <div className="mb-4">
              <label className="block text-2xl font-semibold text-slate-800">Event Title</label>
              <input
                className="mt-1 w-full border-b-2 border-neutral-400 bg-transparent p-2 outline-none focus:border-slate-700"
                placeholder="Type title…"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Date */}
            <div className="mb-4">
              <label className="block text-2xl font-semibold text-slate-800">Date:</label>
              <input
                type="date"
                className="mt-1 w-48 rounded-md border border-neutral-300 bg-white p-2"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* Time + AM/PM */}
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

            {/* Location */}
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

          {/* RIGHT: caption + actions */}
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
              >
                Save
              </button>
              <button
                onClick={handlePost}
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Post
              </button>
            </div>
          </section>
        </form>

        {/* bottom navigation placeholders */}
        <div className="mt-8 flex justify-center gap-6">
          <div className="h-10 w-16 rounded-md bg-neutral-400" />
          <div className="h-10 w-16 rounded-md bg-neutral-300" />
          <div className="h-10 w-16 rounded-md bg-neutral-400" />
        </div>
      </div>
    </main>
  );
}
