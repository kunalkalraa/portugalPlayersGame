/**
 * Preload images and execute an optional callback when all images are loaded.
 */
export default function useImagePreloader() {
  const preloadImages = (imageUrls, onAllImagesLoaded = () => {}) => {
    const preloadedImages = []

    const preloadImage = url => {
      const img = new Image()
      img.src = url
      img.onload = () => {
        preloadedImages.push(img)
        if (preloadedImages.length === imageUrls.length) {
          onAllImagesLoaded()
        }
      }
    }

    for (const imageUrl of imageUrls) {
      preloadImage(imageUrl)
    }
  }

  return {
    preloadImages,
  }
}
