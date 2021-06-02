import { flow, map, last } from 'loadsh/fp';

const mapIcon = (icon) => {
  const bigforamt = (last(icon.raster_sizes) as any).formats[0];
  return {
    previewUrl: bigforamt.preview_url,
    downloadUrl: bigforamt.download_url,
    format: bigforamt.format,
    id: icon.icon_id,
    icon,
  };
};

export const mapIconsResult = (result) => flow(map(mapIcon))(result);

export const mapIconResult = (icon) => {
  const bigforamt = icon.vector_sizes[0].formats[0];

  return {
    previewUrl: bigforamt.preview_url,
    downloadUrl: bigforamt.download_url,
    format: bigforamt.format,
    id: icon.icon_id,
    // icon,
  };
};
