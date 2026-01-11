export async function uploadToCloudinary(file) {
  if (!file) throw new Error("No file provided");

  const cloudName = "dqp8jnzet"; // 🔴 replace
  const uploadPreset = "merchant_uploads"; // 🔴 replace

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(url, {
    method: "POST",
    body: formData
  });

  if (!res.ok) {
    throw new Error("Cloudinary upload failed");
  }

  const data = await res.json();

  return data.secure_url; 
}
