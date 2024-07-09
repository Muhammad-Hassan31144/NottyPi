import React from 'react';

const UpdateNotePinned = () => {
  // const dispatch = useDispatch();
  // const { loading, error } = useSelector((state) => state.notes);

  // const handleUpdatePinned = () => {
  //   dispatch(updateNotePinned({ noteId, isPinned: !currentPinnedStatus }));
  // };

  return (
    <div>
      {/* <button onClick={handleUpdatePinned} disabled={loading}>
        {currentPinnedStatus ? 'Unpin' : 'Pin'} Note
      </button> */}
      {error && <p>{error}</p>}
    </div>
  );
};

export default UpdateNotePinned;
