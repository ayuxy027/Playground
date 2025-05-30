import { useEffect, useState } from "react";
import moment from "moment";

export default function SuccessStories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/server/success/success-stories")
      .then((res) => res.json())
      .then(setStories)
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Success Stories
      </h1>
      {stories.length === 0 ? (
        <p className="text-center">No stories yet.</p>
      ) : (
        <div className="space-y-6">
          {stories.map((s) => (
            <div
              key={s._id}
              className="max-w-sm mx-auto border border-custom-blue rounded-lg overflow-hidden shadow-md p-3"
            >
              <img
                src={s.certificateImage}
                alt={s.title}
                className="w-full h-32 object-contain"
              />
              <div className="p-2">
                <h2 className="text-lg font-semibold mb-1">{s.title}</h2>
                {s.description && (
                  <p className="text-sm mb-1 line-clamp-3">{s.description}</p>
                )}
                <p className="text-sm mb-1">
                  <strong>Location:</strong> {s.location}
                </p>
                <p className="text-sm mb-2">
                  <strong>Date:</strong> {moment(s.date).format("LL")}
                </p>
                <p className="text-xs text-gray-500">
                  by {s.createdBy.name} on {moment(s.createdAt).format("LL")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
