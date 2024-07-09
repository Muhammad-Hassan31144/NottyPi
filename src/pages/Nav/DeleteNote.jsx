import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote } from '../../slices/noteSlice';

const DeleteNote = ({ noteId }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.notes);

  const handleDeleteNote = () => {
    dispatch(deleteNote(noteId));
  };

  return (
    <div>
      <button onClick={handleDeleteNote} disabled={loading}>
        Delete Note
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default DeleteNote;
