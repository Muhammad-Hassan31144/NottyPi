import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Replace with your backend URL

// Async Thunks for API Calls
export const addNote = createAsyncThunk(
  'notes/addNote',
  async (noteData, { getState, rejectWithValue }) => {
    const { token } = getState().user;
    try {
      const response = await axios.post(`${API_BASE_URL}/add-note`, noteData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editNote = createAsyncThunk(
  'notes/editNote',
  async ({ noteId, noteData }, { getState, rejectWithValue }) => {
    const { token } = getState().user;
    try {
      const response = await axios.put(`${API_BASE_URL}/edit-note/${noteId}`, noteData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllNotes = createAsyncThunk(
  'notes/getAllNotes',
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().user;
    try {
      const response = await axios.get(`${API_BASE_URL}/get-all-notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (noteId, { getState, rejectWithValue }) => {
    const { token } = getState().user;
    try {
      const response = await axios.delete(`${API_BASE_URL}/delete-note/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchNotesByContent = createAsyncThunk(
  'notes/fetchNotesByContent',
  async (searchString, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search-notes`, {
        params: { content: searchString },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// export const updateNotePinned = createAsyncThunk(
//   'notes/updateNotePinned',
//   async ({ noteId, isPinned }, { getState, rejectWithValue }) => {
//     const { token } = getState().user;
//     try {
//       const response = await axios.put(`${API_BASE_URL}/update-note-pinned/${noteId}`, { isPinned }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

const noteSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes.push(action.payload.note);
      })
      .addCase(addNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(editNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(editNote.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.notes.findIndex(note => note._id === action.payload.note._id);
        if (index !== -1) {
          state.notes[index] = action.payload.note;
        }
      })
      .addCase(editNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getAllNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload.notes;
      })
      .addCase(getAllNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = state.notes.filter(note => note._id !== action.meta.arg);
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchNotesByContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotesByContent.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload.notes;
      })
      .addCase(fetchNotesByContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default noteSlice.reducer;
