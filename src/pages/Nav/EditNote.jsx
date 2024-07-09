import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editNote } from '../../slices/noteSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { RxCrossCircled } from 'react-icons/rx';

const EditNote = ({ closeModal }) => {
  const { noteId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notes, loading, error } = useSelector((state) => state.notes);
  const note = notes.find((note) => note._id === noteId) || {};

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    setTitle(note.title || '');
    setContent(note.content || '');
    setTags(note.tags || []);
  }, [note]);

  const handleAddTag = () => {
    if (tagInput.trim() !== '' && tags.length < 5) {
      const newTag = tagInput.trim();
      setTags([...tags, newTag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleEditNote = (e) => {
    e.preventDefault();
    dispatch(editNote({ noteId, noteData: { title, content, tags } }));
    closeModal();
    navigate('/get-all-notes'); // Redirect to notes page after successful edit
  };

  return (
    <div>
      <div className="flex justify-end max-w-md mx-auto mt-3">
        <a
          role="button"
          className="badge badge-secondary w-8 h-8 m-0 p-0"
          onClick={() => {
            closeModal();
            navigate('/get-all-notes');
          }}
        >
          <RxCrossCircled size={32} />
        </a>
      </div>
      <form className="max-w-md mx-auto bg-white p-8 rounded shadow-lg" onSubmit={handleEditNote}>
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
            className="input input-bordered input-accent w-full"
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
       
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-outline btn-primary mr-2"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default EditNote;
