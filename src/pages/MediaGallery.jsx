import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MediaGallery() {
  const [activeTab, setActiveTab] = useState("albums");
  const [albums, setAlbums] = useState([]);
  const [videos, setVideos] = useState([]);
  const [memories, setMemories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [aRes, vRes, mRes] = await Promise.all([
        fetch("http://localhost:3000/server/gallery/albums"),
        fetch("http://localhost:3000/server/gallery/videos"),
        fetch("http://localhost:3000/server/gallery/memories"),
      ]);
      if (!aRes.ok || !vRes.ok || !mRes.ok) throw new Error("Fetch failed");
      setAlbums(await aRes.json());
      setVideos(await vRes.json());
      setMemories(await mRes.json());
    } catch (e) {
      console.error(e);
      setError("Failed to load gallery data");
    }
  };

  const TabButton = ({ id, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={
        "px-4 py-2 -mb-px font-medium transition " +
        (activeTab === id
          ? "border-b-2 border-blue-600 text-blue-600"
          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200")
      }
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Gallery</h1>

      {/* Tabs */}
      <div className="flex justify-center mb-8 border-b dark:border-gray-700">
        <TabButton id="albums" label="Albums" />
        <TabButton id="videos" label="Videos" />
        <TabButton id="memories" label="Memories" />
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Albums Grid */}
      {activeTab === "albums" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {albums.map((a) => (
            <div
              key={a._id}
              onClick={() => navigate(`/gallery/${a._id}`)}
              className="group cursor-pointer overflow-hidden rounded-lg shadow hover:shadow-lg transition border dark:border-white"
            >
              <img
                src={a.coverImage}
                alt={a.title}
                className="w-full h-48 object-contain group-hover:scale-105 transition-transform p-2"
              />
              <div className="p-4 bg-white dark:bg-gray-800">
                <h2 className="text-lg font-medium">{a.title}</h2>
                <p className="text-sm text-gray-500">
                  {new Date(a.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Videos Grid */}
      {activeTab === "videos" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {videos.map((v) => (
            <div
              key={v._id}
              className="rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white dark:bg-gray-800"
            >
              <video
                src={v.url}
                controls
                className="w-full h-48 object-cover bg-black"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium">{v.title}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(v.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Memories Grid */}
      {activeTab === "memories" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {memories.map((m) => (
            <div
              key={m._id}
              className="relative group overflow-hidden rounded-lg shadow"
            >
              <img
                src={m.image}
                alt={m.caption || "Memory"}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
              />
              {m.caption && (
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center p-4 transition-opacity">
                  <p className="text-white text-center">{m.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
