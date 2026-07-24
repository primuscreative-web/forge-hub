import { CATALOG_API_BASE_URL } from "./catalog-api";

export type AssetInfo = { id: string; kind: string; originalName: string; mimeType: string; sizeBytes: number; url?: string };

export function uploadFile(path: string, file: File, onProgress?: (progress: number) => void) {
  return new Promise<AssetInfo>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${CATALOG_API_BASE_URL}/${path}`);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
    xhr.setRequestHeader("X-File-Name", encodeURIComponent(file.name));
    xhr.upload.onprogress = (event) => event.lengthComputable && onProgress?.(Math.round(event.loaded / event.total * 100));
    xhr.onerror = () => reject(new Error("Upload service unavailable"));
    xhr.onload = () => {
      let body: { asset?: AssetInfo; error?: { message?: string } } = {};
      try { body = JSON.parse(xhr.responseText); } catch { /* empty */ }
      if (xhr.status >= 200 && xhr.status < 300 && body.asset) resolve(body.asset);
      else reject(new Error(body.error?.message ?? `Upload failed (${xhr.status})`));
    };
    xhr.send(file);
  });
}

export async function deleteUpload(path: string) {
  const response = await fetch(`${CATALOG_API_BASE_URL}/${path}`, { method: "DELETE", credentials: "include" });
  if (!response.ok) throw new Error("Unable to remove file");
}
