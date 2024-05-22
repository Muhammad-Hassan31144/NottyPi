import { PiPushPinBold, PiPushPinSlashBold } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { useState } from "react";

import ReactModal from "react-modal";
import UpdateNotes from "../../pages/Home/UpdateNotes";
const Note = ({ noteData }) => {
  const { title, content, isPinned, isDone, tags, date } = noteData;
  const [isitPinned, setIsItPinned] = useState(false);
  const [isitDone, setIsItDone] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDoneToggle = () => {
    setIsItDone(!isitDone);
  };

  const handlePinToggle = (isitPinned) => {
    setIsItPinned(!isitPinned);
  };
  const handleCmpToggle = (isitDone) => {
    setIsItDone(!isitDone);
    console.log(isitDone);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const onPin = () => {};
  const onDone = () => {};
  const onEdit = () => {
    setIsModalOpen(true);
  };
  const onDelete = () => {};

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
            <p className="text-sm ">{date}</p>
            <p>{content ? content : "Sorry Nothing to show"}</p>

            <div className="flex gap-1">
              {tags.map((tag, index) => (
                <div
                  className="card-tags"
                  style={{ color: getRandomColor() }}
                  key={index}
                >
                  <span className="badge badge-primary">{tag}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <div className=" card-actions">
                <input
                  type="checkbox"
                  value={isDone}
                  onClick={handleCmpToggle}
                  className="checkbox tooltip"
                  data-tip="Mark as Done"
                />
              </div>
              <div className="card-actions">
                <div
                  className="flex items-end justify-end cursor-pointer tooltip"
                  data-tip="Pin Note"
                  value={isitPinned}
                  onClick={(e) => handlePinToggle(isitPinned)}
                >
                  {isitPinned ? (
                    <PiPushPinBold size={22} />
                  ) : (
                    <PiPushPinSlashBold size={22} />
                  )}
                </div>
              </div>
            </div>
            <div className="card-actions justify-end">
              <div className=" tooltip tooltip-left" data-tip="Edit Note">
                <a
                  role="button"
                  className="badge badge-secondary w-8 h-8 m-0 p-0"
                  onClick={onEdit}
                >
                  <FaRegEdit size={18} />
                </a>
              </div>
              <div className="tooltip-right tooltip" data-tip="Delete Note">
                <a
                  role="button"
                  className="badge badge-secondary w-8 h-8 m-0 p-0 "
                  onClick={onDelete}
                >
                  <MdDeleteForever size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <ReactModal
          isOpen={isModalOpen}
          ariaHideApp={false}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={{
            overlay: {
              zIndex: 1000,
              maxWidth: "100%",
              margin: "auto",
              border: "2px solid green",
            },
            content: {
              color: "#f000f2",
            },
          }}
        >
          <UpdateNotes
            style={{ border: "2px solid red" }}
            closeModal={closeModal}
            noteData={noteData}
          />
        </ReactModal>
      </section>
    </>
  );
};

export default Note;
