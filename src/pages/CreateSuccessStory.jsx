import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export default function CreateSuccessStory() {
  const { currentstudent } = useSelector((state) => state.student);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef();

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      data
    );
    return res.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentstudent) return setError("Please log in first.");
    if (!title.trim() || !file)
      return setError("Title and certificate required.");
    try {
      setLoading(true);
      setError("");
      const certUrl = await uploadToCloudinary(file);
      const res = await fetch(
        "http://localhost:3000/server/success/success-stories",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            title,
            description,
            location,
            date,
            certificateImage: certUrl,
          }),
        }
      );
      if (!res.ok) throw new Error("Submission failed");
      // alert('Success story submitted!');
      toast.success("Success story submitted!");
      // reset form
      setTitle("");
      setDescription("");
      setLocation("");
      setDate("");
      setFile(null);
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      console.error(err);
      setError(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow m-6 border">
      <h1 className="text-xl font-semibold mb-4 text-center">
        Share Your Success Story
      </h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 bg-transparent"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2 bg-transparent"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Location</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 bg-transparent"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Date</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2 bg-transparent"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Certificate Image</label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files[0];
              setFile(f);
              setPreview(f ? URL.createObjectURL(f) : null);
            }}
            className="w-full"
          />
        </div>
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-32 object-contain rounded"
          />
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Story"}
        </button>
      </form>
    </div>
  );
}
