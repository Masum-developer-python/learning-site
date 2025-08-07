import { classes } from "../data";
import React, { useState, useEffect } from "react";

export default function Class() {
  const [course, setCourse] = useState("");
  const [cls, setCls] = useState("");

  useEffect(() => {
    setCls("");
  }, [course]);
  // console.log(classes);
  // console.log(course);
  // console.log(cls);
  // console.log(cls.replace("youtu.be/", "www.youtube.com/embed/"));
  return (
    <div className="w-[80%] h-[80%] p-1 mx-auto">
      <div className="flex space-x-4 mb-4 mx-auto">
        <select
          className="mt-1 block w-[49%] border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => {
            setCourse(e.target.value);
          }}
          value={course}
        >
          <option value="">Select a course</option>
          {classes.map((classItem, index) => (
            <option key={index} value={classItem.course}>
              {classItem.course}
            </option>
          ))}
        </select>
        <select
          className="mt-1 block w-[49%] border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => {
            setCls(e.target.value);
          }}
          value={cls}
          disabled={!course}
        >
          <option value="">Select a class</option>
          {classes
            .filter((classItem) => classItem.course === course)
            .flatMap((classItem, index) =>
              classItem.classes.map((classDetail, classIndex) => (
                <option key={`${index}-${classIndex}`} value={classDetail.link}>
                  {classDetail.class} : {classDetail.topic} ---:--- <span className="text-right">{classDetail.link}</span>
                </option>
              ))
            )}
        </select>
      </div>
      {cls && (
        <iframe
          className="w-[100%] aspect-video mx-auto p-1 rounded-lg shadow-lg"
          src={
            cls.replace("youtu.be/", "www.youtube.com/embed/") +
            "?rel=0&controls=1&showinfo=0"
          }
          title="Video Player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          referrerPolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
      )}
    </div>
  );
}

// import { classes } from "../data";

// import React, { useState, useEffect } from "react";

// export default function Class() {
//   const [course, setCourse] = useState([]);
//   const [cls, setCls] = useState([]);
//   console.log(classes);
//   console.log(course);
//   return (
//     <div>
//       <h1>Class Page</h1>
//       <select
//         className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
//         onChange={(e) => {
//           const selectedClass = e.target.value;
//           console.log(`Selected class: ${selectedClass}`);
//           setCourse(selectedClass);
//         }}
//       >
//         <option value="">Select a course</option>
//         {classes.map((classItem, index) => (
//           <option key={index} value={classItem.course}>
//             {classItem.course}
//           </option>
//         ))}
//       </select>
//       <br />
//       <select
//         className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
//         onChange={(e) => {
//           const selectedClass = e.target.value;
//           console.log(`Selected class: ${selectedClass}`);
//           setCls(selectedClass);
//         }}
//       >
//         <option value="">Select a class</option>
//         {classes
//           .filter((classItem) => classItem.course === course)
//           .flatMap((classItem, index) =>
//             classItem.classes.map((classDetail, classIndex) => (
//               <option key={`${index}-${classIndex}`} value={classDetail.class}>
//                 {classDetail.link}
//               </option>
//             ))
//           )}
//       </select>

//       <iframe
//         className="w-full h-full"
//         src={cls.replace("youtu.be/", "www.youtube.com/embed/")}
//         title="Video Player"
//         frameborder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//         referrerpolicy="strict-origin-when-cross-origin"
//         allowFullScreen
//       ></iframe>
//     </div>
//   );
// }
