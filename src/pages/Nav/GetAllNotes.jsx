import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotes } from "../../slices/noteSlice";
import Note from "../../components/Cards/Note";

const GetAllNotes = () => {
  const dispatch = useDispatch();
  const { notes, loading, error } = useSelector((state) => state.notes);

  useEffect(() => {
    dispatch(getAllNotes());
  }, [dispatch]);

  return (
    <div>
      <h2>All Notes</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {notes.length === 0 && !loading && (
        <div className="alert alert-info shadow-lg">
          <div>
            <span className="font-bold">Info:</span>
            <span>
              There are no notes at the moment. Add a new note to get started!
            </span>
          </div>
        </div>
      )}
      <ul>
        {notes.map((note) => (
          <Note key={note._id} noteData={note} />
        ))}
      </ul>
    </div>
  );
};

export default GetAllNotes;
