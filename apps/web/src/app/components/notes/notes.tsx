import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useLazyQuery } from '@apollo/client';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FolderIcon from '@mui/icons-material/Folder';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LogoutIcon from '@mui/icons-material/Logout';
import GridViewIcon from '@mui/icons-material/GridView';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import AddLinkIcon from '@mui/icons-material/AddLink';
import _ from 'lodash';
import dayjs from 'dayjs';
import {
  CREATE_FOLDER,
  CREATE_NOTE,
  GET_FOLDERS,
  GET_FOLDER_BY_ID,
  UPDATE_FOLDER_BY_ID,
  DELETE_FOLDER_BY_ID,
  GET_NOTES,
  GET_NOTES_BY_ID,
  UPDATE_NOTE_BY_ID,
  DELETE_NOTE_BY_ID,
} from '../../../helpers/gqlHelper';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Notes() {
  const navigate = useNavigate();

  const [folders, setFolders] = useState([]);
  const [folder, setFolder] = useState({});
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({});

  const [currentTab, setCurrentTab] = useState('');
  const [searchNotesValue, setSearchNotesValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  const [newFolderName, setNewFolderName] = useState('');
  const [editFolderName, setEditFolderName] = useState('');
  const [addNoteToFolderId, setAddNoteToFolderId] = useState('');

  const [newFolderDialogStatus, setNewFolderDialogStatus] = useState(false);
  const [editFolderDialogStatus, setEditFolderDialogStatus] = useState(false);
  const [addNoteToFolderDialogStatus, setAddNoteToFolderDialogStatus] =
    useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState('');

  const [createFolder, createFolderResult] = useMutation(CREATE_FOLDER);
  const [createNote, createNoteResult] = useMutation(CREATE_NOTE);
  const [getFolders, getFoldersResult] = useLazyQuery(GET_FOLDERS);
  const [getFolderById, getFolderByIdResult] = useLazyQuery(GET_FOLDER_BY_ID);
  const [updateFolderById, updateFolderByIdResult] =
    useMutation(UPDATE_FOLDER_BY_ID);
  const [deleteFolderById, deleteFolderByIdResult] =
    useMutation(DELETE_FOLDER_BY_ID);
  const [getNotes, getNotesResult] = useLazyQuery(GET_NOTES);
  const [getNoteById, getNoteByIdResult] = useLazyQuery(GET_NOTES_BY_ID);
  const [updateNoteById, updateNoteByIdResult] = useMutation(UPDATE_NOTE_BY_ID);
  const [deleteNoteById, deleteNoteByIdResult] = useMutation(DELETE_NOTE_BY_ID);

  console.log('createFolderResult.data = ', createFolderResult.data);
  console.log('createFolderResult.loading = ', createFolderResult.loading);
  console.log('createFolderResult.error = ', createFolderResult.error);

  console.log('createNoteResult.data = ', createNoteResult.data);
  console.log('createNoteResult.loading = ', createNoteResult.loading);
  console.log('createNoteResult.error = ', createNoteResult.error);

  console.log('getFoldersResult.data = ', getFoldersResult.data);
  console.log('getFoldersResult.loading = ', getFoldersResult.loading);
  console.log('getFoldersResult.error = ', getFoldersResult.error);

  console.log('getFolderByIdResult.data = ', getFolderByIdResult.data);
  console.log('getFolderByIdResult.loading = ', getFolderByIdResult.loading);
  console.log('getFolderByIdResult.error = ', getFolderByIdResult.error);

  console.log('updateFolderByIdResult.data = ', updateFolderByIdResult.data);
  console.log(
    'updateFolderByIdResult.loading = ',
    updateFolderByIdResult.loading
  );
  console.log('updateFolderByIdResult.error = ', updateFolderByIdResult.error);

  console.log('deleteFolderByIdResult.data = ', deleteFolderByIdResult.data);
  console.log(
    'deleteFolderByIdResult.loading = ',
    deleteFolderByIdResult.loading
  );
  console.log('deleteFolderByIdResult.error = ', deleteFolderByIdResult.error);

  console.log('getNotesResult.data = ', getNotesResult.data);
  console.log('getNotesResult.loading = ', getNotesResult.loading);
  console.log('getNotesResult.error = ', getNotesResult.error);

  console.log('getNoteByIdResult.data = ', getNoteByIdResult.data);
  console.log('getNoteByIdResult.loading = ', getNoteByIdResult.loading);
  console.log('getNoteByIdResult.error = ', getNoteByIdResult.error);

  console.log('updateNoteByIdResult.data = ', updateNoteByIdResult.data);
  console.log('updateNoteByIdResult.loading = ', updateNoteByIdResult.loading);
  console.log('updateNoteByIdResult.error = ', updateNoteByIdResult.error);

  console.log('deleteNoteByIdResult.data = ', deleteNoteByIdResult.data);
  console.log('deleteNoteByIdResult.loading = ', deleteNoteByIdResult.loading);
  console.log('deleteNoteByIdResult.error = ', deleteNoteByIdResult.error);

  useEffect(() => {
    getFolders({
      variables: {
        input: {
          users_id: localStorage.getItem('users_id'),
        },
      },
      context: {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    });

    getNotes({
      variables: {
        input: {
          users_id: localStorage.getItem('users_id'),
        },
      },
      context: {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    });
  }, [getFolders, getNotes]);

  useEffect(() => {
    if (getFoldersResult.data) {
      setFolders(getFoldersResult.data.folders);
    }
  }, [getFoldersResult.data]);

  useEffect(() => {
    if (getFolderByIdResult.data) {
      setFolder(getFolderByIdResult.data.folder);
    }
  }, [getFolderByIdResult.data]);

  useEffect(() => {
    if (getNotesResult.data) {
      setNotes(getNotesResult.data.notes);
    }
  }, [getNotesResult.data]);

  useEffect(() => {
    if (getNoteByIdResult.data) {
      setNote(getNoteByIdResult.data.note);
    }
  }, [getNoteByIdResult.data]);

  useEffect(() => {
    if (
      createFolderResult.data ||
      createNoteResult.data ||
      updateFolderByIdResult.data ||
      deleteFolderByIdResult.data ||
      updateNoteByIdResult.data ||
      deleteNoteByIdResult.data
    ) {
      window.location.reload();
    }
  }, [
    createFolderResult.data,
    createNoteResult.data,
    updateFolderByIdResult.data,
    deleteFolderByIdResult.data,
    updateNoteByIdResult.data,
    deleteNoteByIdResult.data,
  ]);

  useEffect(() => {
    if (searchNotesValue) {
      getNotes({
        variables: {
          input: {
            users_id: localStorage.getItem('users_id'),
            search_notes_value: searchNotesValue,
          },
        },
        context: {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      });
    } else {
      getNotes({
        variables: {
          input: {
            users_id: localStorage.getItem('users_id'),
          },
        },
        context: {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      });
    }
  }, [searchNotesValue, getNotes]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const input: any = {
        content: textareaValue,
        users_id: localStorage.getItem('users_id'),
      };

      const noteId = localStorage.getItem('note_id');

      if (textareaValue) {
        if (_.isEmpty(noteId)) {
          createNote({
            variables: {
              input: input,
            },
            context: {
              headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            },
          });
        } else {
          input['id'] = noteId;

          updateNoteById({
            variables: {
              input: input,
            },
            context: {
              headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            },
          });
        }
      }
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [textareaValue, createNote, updateNoteById]);

  const handleLogoutClick = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  const handleNewFolderNameClick = () => {
    if (!newFolderDialogStatus) {
      setNewFolderDialogStatus(true);
    } else {
      setNewFolderDialogStatus(false);
    }
  };

  const handleEditFolderNameClick = () => {
    if (
      !editFolderDialogStatus &&
      !_.isEmpty(localStorage.getItem('folder_id'))
    ) {
      setEditFolderDialogStatus(true);
    } else {
      setEditFolderDialogStatus(false);
      setOpenErrorSnackbar(true);
      setErrorSnackbarMessage('Please select a folder to edit');
    }
  };

  const handleAddNoteToFolderClick = () => {
    if (
      !addNoteToFolderDialogStatus &&
      !_.isEmpty(localStorage.getItem('note_id'))
    ) {
      setAddNoteToFolderDialogStatus(true);
    } else {
      setAddNoteToFolderDialogStatus(false);
      setOpenErrorSnackbar(true);
      setErrorSnackbarMessage('Please select note');
    }
  };

  const handleNewDialogClose = () => {
    setNewFolderDialogStatus(false);
  };

  const handleNewFolderNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewFolderName(e.target.value);
  };

  const handleCreateFolderName = () => {
    setNewFolderDialogStatus(false);

    createFolder({
      variables: {
        input: {
          name: newFolderName,
          users_id: localStorage.getItem('users_id'),
        },
      },
      context: {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    });
  };

  const handleEditDialogClose = () => {
    setEditFolderDialogStatus(false);
  };

  const handleEditFolderName = () => {
    setEditFolderDialogStatus(false);
    updateFolderById({
      variables: {
        input: {
          id: localStorage.getItem('folder_id'),
          name: editFolderName,
          users_id: localStorage.getItem('users_id'),
        },
      },
      context: {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    });
  };

  const handleAddNoteToFolderClose = () => {
    setAddNoteToFolderDialogStatus(false);
  };

  const handleAddNoteToFolder = () => {
    setAddNoteToFolderDialogStatus(false);
    updateNoteById({
      variables: {
        input: {
          id: localStorage.getItem('note_id'),
          content: (note as any).content,
          users_id: localStorage.getItem('users_id'),
          folder_id: addNoteToFolderId,
        },
      },
      context: {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    });
  };

  const handleErrorSnackbarClose = () => {
    setOpenErrorSnackbar(false);
  };

  const handleEditFolderNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditFolderName(e.target.value);
  };

  const handleSelectDropdownChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAddNoteToFolderId(e.target.value);
  };

  const handleSearchNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchNotesValue(e.target.value);
  };

  const handleCreateNotesClick = () => {
    const textarea = document.querySelector('#textarea');
    if (textarea) {
      (textarea as any).value = '';
    }

    setTextareaValue('');
    localStorage.removeItem('folder_id');
    localStorage.removeItem('note_id');
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const handleDeleteNoteById = (id: string) => {
    if (id) {
      deleteNoteById({
        variables: {
          input: {
            id: id,
            users_id: localStorage.getItem('users_id'),
          },
        },
        context: {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      });
    }
  };

  const handleFolderClick = (id: string, name: string) => {
    localStorage.setItem('folder_id', id);
    setCurrentTab(name);

    if (id) {
      getFolderById({
        variables: {
          id: id,
        },
        context: {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      });

      getNotes({
        variables: {
          input: {
            folder_id: id,
            users_id: localStorage.getItem('users_id'),
          },
        },
        context: {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      });
    }
  };

  const handleNoteClick = (id: string, content: string) => {
    localStorage.setItem('note_id', id);

    const textarea = document.querySelector('#textarea');
    if (textarea && content) {
      (textarea as any).value = content;
    }

    if (id) {
      getNoteById({
        variables: {
          id: id,
        },
        context: {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      });
    }
  };

  const renderFolders = () => {
    let newFoldersView = null;

    if (folders) {
      newFoldersView = folders.map((folder: any, i) => {
        return (
          <div
            key={i}
            className={`${
              currentTab === folder.name
                ? 'd-flex flex-row align-items-center justify-content-between pointer bg-light bg-opacity-50 w-full p-2 m-4 rounded'
                : 'd-flex flex-row align-items-center justify-content-between pointer w-full p-2 m-4 rounded'
            }`}
            onClick={() => handleFolderClick(folder.id, folder.name)}
            onMouseEnter={(e) => handleMouseEnter(e)}
            onMouseLeave={(e) => handleMouseLeave(e)}
          >
            <div>
              <FolderIcon />
            </div>
            <div>
              <b>{folder.name}</b>
            </div>
            <div>0</div>
          </div>
        );
      });
    }

    return newFoldersView;
  };

  const handleFolderItemClick = (currentTab: string) => {
    localStorage.removeItem('folder_id');
    setCurrentTab(currentTab);

    if (currentTab === 'notes') {
      getNotes({
        variables: {
          input: {
            users_id: localStorage.getItem('users_id'),
          },
        },
        context: {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      });
    }
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    (e.target as any).classList.add('bg-white', 'bg-opacity-25');
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    (e.target as any).classList.remove('bg-white', 'bg-opacity-25');
  };

  const renderSelectDropdown = () => {
    let selectDropdown = null;

    if (folders) {
      selectDropdown = folders.map((folder: any, i) => {
        const item = <option value={folder.id}>{folder.name}</option>;
        return item;
      });
    }

    return selectDropdown;
  };

  const renderNotes = () => {
    let notesView = null;

    if (notes) {
      notesView = notes.map((note: any, i) => {
        const cardTitle = note.content.substring(0, note.content.indexOf('\n'));
        // console.log('cardTitle = ', cardTitle);

        const content = note.content
          .substring(note.content.indexOf('\n'))
          .trim();
        // console.log('content = ', content);

        const now = dayjs();
        const minuteDiff = now.diff(note.updated_at, 'minute');
        const minuteDiffStr =
          minuteDiff < 1 ? 'just now' : `${minuteDiff} minutes ago`;

        return (
          <div
            key={i}
            className="card pointer my-4"
            onClick={() => handleNoteClick(note.id, note.content)}
          >
            <div className="card-body">
              <div className="d-flex justify-content-end">
                <ClearIcon
                  className="pointer"
                  onClick={() => handleDeleteNoteById(note.id)}
                />
              </div>
              <h5 className="card-title">
                <b>{cardTitle || note.content}</b>
              </h5>
              <p className="card-text">
                {content.length < 100
                  ? content
                  : content.substring(0, 100) + '...'}
              </p>
              <div>{minuteDiffStr}</div>
            </div>
          </div>
        );
      });
    }

    return notesView;
  };

  return (
    <div>
      <div
        className="row"
        style={{
          height: '100vh',
          overflowY: 'auto',
          maxWidth: '100%',
          overflowX: 'hidden',
        }}
      >
        <div
          className="col-sm-3 d-none d-sm-block p-0"
          style={{ backgroundColor: '#fb9698' }}
        >
          <div
            className={`${
              currentTab === 'notes'
                ? 'd-flex flex-row align-items-center justify-content-between pointer bg-light bg-opacity-50 w-full p-2 m-4 rounded'
                : 'd-flex flex-row align-items-center justify-content-between pointer w-full p-2 m-4 rounded'
            }`}
            onClick={() => handleFolderItemClick('notes')}
            onMouseEnter={(e) => handleMouseEnter(e)}
            onMouseLeave={(e) => handleMouseLeave(e)}
          >
            <div>
              <FolderIcon />
            </div>
            <div>
              <b>Notes</b>
            </div>
            <div>
              {getNotesResult.data && getNotesResult.data.notes
                ? getNotesResult.data.notes.length
                : 0}
            </div>
          </div>

          <div
            className={`${
              currentTab === 'trash'
                ? 'd-flex flex-row align-items-center justify-content-between pointer bg-light bg-opacity-50 w-full p-2 m-4 rounded'
                : 'd-flex flex-row align-items-center justify-content-between pointer w-full p-2 m-4 rounded'
            }`}
            onClick={() => handleFolderItemClick('trash')}
            onMouseEnter={(e) => handleMouseEnter(e)}
            onMouseLeave={(e) => handleMouseLeave(e)}
          >
            <div>
              <DeleteIcon />
            </div>
            <div>
              <b>Trash</b>
            </div>
            <div>0</div>
          </div>

          {!_.isEmpty(folders) ? <hr /> : null}

          {renderFolders()}
        </div>
        <div
          className="col-sm-3 d-none d-sm-block"
          style={{ backgroundColor: '#e9e9e9' }}
        >
          <div className="d-flex justify-content-end my-3">
            <div>
              <LogoutIcon
                className="pointer"
                onClick={() => handleLogoutClick()}
              />
            </div>
          </div>

          <div className="d-flex flex-row my-3">
            <div>
              <FormatListBulletedIcon className="pointer" />
            </div>
            <div className="mx-1">
              <GridViewIcon className="pointer" />
            </div>
          </div>

          <div>
            <Button
              variant="outlined"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => handleNewFolderNameClick()}
            >
              New folder
            </Button>
          </div>

          <div className="my-3">
            <Button
              variant="outlined"
              startIcon={<CreateIcon />}
              onClick={() => handleEditFolderNameClick()}
            >
              Edit folder name
            </Button>
          </div>

          <div className="my-3">
            <Button
              variant="outlined"
              startIcon={<AddLinkIcon />}
              onClick={() => handleAddNoteToFolderClick()}
            >
              Add note to folder
            </Button>
          </div>

          <div className="d-flex flex-row align-items-center my-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search notes"
              onChange={(e) => handleSearchNotesChange(e)}
            />
            <div className="mx-2">
              <BorderColorIcon
                className="pointer"
                onClick={() => handleCreateNotesClick()}
              />
            </div>
          </div>

          {renderNotes()}
        </div>
        <div className="col-sm-6">
          <textarea
            id="textarea"
            className="form-control px-3 py-4"
            placeholder="Write something..."
            style={{
              width: '100vw',
              height: '100vh',
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              resize: 'none',
            }}
            onChange={(e) => handleTextareaChange(e)}
          ></textarea>
        </div>
      </div>

      <Dialog
        open={newFolderDialogStatus}
        onClose={() => handleNewDialogClose()}
      >
        <DialogTitle>Create New folder</DialogTitle>
        <DialogContent>
          <DialogContentText>Create new folder name below</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Folder name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => handleNewFolderNameChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleNewDialogClose()}>Cancel</Button>
          <Button onClick={() => handleCreateFolderName()}>Create</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editFolderDialogStatus}
        onClose={() => handleEditDialogClose()}
      >
        <DialogTitle>Edit folder name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>
              Edit folder name <b>{(folder as any).name}</b> with new folder
              name below
            </div>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Folder name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => handleEditFolderNameChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleEditDialogClose()}>Cancel</Button>
          <Button onClick={() => handleEditFolderName()}>Edit</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={addNoteToFolderDialogStatus}
        onClose={() => handleAddNoteToFolderClose()}
      >
        <DialogTitle>Add note to folder</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {note ? (
              <div>
                Add note <b>{(note as any).content}</b> to folder below
                <select
                  className="form-select mt-3"
                  aria-label=""
                  onChange={(e) => handleSelectDropdownChange(e)}
                >
                  {renderSelectDropdown()}
                </select>
              </div>
            ) : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleAddNoteToFolderClose()}>Cancel</Button>
          <Button onClick={() => handleAddNoteToFolder()}>Add</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => handleErrorSnackbarClose()}
      >
        <Alert
          onClose={() => handleErrorSnackbarClose()}
          severity="warning"
          sx={{ width: '100%' }}
        >
          {errorSnackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Notes;
