import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";
const UpdateNotes = ({ noteData, closeModal }) => {
    // const { tagss } = noteData.tags;
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (tagInput.trim() !== "" && tags.length < 5) {
      const newTag = tagInput.trim();
      const updatedTags = [...tags, { text: newTag, color: getRandomColor() }];
      setTags(updatedTags);
      setTagInput(""); // Clear tag input after adding tag
    }
  };

  const handleRemoveTag = (tagtoremove) => {
    const updatedTags = tags.filter((tag) => tag !== tagtoremove);
    setTags(updatedTags);
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
  const [newNote, setNewNote] = useState([]);
  const [error, setError] = useState("");
  const [title, setTitle] = useState(noteData.title);
  const [content, setContent] = useState(noteData.content);
  const [tags, setTags] = useState(noteData.tags);
  const [date, setDate] = useState(noteData.date);
//   const [isPinned, setIsPinned] = useState(noteData.isPinned);
//   const [isCompleted, setIsCompleted] = useState(noteData.isCompleted);
  const saveNote = async () => {
    const note = [
      ...noteData,
      {
        title,
        content,
        ...tags,
        date,
        isPinned,
        isCompleted,
      },
    ];
    setNewNote(note);
    console.log(newNote);
    closeModal();
    setError("WOW");
    
  };
  console.log(tags);
  return (
    <>
      <div className="flex justify-end max-w-md mx-auto mt-3">
        <a
          role="button"
          className="badge badge-secondary w-8 h-8 m-0 p-0"
          onClick={closeModal}
        >
          <RxCrossCircled size={32} />
        </a>
      </div>
      <form className="max-w-md mx-auto bg-white p-8 rounded shadow-lg">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
            className="input input-bordered input-accent w-full "
          />
        </div>
        {/* <div className="mb-4">
          <label
            htmlFor="isPinned"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Completed:
            <input
              type="checkbox"
              id="isPinned"
              value={isPinned}
              onChange={(e) => setIsPinned(!isPinned)}
            />
          </label>
        </div> */}
        {/* <div className="mb-4">
          <label
            htmlFor="isCompleted"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Completed:
            <input
              type="checkbox"
              id="isCompleted"
              value={isCompleted}
              onChange={(e) => setIsCompleted(!isCompleted)}
            />
          </label>
        </div> */}
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content:
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter content"
            required
            rows={6}
            className="textarea textarea-accent w-full"
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tags:
          </label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="badge badge-primary"
                
              >
                {tag}
                <FaTimes
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 cursor-pointer"
                />
              </span>
            ))}
          </div>
          {tags.length < 5 && (
            <div className="flex items-center mt-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Enter tag"
                className="input input-bordered input-accent w-full max-w-xs mr-2"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="btn btn-xs btn-outline"
              >
                Add Tag
              </button>
            </div>
          )}
          {tags.length >= 5 && (
            <p className="text-red-500 text-sm mt-2">
              Maximum limit of 5 tags reached.
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date:
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input input-bordered input-accent w-full"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-outline btn-primary mr-2"
            onClick={saveNote}
          >
            Save
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </>
  );
};

export default UpdateNotes;
