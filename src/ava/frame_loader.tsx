import { useState, useEffect } from "react";
import Frame from "./frame";
import { JSX } from "react";

type FrameData = {
  images: string[];
  x: number;
  y: number;
  caption?: string;
};

export default function FrameLoader() {
  const [frames, setFrames] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const loadFrames = async () => {
      // Load all image modules
      const imageModules = import.meta.glob<{ default: string }>(
        './images/*/*.{jpg,png}',
        { eager: true }
      );

      // Load coordinates
      const coordModules = import.meta.glob<{ default: string }>(
        './images/*/coords.txt',
        { as: 'raw', eager: true }
      );

      // Load captions
      const captionModules = import.meta.glob<{ default: string }>(
        './images/*/caption.txt',
        { as: 'raw', eager: true }
      );

      const frameMap: { [key: string]: FrameData } = {};

      // Group images by directory
      Object.entries(imageModules).forEach(([path, mod]) => {
        const dir = path.split('/')[2];
        if (!frameMap[dir]) {
          frameMap[dir] = { images: [], x: 100, y: 100 };
        }
        frameMap[dir].images.push(mod.default);
      });

      // Read coordinates from coords.txt (format: x,y)
      Object.entries(coordModules).forEach(([path, content]) => {
        const dir = path.split('/')[2];
        if (frameMap[dir]) {
          const [x, y] = content.trim().split(',').map(Number);
          frameMap[dir].x = x;
          frameMap[dir].y = y;
        }
      });

      // Read captions from caption.txt
      Object.entries(captionModules).forEach(([path, content]) => {
        const dir = path.split('/')[2];
        if (frameMap[dir]) {
          frameMap[dir].caption = content.trim();
        }
      });

      // Create Frame components
      const frameElements: JSX.Element[] = Object.entries(frameMap).map(
        ([dir, data]) => (
          <Frame
            key={dir}
            imgs={data.images}
            x_coord={data.x}
            y_coord={data.y}
            caption={data.caption || ''}
          />
        )
      );

      setFrames(frameElements);
    };

    loadFrames();
  }, []);

  return <>{frames}</>;
}