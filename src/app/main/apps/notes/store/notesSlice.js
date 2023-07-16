import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";
import { api } from "src/app/auth/services/api";

export const getNotes = createAsyncThunk(
  "notesApp/notes/getNotes",
  async (routeParams) => {
    const { filter, id } = routeParams;

    let url;

    if (filter === "labels") {
      url = `/api/note/note/labels/${id}`;
    } else if (filter === "archive") {
      url = `/api/note/note/archive?archived=true`;
    } else if (filter === "reminders") {
      url = `/api/notes/reminders`;
    } else {
      url = `/api/note/notes`;
    }

    const response = await api.get(url, {
      params: {
        archived: filter === "archive" ? "true" : "false",
      },
    });
    const data = await response.data;

    return data;
  }
);




export const createNote = createAsyncThunk(
  "notesApp/notes/createNote",
  async (note, { dispatch }) => { // Add { dispatch } as the second parameter
    try {
    const formData = new FormData();

    formData.append("title", note.title);
    formData.append("content", note.content);
    formData.append("archived", note.archived);
    // Ajoutez les autres attributs de la note à formData

    // Vérifiez si l'attribut "image" est un objet File
    if (note.image instanceof File) {
      formData.append("image", note.image);
    }

    const response = await api.post("/api/note/note", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = await response.data;
    dispatch(
      showMessage({
        message: "Note created successfully!",
        variant: "success",
      })
    );

    return data;
  } catch (error) {
    dispatch(showMessage({ message: error.message }));
    throw error;
  }
}
);


export const updateNote = createAsyncThunk(
  "notesApp/notes/updateNote",
  async (note, { dispatch }) => { // Add { dispatch } as the second parameter
    try {
    const response = await api.put(`/api/note/note/${note.id}`, note);
    const data = await response.data;

    dispatch(
      showMessage({
        message: "Note updated successfully!",
        variant: "success",
      })
    );

    return data;
  } catch (error) {
    dispatch(showMessage({ message: error.message }));
    throw error;
  }
}
);

export const removeNote = createAsyncThunk(
  "notesApp/notes/removeNote",
  async (id, { dispatch }) => { // Add { dispatch } as the second parameter
    try {
    const response = await api.delete(`/api/note/note/${id}`);
    const data = await response.data;

    dispatch(
      showMessage({
        message: "Note removed successfully!",
        variant: "success",
      })
    );

    dispatch(closeNoteDialog());

    return data;
  } catch (error) {
    dispatch(showMessage({ message: error.message }));
    throw error;
  }
}
);

const notesAdapter = createEntityAdapter({
  selectId: (note) => note._id
});


export const {
  
  selectAll: selectNotes,
  selectEntities: selectNotesEntities,
  selectById: selectNoteById,
} = notesAdapter.getSelectors((state) => state.notesApp.notes);

const notesSlice = createSlice({
  name: "notesApp/notes",
  initialState: notesAdapter.getInitialState({
    searchText: "",
    noteDialogId: null,
    variateDescSize: true,
  }),
  reducers: {
    setNotesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
    resetNotesSearchText: (state, action) => {
      state.searchText = "";
    },
    toggleVariateDescSize: (state, action) => {
      state.variateDescSize = !state.variateDescSize;
    },
    openNoteDialog: (state, action) => {
      state.noteDialogId = action.payload;
    },
    closeNoteDialog: (state, action) => {
      state.noteDialogId = action.null;
    },
  },
  extraReducers: {
    [getNotes.fulfilled]: notesAdapter.setAll,
    [createNote.fulfilled]: notesAdapter.addOne,
    [updateNote.fulfilled]: notesAdapter.upsertOne,
    [removeNote.fulfilled]: notesAdapter.removeOne,
  },
});

export const {
  setNotesSearchText,
  resetNotesSearchText,
  toggleVariateDescSize,
  openNoteDialog,
  closeNoteDialog,
} = notesSlice.actions;

export const selectVariateDescSize = ({ notesApp }) =>
  notesApp.notes.variateDescSize;

export const selectSearchText = ({ notesApp }) => notesApp.notes.searchText;

export const selectDialogNoteId = ({ notesApp }) => notesApp.notes.noteDialogId;

export const selectDialogNote = createSelector(
  [selectDialogNoteId, selectNotesEntities],
  (noteId, notesEntities) => {
    return notesEntities[noteId];
  }
);

export default notesSlice.reducer;
