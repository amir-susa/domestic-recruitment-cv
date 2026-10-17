export interface EmbeddedImage {
  src: string;
  width?: number;
  height?: number;
}

export interface ImageService {
  loadImage(relativePath: string): Promise<string>;
  loadAsset(assetName: string): Promise<string>;
}

export function createImageService(assetDir: string): ImageService {
  return {
    async loadImage(relativePath: string): Promise<string> {
      if (relativePath.startsWith('data:') || relativePath.startsWith('blob:')) {
        return relativePath;
      }
      return `${assetDir}/${relativePath.replace(/^\//, '')}`;
    },
    async loadAsset(assetName: string): Promise<string> {
      return `${assetDir}/${assetName.replace(/^\//, '')}`;
    }
  };
}