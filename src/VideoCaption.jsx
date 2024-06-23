import React, { useState, useEffect } from 'react';


const VideoCaption = () => {
    let [videoUrl, setVideoUrl] = useState('');
    const [caption, setCaption] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [submittedUrl, setSubmittedUrl] = useState(null);
    const [subtitleUrl, setSubtitleUrl] = useState(null);

    let handleSubmit = (event) => {

        if (!videoUrl || !startTime || !endTime || !caption) {
            toast.error("Please Enter all field")
            return;
        }
        const timeRegex = /^(?:([01]\d|2[0-3])):(?:([0-5]\d)):(?:([0-5]\d))(\.\d{1,3})?$/;
        if (!timeRegex.test(startTime)) {
            alert('Invalid start time format. Use hh:mm:ss.ms');
            return;
        }

        if (!timeRegex.test(endTime)) {
            alert('Invalid end time format. Use hh:mm:ss.ms');
            return;
        }

        event.preventDefault();
        if (caption && startTime && endTime) {
            console.log("hello")
            const subtitleContent = `
WEBVTT

1
${startTime} --> ${endTime}
${caption}
`;
            const blob = new Blob([subtitleContent.trimStart()], { type: 'text/vtt' });
            setSubtitleUrl(URL.createObjectURL(blob));
            if (blob) {
                setSubmittedUrl(videoUrl);
                console.log(videoUrl)
            }
            setVideoUrl('');
            setStartTime('');
            setEndTime('');
            setCaption('');
        }
    };
 
    return (
        <div className="md:w-[calc(100%-8rem)] h-[100%] mr-4 ml-4 mb-4 md:ml-[8rem] md:mr-[8rem] rounded-xl flex md:flex-row flex-col items-center">
            <form onSubmit={handleSubmit} className="bg-gray-800 shadow-xl md:w-[45%] h-[52vh] min-h-[25rem] rounded px-8 pt-6 pb-8 animate-fadeIn">
                <div className="mb-4">
                    <label className="block text-gray-100 text-sm font-bold mb-2">
                        Video URL:
                        <input
                            type="text"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            placeholder="Enter video URL"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-100 text-sm font-bold mb-2">
                        Start Time: (hh:mm:ss.ms)
                        <input
                            type="text"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            placeholder="00:00:00.000"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-100 text-sm font-bold mb-2">
                        End Time: (hh:mm:ss.ms)
                        <input
                            type="text"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            placeholder="00:00:00.000"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-100 text-sm font-bold mb-2">
                        Caption:
                        <input
                            type="text"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Enter caption text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </label>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </div>
            </form>
            {submittedUrl && <div className="md:w-[45%] w-full h-full md:pt-[7.4rem] mt-4 md:m-10 md:ml-14 md:mt-14">
                <video src={submittedUrl} type="video/mp4" controls className="w-full rounded-lg shadow-md animate-fadeInUp">
                    <source />
                    {subtitleUrl && <track src={subtitleUrl} kind="subtitles" srcLang="en" label="English" default />}
                    Your browser does not support the video tag.
                </video>
            </div>}
        </div>
    );
};

export default VideoCaption;