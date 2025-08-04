import React, { useEffect, useState, useRef } from "react"
import { useDropzone } from "react-dropzone"
import { get } from "react-hook-form"
import toast from "react-hot-toast"
import { FiUploadCloud } from "react-icons/fi"
import {
    Player,
    BigPlayButton,
    ControlBar,
    ReplayControl,
    ForwardControl,
    VolumeMenuButton,
    PlaybackRateMenuButton,
} from "video-react";
import "video-react/dist/video-react.css"

const Upload = ({
    label,
    name,
    register,
    errors,
    setValue,
    getValues,
    setVideoDuration,
    video = false,
    viewData = null,
    editData = null,
}) => {
    const [duration, setDuration] = useState(null);

    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const inputRef = useRef(null)

    const formatDuration = (seconds) => {
        if (!seconds) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const onDrop = (acceptedFiles) => {
        const selected = acceptedFiles[0]
        if (!selected) return


        // console.log("File name:", selected.name);
        // console.log("File type:", selected.type);



        const reader = new FileReader()
        reader.readAsDataURL(selected)
        reader.onloadend = () => {
            setPreview(reader.result)

            if (video) {
                const tempVideo = document.createElement("video");
                tempVideo.preload = "metadata";

                tempVideo.onloadedmetadata = () => {
                    // window.URL.revokeObjectURL(tempVideo.src);
                    const videoDuration = Math.floor(tempVideo.duration);

                    //sync with the form data
                    if (videoDuration) {
                        // const formatedDuration=formatDuration(videoDuration);
                        setValue("timeDuration", videoDuration)
                        setVideoDuration(videoDuration);
                        // setDuration(formatedDuration);
                    }
                    else {
                        toast.error("time duration not fetched in upload comp")
                    }

                   // console.log("Video Duration:", getValues("timeDuration"), "seconds");
                };

                tempVideo.src = reader.result;

            }
        }

        setFile(selected)
        setValue(name, selected)

    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: !video
            ? { "image/*": [".jpeg", ".jpg", ".png"] }
            : { "video/mp4*": [".mp4"] },
        onDrop,
    })

    const resetFile = () => {
        setFile(null)
        setPreview(null)
        setValue(name, null)
    }

    // Register field
    useEffect(() => {
        register(name, {
            required: true,
            validate: (file) => file instanceof File || typeof file === "string" || "Please upload a valid file",
        })
    }, [register, name])

    // Preview for image/video files
    useEffect(() => {
        if (file) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setPreview(reader.result)
            }
        }
    }, [file])

    // Handle prefilled form values (edit/view mode)
    useEffect(() => {
        const existingFile = getValues(name)
        if (existingFile && typeof existingFile === "string") {
            setPreview(existingFile)
        }
    }, [getValues, name])

    return (
        <div className="w-full space-y-2">
            <label htmlFor={name} className="text-sm text-richblack-5">
                {label} <sup className="text-pink-200">*</sup>
            </label>

            <div ref={inputRef}

                {...getRootProps()}
                className={`${isDragActive ? "bg-richblack-600" : "bg-richblack-700"
                    } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
            >
                <input {...getInputProps()}


                />

                {preview ? (
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex w-full flex-col p-6">
                        {!video ? (
                            <img

                                src={preview}
                                alt="Preview"
                                className="h-full w-full rounded-md object-cover"
                            />
                        ) : (
                            <div className="w-full   max-w-[600px] mx-auto rounded-lg overflow-hidden border border-gray-300">
                                <Player
                                    playsInline
                                    autoPlay
                                     
                                    muted
                                    width="100%"
                                    height={340}
                                    fluid={false} // helps to resize the video and contain all the controll without zoom in
                                    poster="/poster.png"
                                    src={preview}

                                >
                                    <ControlBar autoHide={true}>
                                        <ReplayControl seconds={10} order={1.1} />
                                        <ForwardControl seconds={10} order={1.2} />
                                        <VolumeMenuButton vertical />
                                        <PlaybackRateMenuButton rates={[2, 1.5, 1.25, 1, 0.75]} />
                                    </ControlBar>
                                </Player>
                            </div>


                        )}

                        {!viewData &&
                            (<button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation(); //  prevent bubbling to dropzone div
                                    resetFile();         //  reset file and preview
                                }}
                                className="mt-3 text-richblack-400 underline"
                            >
                                Cancel
                            </button>)
                        }
                    </div>
                ) : (
                    <div className="flex w-full flex-col items-center p-6">
                        <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
                            <FiUploadCloud className="text-2xl text-yellow-50" />
                        </div>
                        <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                            Drag and drop a {!video ? "image" : "video"}, or click to{" "}
                            <span className="font-semibold text-yellow-50">Browse</span> a file
                        </p>
                        <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
                            <li>Aspect ratio 16:9</li>
                            <li>Recommended size 1024x576</li>
                        </ul>
                    </div>
                )}
            </div>

            {errors[name] && (
                <span className="text-red-500 text-sm">Please select a file</span>
            )}
        </div>
    )
}

export default Upload
