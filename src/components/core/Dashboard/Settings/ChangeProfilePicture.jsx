import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI";
import IconBtn from "../../../common/IconBtn";

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(user?.image || null);

  const fileInputRef = useRef(null);

  const handleClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setPreviewSource(reader.result);
  };

  const handleFileUpload = async () => {
    if (!imageFile) return alert("Select a file first!");
    setLoading(true);

    const formData = new FormData();
    formData.append("displayPicture", imageFile);

    try {
      const response = await dispatch(updateDisplayPicture(token, formData));
      if (response?.success) {
        alert("Profile picture updated!");
      } else {
        alert(response?.message || "Failed to update profile picture");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (imageFile) previewFile(imageFile);
  }, [imageFile]);

  return (
    <div className="flex items-center gap-x-4 p-6 border rounded-md bg-gray-800 text-white">
      <img
        src={previewSource}
        alt="profile"
        className="w-20 h-20 rounded-full object-cover"
      />
      <div className="flex flex-col gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/gif"
        />
        <div className="flex gap-2">
          <button
            onClick={handleClick}
            disabled={loading}
            className="px-4 py-2 bg-gray-700 rounded"
          >
            Select
          </button>
          <IconBtn text={loading ? "Uploading..." : "Upload"} onclick={handleFileUpload}>
            {!loading && <FiUpload />}
          </IconBtn>
        </div>
      </div>
    </div>
  );
}
