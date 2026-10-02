import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { heroSlides, roomGalleries, aboutGallery, contactLocationImage, homeFeatureImage, roomsPageOgImage } from '../data/images';

describe('Image Paths', () => {
  const publicDir = path.join(process.cwd(), 'public');

  const checkImage = (src: string) => {
    // next/image src is relative to public folder (e.g., /images/...)
    const filePath = path.join(publicDir, src);
    expect(fs.existsSync(filePath), `Image does not exist: ${src}`).toBe(true);
  };

  it('hero slides exist', () => {
    heroSlides.forEach(slide => checkImage(slide.src));
  });

  it('room galleries exist', () => {
    Object.values(roomGalleries).forEach(gallery => {
      gallery.forEach(img => checkImage(img.src));
    });
  });

  it('about gallery images exist', () => {
    aboutGallery.forEach(img => checkImage(img.src));
  });

  it('standalone images exist', () => {
    checkImage(contactLocationImage.src);
    checkImage(homeFeatureImage.src);
    checkImage(roomsPageOgImage.url);
  });
});
