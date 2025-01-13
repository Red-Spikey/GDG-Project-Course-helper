import { useState } from "react";
import { UpdateCourseModal } from "./UpdateCourseModal";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface cardProps {
    authorName: string;
    title: string;
    credits: string;
    discription: string; // Corrected spelling from 'discription'
    image: string; // New property for the image
    id: string;
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({ name, size = "small" }: { name: string; size?: "small" | "big" }) {
    return (
        <div
            className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${
                size === "small" ? "w-6 h-6" : "w-10 h-10"
            }`}
        >
            <span
                className={`${
                    size === "small" ? "text-xs" : "text-md"
                } font-extralight text-gray-600 dark:text-gray-300`}
            >
                {name[0]}
            </span>
        </div>
    );
}
export const Card = ({
    authorName,
    title,
    credits,
    discription,
    image,
    id
}: cardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUpdate = (updatedData: { title: string; credits: string; discription: string }) => {
        console.log("Updated Data:", updatedData);
        // Handle the updated data (e.g., send to backend or update local state)
    };

    const sendRequest = async (id: string) => {
        // console.log("Deleted Data:", id);
        // Handle the updated data (e.g., send to backend or update local state)
        await axios.delete(`${BACKEND_URL}/api/v1/addcourses/delete`, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`  // Corrected method for accessing localStorage
            },
            data: {
                id: id
            }
        });
    }

    const handleDelete = async (id : string) => {
        try {
            await sendRequest(id); // Call the sendRequest function to make the API request
            window.location.reload(); // Reload the page to fetch the updated course list
        } catch (error) {
            console.error("Error while submitting the course:", error);
        }
    };

    return (
        <div className="max-w-md rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            {/* Image Section */}
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            
            {/* Content Section */}
            <div className="p-4">
                {/* Author and Date */}
                <div className="flex items-center mb-2">
                    <Avatar name={authorName} />
                    <div className="font-light pl-2 text-sm">{authorName}</div>
                    {/* <div className="pl-2 flex items-center">
                        <Circle />
                    </div>
                    <div className="pl-2 font-thin text-slate-500 text-sm">{publishDate}</div> */}
                </div>

                {/* Title */}
                <div className="text-lg font-semibold mb-2">{title}</div>

                {/* Credits */}
                <div className="text-sm text-slate-500 mb-2">Credits: {credits}</div>

                {/* Description */}
                <div className="text-sm text-gray-700 mb-4">
                    {discription.slice(0, 100) + "..."}
                </div>

                {/* Update Course Button */}
                {/* {authorName === localStorage.getItem("userid") ? ( */}
                <div className="flex justify-between space-x-2">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600"
                    >
                        Update Course
                    </button>
                    <button
                        onClick={() => {handleDelete(id)}}
                        className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
                {/* ) : null} */}
            </div>

            {/* Update Course Modal */}
            <UpdateCourseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleUpdate}
                initialData={{ title, credits, discription, img_url: image, id: id }}
            />

        </div>
    );
};
