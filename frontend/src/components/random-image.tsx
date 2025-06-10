"use client";

import { useState, useEffect } from "react";
import { getRandomImage, UnsplashImage } from "@/lib/unsplash";

export const RandomImage = () => {
  const [image, setImage] = useState<UnsplashImage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const newImage = await getRandomImage();
        setImage(newImage);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

  return (
    <section>
      {loading ? (
        <img
          src="/loading-image.jpg"
          alt="Loading..."
          className="rounded-lg aspect-[2/4] object-cover w-full"
        />
      ) : (
        <img
          src={image?.urls.regular || "/loading-image.jpg"}
          alt={image?.alt_description || "Random image"}
          className="rounded-lg aspect-4/2 lg:aspect-2/4 object-cover w-full"
        />
      )}
    </section>
  );
};
