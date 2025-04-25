// import React, { useState, useEffect } from "react";
// import { Actor, HttpAgent } from "@dfinity/agent";
// import { idlFactory } from "./votingsystem_backend.did.js"; // Make sure to generate this
// import { Principal } from "@dfinity/principal";

// // Replace with your actual deployed canister ID
// const canisterId = "your_canister_id_here";

// const agent = new HttpAgent({ host: "https://boundary.ic0.app" });
// const votingSystem = Actor.createActor(idlFactory, {
//   agent,
//   canisterId: Principal.fromText(canisterId),
// });

// const App = () => {
//   const [questions, setQuestions] = useState([]);
//   const [voteResults, setVoteResults] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const questionsData = await votingSystem.get_all_questions();
//         setQuestions(questionsData);
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, []);

//   const handleVote = async (questionId, optionIndex) => {
//     try {
//       await votingSystem.vote(questionId, optionIndex);
//       const updatedVotes = await votingSystem.get_vote_count(questionId);
//       setVoteResults((prevResults) => ({
//         ...prevResults,
//         [questionId]: updatedVotes,
//       }));
//     } catch (error) {
//       console.error("Error submitting vote:", error);
//     }
//   };

//   return (
//     <div className="App p-6">
//       <h1 className="text-2xl font-bold mb-4">Voting System</h1>
//       {loading ? (
//         <p>Loading questions...</p>
//       ) : (
//         <div className="space-y-6">
//           {questions.map((question) => (
//             <div key={question.id} className="bg-white p-4 rounded-xl shadow">
//               <h2 className="text-lg font-semibold">{question.text}</h2>
//               <div className="flex flex-col space-y-2 mt-2">
//                 {question.options.map((option, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleVote(question.id, index)}
//                     className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
//                   >
//                     {option}
//                   </button>
//                 ))}
//               </div>
//               <div className="mt-4">
//                 <p className="font-medium">Votes:</p>
//                 {voteResults[question.id] ? (
//                   <ul className="list-disc ml-5">
//                     {voteResults[question.id].map((voteCount, index) => (
//                       <li key={index}>
//                         {question.options[index]}: {voteCount}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-sm text-gray-500">Vote count not available</p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
function App() {
  return (

    <h1>Hello</h1>
  );
  
}

export default App;