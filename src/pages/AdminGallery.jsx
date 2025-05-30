import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";

// Cloudinary config
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export default function AdminGallery() {
  const { currentstudent } = useSelector((state) => state.student);

  const [activeTab, setActiveTab] = useState("albums");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- Album state ---
  const [title, setTitle] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);

  // --- Video state ---
  const [videoTitle, setVideoTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  // --- Memory state ---
  const [memoryFile, setMemoryFile] = useState(null);
  const [memoryCaption, setMemoryCaption] = useState("");

  const coverInputRef = useRef();
  const imagesInputRef = useRef();
  const videoInputRef = useRef();
  const memoryInputRef = useRef();

  const uploadToCloudinary = async (file, resourceType = "image") => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
      data
    );
    return res.data.secure_url;
  };

  const handleRemoveCover = () => {
    setCoverFile(null);
    if (coverInputRef.current) coverInputRef.current.value = "";
  };
  const handleRemoveImage = (idx) => {
    setImageFiles((files) => files.filter((_, i) => i !== idx));
    if (imagesInputRef.current) imagesInputRef.current.value = "";
  };
  const handleRemoveMemory = () => {
    setMemoryFile(null);
    if (memoryInputRef.current) memoryInputRef.current.value = "";
  };

  // --- Album submit ---
  const handleSubmitAlbum = async (e) => {
    e.preventDefault();
    if (!currentstudent?.isAdmin) return setError("Not authorized");
    if (!title || !coverFile) return setError("Title and cover required");
    try {
      setLoading(true);
      setError(null);
      const coverUrl = await uploadToCloudinary(coverFile, "image");
      const albumRes = await fetch(
        "http://localhost:3000/server/gallery/albums",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ title, coverImage: coverUrl }),
        }
      );
      const album = await albumRes.json();
      const urls = [];
      for (let f of imageFiles) urls.push(await uploadToCloudinary(f));
      await fetch(
        `http://localhost:3000/server/gallery/albums/${album._id}/images`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ images: urls }),
        }
      );
      // alert("Album created!");
      toast.success("Album created!");
      // reset
      setTitle("");
      setCoverFile(null);
      setImageFiles([]);
      if (coverInputRef.current) coverInputRef.current.value = "";
      if (imagesInputRef.current) imagesInputRef.current.value = "";
    } catch {
      setError("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // Video submit
  const handleSubmitVideo = async (e) => {
    e.preventDefault();
    if (!currentstudent?.isAdmin) return setError("Not authorized");
    if (!videoTitle || !videoFile) return setError("Title and video required");
    try {
      setLoading(true);
      setError(null);
      const videoUrl = await uploadToCloudinary(videoFile, "video");
      await fetch("http://localhost:3000/server/gallery/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title: videoTitle, url: videoUrl }),
      });
      // alert("Video added!");
      toast.success("Video added!");
      setVideoTitle("");
      setVideoFile(null);
      if (videoInputRef.current) videoInputRef.current.value = "";
    } catch {
      setError("Video upload failed");
    } finally {
      setLoading(false);
    }
  };

  // --- Memory submit ---
  const handleSubmitMemory = async (e) => {
    e.preventDefault();
    if (!currentstudent) return setError("Not authorized");
    if (!memoryFile) return setError("Please choose an image");
    try {
      setLoading(true);
      setError(null);
      const imageUrl = await uploadToCloudinary(memoryFile, "image");
      await fetch("http://localhost:3000/server/gallery/memories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ image: imageUrl, caption: memoryCaption }),
      });
      // alert("Memory shared!");
      toast.success("Memory shared!");
      setMemoryFile(null);
      setMemoryCaption("");
      if (memoryInputRef.current) memoryInputRef.current.value = "";
    } catch {
      setError("Memory upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 shadow-lg rounded-md bg-white dark:bg-gray-900 dark:text-white m-10 border dark:border-white">
      {/* Tabs */}
      <div className="flex mb-6 border-b dark:border-gray-700">
        {["albums", "videos", "memories"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setError(null);
            }}
            className={
              "px-4 py-2 -mb-px font-medium " +
              (activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 dark:text-gray-400")
            }
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Albums Form */}
      {activeTab === "albums" && (
        <form onSubmit={handleSubmitAlbum} className="flex flex-col gap-5">
          <div>
            <label className="block mb-1 font-medium">Album Title</label>
            <input
              type="text"
              placeholder="Enter album title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2 bg-transparent"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Cover Image</label>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files[0])}
              className="w-full"
            />
          </div>
          {coverFile && (
            <div className="relative mt-2">
              <img
                src={URL.createObjectURL(coverFile)}
                alt="Cover Preview"
                className="w-full h-40 object-cover rounded border"
              />
              <button
                type="button"
                onClick={handleRemoveCover}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
              >
                ×
              </button>
            </div>
          )}
          <div>
            <label className="block mb-1 font-medium">Gallery Images</label>
            <input
              ref={imagesInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImageFiles(Array.from(e.target.files))}
              className="w-full"
            />
          </div>
          {imageFiles.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {imageFiles.map((file, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Image ${idx + 1}`}
                    className="w-full h-24 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Album"}
          </button>
        </form>
      )}

      {/* Videos Form */}
      {activeTab === "videos" && (
        <form onSubmit={handleSubmitVideo} className="flex flex-col gap-5">
          <div>
            <label className="block mb-1 font-medium">Video Title</label>
            <input
              type="text"
              placeholder="Enter video title"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              className="w-full border rounded px-3 py-2 bg-transparent"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Upload Video</label>
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              onChange={(e) => {
                // setVideoFile(e.target.files[0])
                const file = e.target.files[0];
                if (file) {
                  if (file.size > 100 * 1024 * 1024) {
                    setError("Video must be 100MB or smaller");
                    setVideoFile(null);
                    if (videoInputRef.current) videoInputRef.current.value = "";
                  } else {
                    setError(null);
                    setVideoFile(file);
                  }
                }
              }}
              className="w-full"
            />
          </div>
          {videoFile && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Selected: {videoFile.name}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Add Video"}
          </button>
        </form>
      )}

      {/* Memories Form */}
      {activeTab === "memories" && (
        <form onSubmit={handleSubmitMemory} className="flex flex-col gap-5">
          <div>
            <label className="block mb-1 font-medium">Memory Image</label>
            <input
              ref={memoryInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => setMemoryFile(e.target.files[0])}
              className="w-full"
            />
          </div>
          {memoryFile && (
            <div className="relative mt-2">
              <img
                src={URL.createObjectURL(memoryFile)}
                alt="Memory Preview"
                className="w-full h-40 object-cover rounded border"
              />
              <button
                type="button"
                onClick={handleRemoveMemory}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
              >
                ×
              </button>
            </div>
          )}
          <div>
            <label className="block mb-1 font-medium">Caption</label>
            <input
              type="text"
              placeholder="Add a caption (optional)"
              value={memoryCaption}
              onChange={(e) => setMemoryCaption(e.target.value)}
              className="w-full border rounded px-3 py-2 bg-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? "Sharing..." : "Share Memory"}
          </button>
        </form>
      )}
    </div>
  );
}
