"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function MediaUploader() {
  const router = useRouter();
  const [status, setStatus] = useState("");

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus("Uploading…");
    const body = new FormData();
    body.append("file", file);
    body.append("alt", file.name);
    const res = await fetch("/api/admin/media", { method: "POST", body });
    if (!res.ok) {
      setStatus("Upload failed");
      return;
    }
    setStatus("Uploaded");
    router.refresh();
  }

  return (
    <div className="border border-dashed border-ink/20 bg-paper p-6">
      <label className="block cursor-pointer">
        <span className="text-sm font-medium text-ink">Choose image</span>
        <input type="file" accept="image/*" onChange={onChange} className="mt-3 block w-full text-sm" />
      </label>
      {status && <p className="mt-3 text-sm text-aluminum">{status}</p>}
    </div>
  );
}
