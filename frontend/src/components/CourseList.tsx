import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "../components/card";
import { BACKEND_URL } from "../config";

// Define a TypeScript interface for course data
interface Course {
    id: string;
    author:{name: string};
    title: string;
    credits: string;
    discription: string;
    img_url: string;
}

export const CourseList = () => {
  const [courses, setCourses] = useState<Course[]>([]); // State to hold course data
  const [loading, setLoading] = useState<boolean>(true); // State to track loading
  const [error, setError] = useState<string | null>(null); // State to track errors

  useEffect(() => {
    // Fetch courses from the API using Axios
    const fetchCourses = async () => {
      try {
        // const response = await axios.get<Course[]>(`${BACKEND_URL}/api/v1/addcourses/bulk`, ); // Response data is an array of Course
        const response = await axios.get(`${BACKEND_URL}/api/v1/addcourses/bulk`, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`  // Corrected method for accessing localStorage
            }
        });
        console.log(response.data.course);
        setCourses(response.data.course); // Set courses to the fetched data
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch courses"); // Detailed error message
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    };

    fetchCourses();
  }, []); // Empty dependency array ensures this runs only once

  if (loading) {
    return <div>Loading courses...</div>; // Show a loading message while fetching
  }

  if (error) {
    return <div>Error: {error}</div>; // Show an error message if the fetch fails
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {courses.map((course, _) => (
        <Card
            key={course.id}
          id={course.id}
          authorName={course.author.name}
          title={course.title}
          credits={course.credits}
          discription={course.discription}
          image={course.img_url}
        />
      ))}
    </div>
  );
};
