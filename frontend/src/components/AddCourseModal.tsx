



import axios from "axios";
import { ChangeEvent, useState } from "react";
import { BACKEND_URL } from "../config";

interface AddCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (courseData: {
        title: string;
        credits: string;
        discription: string;
        img_url: string;
    }) => void;
}

export const AddCourseModal = ({ isOpen, onClose, onSubmit }: AddCourseModalProps) => {
    const [formData, setFormData] = useState({
        title: "",
        credits: "",
        discription: "",
        img_url:"",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Function to check if the provided image URL is valid
    const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    };

    // Function to send the request to the backend
    async function sendRequest() {
        try {
            const token = localStorage.getItem("token"); // Assuming JWT token is stored in localStorage
            if (!token) {
                alert("You are not logged in!");
                return;
            }

            // Check if all fields are filled
            if (!formData.title || !formData.credits || !formData.discription || !formData.img_url) {
                alert("All fields are required!");
                return;
            }

            // Validate the image URL
            if (!isValidUrl(formData.img_url)) {
                alert("Please provide a valid image URL");
                return;
            }

            // Send the request with the JWT token in Authorization header
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/addcourses/add`,
                formData,
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );

            alert("Course added successfully!");
        } catch (e: any) {
            console.error("Error while adding course:", e);
            if (e.response) {
                alert(`Error: ${e.response.data.message || "Unknown error"}`);
            } else {
                alert("Error while adding course");
            }
        }
    }

    // Handle form submission
    const handleSubmit = async () => {
        try {
            await sendRequest(); // Call the sendRequest function to make the API request
            onSubmit(formData); // Pass form data to the onSubmit callback
            setFormData({ title: "", credits: "", discription: "", img_url: "" }); // Reset form data
            onClose(); // Close modal
            window.location.reload(); // Reload the page to fetch the updated course list
        } catch (error) {
            console.error("Error while submitting the course:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Add Course</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 mt-1"
                            placeholder="Course title"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Credits</label>
                        <input
                            type="text"
                            name="credits"
                            value={formData.credits}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 mt-1"
                            placeholder="Number of credits"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="discription"
                            value={formData.discription}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 mt-1"
                            placeholder="Course discription"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input
                            type="text"
                            name="img_url"
                            value={formData.img_url}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 mt-1"
                            placeholder="Image URL"
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Add Course
                    </button>
                </div>
            </div>
        </div>
    );
};
