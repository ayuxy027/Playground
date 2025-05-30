import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function GallerySection() {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/server/gallery/albums/${albumId}`)
      .then((res) => res.json())
      .then(setAlbum)
      .catch(console.error);
  }, [albumId]);

  if (!album) return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">{album.title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {album.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${album.title} ${idx + 1}`}
            className="w-full h-64 object-cover rounded group-hover:scale-105 transition-transform"
          />
        ))}
      </div>
    </div>
  );
}
