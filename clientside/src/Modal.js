// import React, {useState} from 'react';

// const Modal = (props) => {
//     const [domain, setDomain] = useState(props.onEventValue.domain);
//   const [date, setDate] = useState(props.onEventValue.date);
//   const [duration, setDuration] = useState(props.onEventValue.duration);
//   const [trainerName, setTrainerName] = useState(props.onEventValue.trainerName);
//   const [location, setLocation] = useState(props.onEventValue.location);
//     const [desc, setDesc] = useState(props.onEventValue.desc);
    
//     const handleDomainChange = (e) => {
//     setDomain(e.target.innerText);
//   };

//   const handleDateChange = (e) => {
//     setDate(e.target.innerText);
//   };

//   const handleDurationChange = (e) => {
//     setDuration(e.target.innerText);
//   };

//   const handleTrainerNameChange = (e) => {
//     setTrainerName(e.target.innerText);
//   };

//   const handleLocationChange = (e) => {
//     setLocation(e.target.innerText);
//   };

//   const handleDescChange = (e) => {
//     setDesc(e.target.innerText);
//     };
    
//     const handleUpdate = (e) => {
//         props.onHandleUpdate({ domain: domain, date: date, duration: duration, trainerName: trainerName, location: location, desc: desc });
//         props.onHandleEditClose();
//     }

//   return (
//     <div className="modal-overlay">
//       <div className="modal">
//         <div className="modal-header">
//                   <h2>{props.onEventValue.title}</h2>
//           <button onClick={props.onHandleEditClose} className="close-button">
//             X
//           </button>
//         </div>
//               <div className="modal-content">
//             <strong>Domain:</strong>
//       <p 
//         contentEditable 
//         onBlur={handleDomainChange}
//         dangerouslySetInnerHTML={{ __html: domain }}
//       />
      
//       <strong>Date:</strong>
//       <p 
//         contentEditable 
//         onBlur={handleDateChange}
//         dangerouslySetInnerHTML={{ __html: date }}
//       />
      
//       <strong>Duration:</strong>
//       <p 
//         contentEditable 
//         onBlur={handleDurationChange}
//         dangerouslySetInnerHTML={{ __html: duration }}
//       />
      
//       <strong>Trainer Name:</strong>
//       <p 
//         contentEditable 
//         onBlur={handleTrainerNameChange}
//         dangerouslySetInnerHTML={{ __html: trainerName }}
//       />
      
//       <strong>Location:</strong>
//       <p 
//         contentEditable 
//         onBlur={handleLocationChange}
//         dangerouslySetInnerHTML={{ __html: location }}
//       />
      
//       <strong>Description:</strong>
//       <p 
//         contentEditable 
//         onBlur={handleDescChange}
//         dangerouslySetInnerHTML={{ __html: desc }}
//       />
// <button onClick={handleUpdate} >Update</button>
//           </div>
//         </div>
//       </div>

//   );
// };

// export default Modal;
