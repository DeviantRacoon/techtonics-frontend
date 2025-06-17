// utils/getUrlImage.ts
export default function getUrlImage(url: string | undefined) {
  if (!url) return url;
  const filePath = url.replace('/mnt/', '');
  return `/api/image-proxy?path=${encodeURIComponent(filePath)}`;
}
