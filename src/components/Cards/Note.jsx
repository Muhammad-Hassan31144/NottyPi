// import { PiPushPinBold, PiPushPinSlashBold } from "react-icons/pi";
// import { FaRegEdit } from "react-icons/fa";
// import { MdDeleteForever } from "react-icons/md";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import ReactModal from "react-modal";
// import { useNavigate } from "react-router-dom";
// import { deleteNote, editNote } from "../../slices/noteSlice"; // import your actions
// import EditNote from "../../pages/Nav/EditNote";

// const Note = ({ noteData }) => {
//   const { _id, title, content, isPinned, isDone, tags, date } = noteData;
//   const [isitPinned, setIsItPinned] = useState(isPinned);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handlePinToggle = () => {
//     const updatedNoteData = { ...noteData, isPinned: !isitPinned };
//     setIsItPinned(!isitPinned);
//     dispatch(editNote({ noteId: _id, noteData: updatedNoteData }));
//   };

//   const openEditModal = () => {
//     setIsEditModalOpen(true);
//     navigate(`/edit-note/${_id}`);
//   };

//   const closeEditModal = () => {
//     setIsEditModalOpen(false);
//     navigate('/get-all-notes');
//   };

//   const openDeleteModal = () => {
//     setIsDeleteModalOpen(true);
//     navigate(`/delete-note/${_id}`);
//   };

//   const closeDeleteModal = () => {
//     setIsDeleteModalOpen(false);
//     navigate('/get-all-notes');
//   };

//   const confirmDelete = () => {
//     dispatch(deleteNote(_id));
//     closeDeleteModal();
//   };

//   const getRandomColor = () => {
//     const colors = [
//       "#F87171",
//       "#FBBF24",
//       "#34D399",
//       "#60A5FA",
//       "#A78BFA",
//       "#F472B6",
//       "#6EE7B7",
//     ];
//     const color = colors[Math.floor(Math.random() * colors.length)];
//     console.log(color);
//     return color;
//   };

//   return (
//     <>
//       <section className="flex items-center flex-wrap">
//         <div className="card border border-gray-900 w-96 bg-base-100 shadow-xl">
//           <div className="card-body">
//             <h2 className="card-title">{title}</h2>
//             <p className="text-sm">{date}</p>
//             <p>{content ? content : "Sorry, nothing to show"}</p>

//             <div className="flex gap-1">
//               {tags.map((tag, index) => (
//                 <div
//                   className="card-tags"
//                   style={{ color: getRandomColor() }}
//                   key={index}
//                 >
//                   <span className="badge badge-primary">{tag}</span>
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-between">
//               <div className="card-actions">
//                 <input
//                   type="checkbox"
//                   checked={isDone}
//                   className="checkbox tooltip"
//                   data-tip="Mark as Done"
//                 />
//               </div>
//               <div className="card-actions">
//                 <div
//                   className="flex items-end justify-end cursor-pointer tooltip"
//                   data-tip="Pin Note"
//                   onClick={handlePinToggle}
//                 >
//                   {isitPinned ? (
//                     <PiPushPinBold size={22} />
//                   ) : (
//                     <PiPushPinSlashBold size={22} />
//                   )}
//                 </div>
//               </div>
//             </div>
//             <div className="card-actions justify-end">
//               <div className="tooltip tooltip-left" data-tip="Edit Note">
//                 <a
//                   role="button"
//                   className="badge badge-secondary w-8 h-8 m-0 p-0"
//                   onClick={openEditModal}
//                 >
//                   <FaRegEdit size={18} />
//                 </a>
//               </div>
//               <div className="tooltip tooltip-right" data-tip="Delete Note">
//                 <a
//                   role="button"
//                   className="badge badge-secondary w-8 h-8 m-0 p-0"
//                   onClick={openDeleteModal}
//                 >
//                   <MdDeleteForever size={24} />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <ReactModal isOpen={isEditModalOpen} onRequestClose={closeEditModal}>
//         <EditNote closeModal={closeEditModal} />
//       </ReactModal>

//       <ReactModal isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal}>
//         <div>
//           <h2>Confirm Deletion</h2>
//           <p>Are you sure you want to delete this note?</p>
//           <button onClick={confirmDelete}>Yes</button>
//           <button onClick={closeDeleteModal}>No</button>
//         </div>
//       </ReactModal>
//     </>
//   );
// };

// export default Note;
import { PiPushPinBold, PiPushPinSlashBold } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import { deleteNote, editNote } from "../../slices/noteSlice";
import EditNote from "../../pages/Nav/EditNote";

const Note = ({ noteData }) => {
  const { _id, title, content, isPinned, isDone, tags, date } = noteData;
  const [isitPinned, setIsItPinned] = useState(isPinned);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePinToggle = () => {
    const updatedNoteData = { isPinned: !isitPinned };
    setIsItPinned(!isitPinned);
    dispatch(editNote({ noteId: _id, noteData: updatedNoteData }))
      .unwrap()
      .catch((error) => {
        console.error('Failed to toggle pin:', error);
      });
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
    navigate(`/edit-note/${_id}`);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    navigate('/get-all-notes');
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
    navigate(`/delete-note/${_id}`);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    navigate('/get-all-notes');
  };

  const confirmDelete = () => {
    dispatch(deleteNote(_id));
    closeDeleteModal();
  };

  const getRandomColor = () => {
    const colors = [
      "#F87171",
      "#FBBF24",
      "#34D399",
      "#60A5FA",
      "#A78BFA",
      "#F472B6",
      "#6EE7B7",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
      <section className="flex items-center flex-wrap">
        <div className="card border border-gray-900 w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p className="text-sm">{date}</p>
            <p>{content ? content : "Sorry, nothing to show"}</p>

            <div className="flex gap-1">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: getRandomColor() }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <div className="card-actions">
                <input
                  type="checkbox"
                  checked={isDone}
                  className="checkbox tooltip"
                  data-tip="Mark as Done"
                />
              </div>
              <div className="card-actions">
                <div
                  className="flex items-end justify-end cursor-pointer tooltip"
                  data-tip="Pin Note"
                  onClick={handlePinToggle}
                >
                  {isitPinned ? (
                    <PiPushPinBold size={22} />
                  ) : (
                    <PiPushPinSlashBold size={22} />
                  )}
                </div>
              </div>
            </div>
            <div className="card-actions justify-end mt-4">
              <div className="tooltip tooltip-left" data-tip="Edit Note">
                <a
                  role="button"
                  className="badge badge-secondary w-8 h-8 m-0 p-0"
                  onClick={openEditModal}
                >
                  <FaRegEdit size={18} />
                </a>
              </div>
              <div className="tooltip tooltip-right" data-tip="Delete Note">
                <a
                  role="button"
                  className="badge badge-secondary w-8 h-8 m-0 p-0"
                  onClick={openDeleteModal}
                >
                  <MdDeleteForever size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReactModal isOpen={isEditModalOpen} onRequestClose={closeEditModal}>
        <EditNote closeModal={closeEditModal} />
      </ReactModal>

      <ReactModal isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal}>
        <div>
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this note?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={closeDeleteModal}>No</button>
        </div>
      </ReactModal>
    </>
  );
};

export default Note;
