export interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
}

export async function getRandomImage(): Promise<UnsplashImage> {
  const ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch image');
  }
  
  return response.json();
}