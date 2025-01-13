// import { Card } from "../components/card";
import { Header } from "../components/header";

import { CourseList } from "../components/CourseList";

export const Courses = () => {
  return (
    <div>
        <Header />
        <div className="container mx-auto p-4">
            {/* <h1 className="text-2xl font-bold mb-6">Available Courses</h1> */}
            <CourseList />
        </div>
    </div>
  );
};


// export const Courses = () => {
//     return (
//         <div>
//             <Header />
//             <div className="p-6">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                     <Card 
//                         authorName={"Aman"}
//                         title={"React Basics"}
//                         credits={"12"}
//                         description={"Learn the fundamentals of React including components, state, and props."}
//                         image={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"}
//                     />
//                     <Card 
//                         authorName={"Aman"}
//                         title={"Advanced React"}
//                         credits={"15"}
//                         description={"Dive deeper into React with hooks, context API, and advanced state management."}
//                         image={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"}
//                     />
//                     <Card 
//                         authorName={"Aman"}
//                         title={"CSS for Beginners"}
//                         credits={"8"}
//                         description={"A beginner-friendly guide to mastering CSS and creating responsive designs."}
//                         image={"https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg"}
//                     />
//                     <Card 
//                         authorName={"Aman"}
//                         title={"CSS for Beginners"}
//                         credits={"8"}
//                         description={"A beginner-friendly guide to mastering CSS and creating responsive designs."}
//                         image={"https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg"}
//                     />
//                     <Card 
//                         authorName={"Aman"}
//                         title={"CSS for Beginners"}
//                         credits={"8"}
//                         description={"A beginner-friendly guide to mastering CSS and creating responsive designs."}
//                         image={"https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg"}
//                     />
//                     <Card 
//                         authorName={"Aman"}
//                         title={"CSS for Beginners"}
//                         credits={"8"}
//                         description={"A beginner-friendly guide to mastering CSS and creating responsive designs."}
//                         image={"https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg"}
//                     />
//                     <Card 
//                         authorName={"Aman"}
//                         title={"CSS for Beginners"}
//                         credits={"8"}
//                         description={"A beginner-friendly guide to mastering CSS and creating responsive designs."}
//                         image={"https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg"}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };
