// // import React, { useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { addNote } from '../../slices/noteSlice';

// // const AddNote = () => {
// //   const [title, setTitle] = useState('');
// //   const [content, setContent] = useState('');
// //   const [tags, setTags] = useState('');
// //   const dispatch = useDispatch();
// //   const { loading, error } = useSelector((state) => state.notes);

// //   const handleAddNote = (e) => {
// //     e.preventDefault();
// //     const tagsArray = tags.split(',').map(tag => tag.trim());
// //     dispatch(addNote({ title, content, tags: tagsArray }));
// //   };

// //   return (
// //     <div>
// //       <h2>Add Note</h2>
// //       <form onSubmit={handleAddNote}>
// //         <input
// //           type="text"
// //           placeholder="Title"
// //           value={title}
// //           onChange={(e) => setTitle(e.target.value)}
// //         />
// //         <textarea
// //           placeholder="Content"
// //           value={content}
// //           onChange={(e) => setContent(e.target.value)}
// //         ></textarea>
// //         <input
// //           type="text"
// //           placeholder="Tags (comma separated)"
// //           value={tags}
// //           onChange={(e) => setTags(e.target.value)}
// //         />
// //         <button type="submit" disabled={loading}>
// //           Add Note
// //         </button>
// //         {error && <p>{error}</p>}
// //       </form>
// //     </div>
// //   );
// // };

// // export default AddNote;
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addNote } from '../../slices/noteSlice';
// import { FaTimes } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const AddNote = () => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [tags, setTags] = useState([]);
//   const [tagInput, setTagInput] = useState('');
//   // const [date, setDate] = useState('');
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.notes);

//   const handleAddTag = () => {
//     if (tagInput.trim() !== '' && tags.length < 5) {
//       const newTag = tagInput.trim();
//       setTags([...tags, newTag]);
//       setTagInput('');
//     }
//   };

//   const handleRemoveTag = (tagToRemove) => {
//     setTags(tags.filter(tag => tag !== tagToRemove));
//   };

//   const handleAddNote = (e) => {
//     e.preventDefault();
//     dispatch(addNote({ title, content, tags }));
//     navigate("/get-all-notes");
//   };

//   return (
//     <div>
      
//       <form className="max-w-md mx-auto bg-white p-8 rounded shadow-lg" onSubmit={handleAddNote}>
//         <div className="mb-4">
//           <label
//             htmlFor="title"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Title:
//           </label>
//           <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Enter title"
//             required
//             className="input input-bordered input-accent w-full"
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="content"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Content:
//           </label>
//           <textarea
//             id="content"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             placeholder="Enter content"
//             required
//             rows={6}
//             className="textarea textarea-accent w-full"
//           ></textarea>
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="tags"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Tags:
//           </label>
//           <div className="flex flex-wrap gap-2">
//             {tags.map((tag, index) => (
//               <span
//                 key={index}
//                 className="badge badge-primary"
//               >
//                 {tag}
//                 <FaTimes
//                   onClick={() => handleRemoveTag(tag)}
//                   className="ml-2 cursor-pointer"
//                 />
//               </span>
//             ))}
//           </div>
//           {tags.length < 5 && (
//             <div className="flex items-center mt-2">
//               <input
//                 type="text"
//                 value={tagInput}
//                 onChange={(e) => setTagInput(e.target.value)}
//                 placeholder="Enter tag"
//                 className="input input-bordered input-accent w-full max-w-xs mr-2"
//               />
//               <button
//                 type="button"
//                 onClick={handleAddTag}
//                 className="btn btn-xs btn-outline"
//               >
//                 Add Tag
//               </button>
//             </div>
//           )}
//           {tags.length >= 5 && (
//             <p className="text-red-500 text-sm mt-2">
//               Maximum limit of 5 tags reached.
//             </p>
//           )}
//         </div>
        
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="btn btn-outline btn-primary mr-2"
//             disabled={loading}
//           >
//             {loading ? 'Adding...' : 'Add Note'}
//           </button>
//         </div>
//         {error && <p className="text-red-500 text-sm">{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default AddNote;
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote } from '../../slices/noteSlice';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const colors = ['#F87171', '#34D399', '#60A5FA', '#FBBF24', '#A78BFA'];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const AddNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.notes);

  const handleAddTag = () => {
    if (tagInput.trim() !== '' && tags.length < 5) {
      const newTag = {
        text: tagInput.trim(),
        color: getRandomColor(),
      };
      setTags([...tags, newTag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag.text !== tagToRemove.text));
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    const tagsArray = tags.map(tag => tag.text);
    dispatch(addNote({ title, content, tags: tagsArray }));
    navigate("/get-all-notes");
  };

  return (
    <div>
      <form className="max-w-md mx-auto bg-white p-8 rounded shadow-lg" onSubmit={handleAddNote}>
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
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: tag.color }}
              >
                {tag.text}
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
            {loading ? 'Adding...' : 'Add Note'}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default AddNote;
