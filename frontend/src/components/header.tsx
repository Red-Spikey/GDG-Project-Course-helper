import { useState } from "react";
import { AddCourseModal } from "./AddCourseModal.tsx";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
        // Clear session data (e.g., token)
        localStorage.removeItem("token");

        // Redirect to sign-in page and replace history
        navigate("/signin", { replace: true });
    };

    const handleAddCourse = (courseData: {
        title: string;
        credits: string;
        discription: string;
        img_url: string;
    }) => {
        console.log("New Course Data:", courseData);
        // Handle the new course data (e.g., send to backend or update local state)
    };

    return (
        <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50">
            <div className="flex flex-wrap items-center justify-between gap-5 w-full">
                <div className="flex items-center space-x-12">
                    <div className="font-extrabold text-xl text-gray-800 md:text-5xl lg:text-4xl leading-tight tracking-tight text-cyan-500">
                        Course Helper
                    </div>
                </div>

                <div className="flex max-lg:ml-auto space-x-4">
                    <div className="px-4 py-2 text-sm rounded-full font-bold text-gray-600 border-2 border-[#A7ACBA] bg-[#fffff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#A7ACBA]">
                        {localStorage.getItem("username")}
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 text-sm rounded-full font-bold text-gray-500 border-2 bg-transparent hover:bg-gray-50 transition-all ease-in-out duration-300">
                        Add Course
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
                        LogOut
                    </button>
                </div>
            </div>

            {/* Add Course Modal */}
            <AddCourseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddCourse}
            />
        </header>
    );
};
