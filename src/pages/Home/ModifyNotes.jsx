import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";

const ModifyNotes = ({ closeModal }) => {
  const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [date, setDate] = useState(currentDate);
  const [error, setError] = useState("");
  const isPinned = false;
  const isDone = false;
  const handleEdit = () => {
    console.log("Edit note");
  };

  const handleDelete = () => {
    console.log("Delete note");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddTag(event.target.value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({
      title,
      content,
      isPinned,
      isDone,
      tags,
      date,
    });

    // Clear input fields after submission (optional)
    setTitle("");
    setContent("");
    setTags([]);
    setDate(currentDate);
  };
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (tagInput.trim() !== "" && tags.length < 5) {
      const newTag = tagInput.trim();
      const updatedTags = [...tags, { text: newTag, color: getRandomColor() }];
      setTags(updatedTags);
      setTagInput(""); // Clear tag input after adding tag
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    const updatedTags = tags.filter((index) => index !== indexToRemove);
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

  const addNote = async () => {
    const specialCharsRegex = /^[a-zA-Z0-9\s]*$/;

    if (title.trim() === "" && !specialCharsRegex.test(title)) {
      setError("Error:", "Title cannot be empty");
      return;
    }
    if (content.trim() === "") {
      setError("Error:", "Content cannot be empty");
      return;
    }
    if (tags.length === 0) {
      setError("Error:", "Please add at least one tag");
      return;
    } //add freedom of not choosing the tags....
    if (tags.length > 0) {
      for (const tag of tags) {
        if (!specialCharsRegex.test(tag.text)) {
          setError("Error:", "Tag contains special characters");
          return;
        }
      }
    }
    if (date.trim() === "") {
      setError("Error:", "Please select a date");
      return;
    }

    const newNote = [{ title, content, date, tags, isPinned, isDone }];
    // Replace with the actual note ID nodeData._id
    try {
      // const res = await post("http://localhost:8000/add-notes", newNote);
      console.log(newNote);
      if (res.status === 200) {
        console.log("Note added successfully");
        closeModal();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError("Error:", error.response.data.message);
      }
    }
  };

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
                className="badge"
                style={{ backgroundColor: tag.color }}
              >
                {tag.text}
                <FaTimes
                  onClick={() => handleRemoveTag(index)}
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
                onKeyDown={handleKeyDown}
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
            onClick={addNote}
          >
            Save
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </>
  );
};

export default ModifyNotes;
