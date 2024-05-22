import React, { useState } from "react";
import Note from "../../components/Cards/Note";

const NotesPagination = ({ noteData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of notes to display per page

  const indexOfLastNote = currentPage * itemsPerPage;
  const indexOfFirstNote = indexOfLastNote - itemsPerPage;
  const currentNotes = noteData.slice(indexOfFirstNote, indexOfLastNote);

  const totalPages = Math.ceil(noteData.length / itemsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <section className="flex flex-col">
    <div className="flex items-center flex-wrap gap-5 max-w-screen-xl min-h-screen mx-auto px-6">
      {/* Render the current page of notes */}
      {currentNotes.map((note, index) => (
        <Note key={index} noteData={note} />
      ))}
    </div>

      {/* Pagination controls */}
      <div className="inline-flex items-center justify-center gap-3 mt-4">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className="inline-flex size-8 items-center justify-center rounded border border-gray-800 bg-primary text-gray-900 rtl:rotate-180"
        >
          <span className="sr-only">Previous Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <p className="text-xs text-gray-900">
          {currentPage} / {totalPages}
        </p>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="inline-flex size-8 items-center justify-center rounded border border-gray-800 bg-primary text-gray-900 rtl:rotate-180"
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default NotesPagination;
