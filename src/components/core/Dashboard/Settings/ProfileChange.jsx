import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { settingsEndpoints } from '../../../../services/apis';  
import { apiConnector } from '../../../../services/apiconnector'; 
import { useDispatch } from 'react-redux';
import { setUser } from '../../../../slices/profileSlice';  
import toast from 'react-hot-toast';
const ProfileChange = () => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  // Called when file input changes
  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      setImage(file);
    }
  };

  // Convert image to base64 and store it in preview
  const previewHandler = (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setPreview(reader.result);
      setLoading(false);
    };
  };

  // Automatically preview the image when changed
  useEffect(() => {
    if (image) {
      previewHandler(image);
    }
  }, [image]);

  // Trigger the file input click
  const changeHandler = () => {
    fileRef.current.click();
  };

  // Upload the file to backend
  const formSubmit = async (data) => {
    if (!image) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('displayPicture', image);

      const response = await apiConnector(
        'PUT',
        settingsEndpoints.UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );
     const updatedUser = response.data.data; 
      console.log('Upload response:', updatedUser);
     dispatch(setUser(updatedUser));
toast.success("Profile Picture changed")
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setImage(null);
      setPreview(null);
      //dispatch(setUser(JSON.stringify(updatedUser)))
    } catch (error) {
      toast.error("failed to upload the image")
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  // Clear image and preview
const removeImage = async () => {
  try {
    setLoading(true);

    // Call API to remove the display picture
    const response = await apiConnector(
      'PUT',
      settingsEndpoints.REMOVE_DISPLAY_PICTURE_API,
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    const updatedUser = response.data.data; 
    console.log("updated user after image removal",updatedUser)
    updatedUser.image = updatedUser?.image
        ? updatedUser?.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${updatedUser.firstName} ${updatedUser.lastName}`

        toast.success("profile pictrure removed")
 dispatch(setUser(updatedUser));
localStorage.setItem("user", JSON.stringify(updatedUser));

    // Clear local preview/image state
    setImage(null);
    setPreview(null);
  } catch (error) {
    toast.error("failed to remove the picture")
    console.error('Error removing image:', error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="text-white mx-auto flex flex-col items-center justify-center w-[100%] max-w-4xl">
      <h1 className="text-2xl text-richblack-50 mb-4">Edit Profile</h1>

      <div className="flex w-[100%] max-w-4xl items-center bg-richblack-800 rounded-xl p-4 justify-center gap-10">
        {/* Profile Image Preview */}
        <div className="size-20 rounded-full overflow-hidden">
          <img
            src={preview || user?.image}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {/* Upload Form */}
        <div className="flex flex-col items-center">
          <p className="mb-2">Change Profile Picture</p>

          <form onSubmit={handleSubmit(formSubmit)} className="flex gap-2 items-center">
            <input
              type="file"
              id="displayPicture"
              accept="image/*"
              className="hidden"
              {...register('displayPicture')}
              ref={fileRef}
              onChange={onFileChange}
            />

            <label
              onClick={!loading ? changeHandler : undefined}
              className={`px-3 py-1 rounded text-black font-medium 
    ${loading ? 'bg-yellow-200 cursor-not-allowed' : 'bg-yellow-400 cursor-pointer'}`}
            >
              Choose File
            </label>

            <button
              type="submit"
              disabled={loading || !image}
              className="bg-yellow-500 text-black px-3 py-1 rounded font-medium"
            >
              {loading ? 'Uploading...' : 'Upload'}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={removeImage}
              className={`border px-3 py-1 rounded text-white 
    ${loading ? 'cursor-not-allowed bg-richblack-600' : 'bg-richblack-700 border-richblack-600'}`}
            >
              Remove
            </button>
          </form>

          {errors.displayPicture && (
            <span className="text-red-400 mt-1 text-sm">
              {errors.displayPicture.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileChange;



//  const userImage = response.data?.user?.image
//         ? response.data.user.image
//         : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`