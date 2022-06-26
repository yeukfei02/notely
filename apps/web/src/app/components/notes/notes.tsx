import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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
import _ from 'lodash';

const CREATE_FOLDER = gql`
  mutation createFolder($input: CreateFolderInput!) {
    createFolder(input: $input) {
      created_at
      id
      name
      notes {
        content
        created_at
        folder {
          created_at
          id
          name
          notes {
            content
            created_at
            id
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          updated_at
          users {
            created_at
            email
            folders {
              created_at
              id
              name
              updated_at
            }
            id
            notes {
              content
              created_at
              id
              updated_at
            }
            password
            updated_at
          }
        }
        id
        updated_at
        users {
          created_at
          email
          folders {
            created_at
            id
            name
            notes {
              content
              created_at
              id
              updated_at
            }
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          id
          notes {
            content
            created_at
            folder {
              created_at
              id
              name
              updated_at
            }
            id
            updated_at
          }
          password
          updated_at
        }
      }
      updated_at
      users {
        created_at
        email
        folders {
          created_at
          id
          name
          notes {
            content
            created_at
            folder {
              created_at
              id
              name
              updated_at
            }
            id
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          updated_at
          users {
            created_at
            email
            id
            notes {
              content
              created_at
              id
              updated_at
            }
            password
            updated_at
          }
        }
        id
        notes {
          content
          created_at
          folder {
            created_at
            id
            name
            notes {
              content
              created_at
              id
              updated_at
            }
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          id
          updated_at
          users {
            created_at
            email
            folders {
              created_at
              id
              name
              updated_at
            }
            id
            password
            updated_at
          }
        }
        password
        updated_at
      }
    }
  }
`;

const CREATE_NOTE = gql`
  mutation createNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      content
      created_at
      folder {
        created_at
        id
        name
        notes {
          content
          created_at
          folder {
            created_at
            id
            name
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          id
          updated_at
          users {
            created_at
            email
            folders {
              created_at
              id
              name
              updated_at
            }
            id
            notes {
              content
              created_at
              id
              updated_at
            }
            password
            updated_at
          }
        }
        updated_at
        users {
          created_at
          email
          folders {
            created_at
            id
            name
            notes {
              content
              created_at
              id
              updated_at
            }
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          id
          notes {
            content
            created_at
            folder {
              created_at
              id
              name
              updated_at
            }
            id
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          password
          updated_at
        }
      }
      id
      updated_at
      users {
        created_at
        email
        folders {
          created_at
          id
          name
          notes {
            content
            created_at
            folder {
              created_at
              id
              name
              updated_at
            }
            id
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          updated_at
          users {
            created_at
            email
            id
            notes {
              content
              created_at
              id
              updated_at
            }
            password
            updated_at
          }
        }
        id
        notes {
          content
          created_at
          folder {
            created_at
            id
            name
            notes {
              content
              created_at
              id
              updated_at
            }
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          id
          updated_at
          users {
            created_at
            email
            folders {
              created_at
              id
              name
              updated_at
            }
            id
            password
            updated_at
          }
        }
        password
        updated_at
      }
    }
  }
`;

const GET_FOLDERS = gql`
  query folders($input: GetFoldersInput!) {
    folders(input: $input) {
      created_at
      id
      name
      notes {
        content
        created_at
        folder {
          created_at
          id
          name
          notes {
            content
            created_at
            id
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          updated_at
          users {
            created_at
            email
            folders {
              created_at
              id
              name
              updated_at
            }
            id
            notes {
              content
              created_at
              id
              updated_at
            }
            password
            updated_at
          }
        }
        id
        updated_at
        users {
          created_at
          email
          folders {
            created_at
            id
            name
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          id
          notes {
            content
            created_at
            folder {
              created_at
              id
              name
              updated_at
            }
            id
            updated_at
          }
          password
          updated_at
        }
      }
      updated_at
      users {
        created_at
        email
        folders {
          created_at
          id
          name
          notes {
            content
            created_at
            folder {
              created_at
              id
              name
              updated_at
            }
            id
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          updated_at
        }
        id
        notes {
          content
          created_at
          folder {
            created_at
            id
            name
            notes {
              content
              created_at
              id
              updated_at
            }
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          id
          updated_at
          users {
            created_at
            email
            folders {
              created_at
              id
              name
              updated_at
            }
            id
            password
            updated_at
          }
        }
        password
        updated_at
      }
    }
  }
`;

const GET_NOTES = gql`
  query notes($input: GetNotesInput!) {
    notes(input: $input) {
      content
      created_at
      folder {
        created_at
        id
        name
        notes {
          content
          created_at
          id
          updated_at
          users {
            created_at
            email
            folders {
              created_at
              id
              name
              updated_at
            }
            id
            notes {
              content
              created_at
              id
              updated_at
            }
            password
            updated_at
          }
        }
        updated_at
        users {
          created_at
          email
          folders {
            created_at
            id
            name
            notes {
              content
              created_at
              id
              updated_at
            }
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          id
          notes {
            content
            created_at
            id
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          password
          updated_at
        }
      }
      id
      updated_at
      users {
        created_at
        email
        folders {
          created_at
          id
          name
          notes {
            content
            created_at
            folder {
              created_at
              id
              name
              updated_at
            }
            id
            updated_at
          }
          updated_at
          users {
            created_at
            email
            id
            notes {
              content
              created_at
              id
              updated_at
            }
            password
            updated_at
          }
        }
        id
        notes {
          content
          created_at
          folder {
            created_at
            id
            name
            notes {
              content
              created_at
              id
              updated_at
            }
            updated_at
            users {
              created_at
              email
              id
              password
              updated_at
            }
          }
          id
          updated_at
        }
        password
        updated_at
      }
    }
  }
`;

const UPDATE_NOTE_BY_ID = gql`
  mutation updateNoteById($input: UpdateNoteByIdInput!) {
    updateNoteById(input: $input)
  }
`;

const DELETE_NOTE_BY_ID = gql`
  mutation deleteNoteById($input: DeleteNoteByIdInput!) {
    deleteNoteById(input: $input)
  }
`;

function Notes() {
  const navigate = useNavigate();

  const [folders, setFolders] = useState([]);
  const [notes, setNotes] = useState([]);

  const [searchNotesValue, setSearchNotesValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  const [newFolderName, setNewFolderName] = useState('');
  const [editFolderName, setEditFolderName] = useState('');

  const [newFolderDialogStatus, setNewFolderDialogStatus] = useState(false);
  const [editFolderDialogStatus, setEditFolderDialogStatus] = useState(false);

  const [createFolder, createFolderResult] = useMutation(CREATE_FOLDER);
  const [createNote, createNoteResult] = useMutation(CREATE_NOTE);
  const [getFolders, getFoldersResult] = useLazyQuery(GET_FOLDERS);
  const [getNotes, getNotesResult] = useLazyQuery(GET_NOTES);
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

  console.log('getNotesResult.data = ', getNotesResult.data);
  console.log('getNotesResult.loading = ', getNotesResult.loading);
  console.log('getNotesResult.error = ', getNotesResult.error);

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
    if (getNotesResult.data) {
      setNotes(getNotesResult.data.notes);
    }
  }, [getNotesResult.data]);

  useEffect(() => {
    if (createFolderResult.data) {
      window.location.reload();
    }
  }, [createFolderResult.data]);

  useEffect(() => {
    if (createNoteResult.data) {
      window.location.reload();
    }
  }, [createNoteResult.data]);

  useEffect(() => {
    if (updateNoteByIdResult.data) {
      window.location.reload();
    }
  }, [updateNoteByIdResult.data]);

  useEffect(() => {
    if (deleteNoteByIdResult.data) {
      window.location.reload();
    }
  }, [deleteNoteByIdResult.data]);

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

      // const folderId = localStorage.getItem('folder_id')
      // if (!_.isEmpty(folderId)) {
      //   input['folder_id'] = folderId;
      // }

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
    if (!editFolderDialogStatus) {
      setEditFolderDialogStatus(true);
    } else {
      setEditFolderDialogStatus(false);
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
  };

  const handleEditFolderNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditFolderName(e.target.value);
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

  const handleFolderClick = (id: string) => {
    console.log('id = ', id);
    localStorage.setItem('folder_id', id);
  };

  const handlerCardItemClick = (id: string, content: string) => {
    localStorage.setItem('note_id', id);

    const textarea = document.querySelector('#textarea');
    if (textarea && content) {
      (textarea as any).value = content;
    }
  };

  const renderNewFolders = () => {
    let newFoldersView = null;

    if (folders) {
      newFoldersView = folders.map((folder: any, i) => {
        return (
          <div
            key={i}
            className="d-flex flex-row align-items-center justify-content-around pointer my-4"
            onClick={() => handleFolderClick(folder.id)}
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

  const renderNotes = () => {
    let notesView = null;

    if (notes) {
      notesView = notes.map((note: any, i) => {
        const cardTitle = note.content.substring(0, note.content.indexOf('\n'));
        console.log('cardTitle = ', cardTitle);

        const content = note.content
          .substring(note.content.indexOf('\n'))
          .trim();
        console.log('content = ', content);

        return (
          <div
            key={i}
            className="card pointer my-4"
            onClick={() => handlerCardItemClick(note.id, note.content)}
          >
            <div className="card-body">
              <div className="d-flex justify-content-end">
                <ClearIcon
                  className="pointer"
                  onClick={() => handleDeleteNoteById(note.id)}
                />
              </div>
              <h5 className="card-title">{cardTitle || note.content}</h5>
              <p className="card-text">
                {content.length < 100
                  ? content
                  : content.substring(0, 100) + '...'}
              </p>
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
          className="col-sm-3 d-none d-sm-block"
          style={{ backgroundColor: '#fb9698' }}
        >
          <div className="d-flex flex-row align-items-center justify-content-around pointer my-4">
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

          <div className="d-flex flex-row align-items-center justify-content-around pointer my-4">
            <div>
              <DeleteIcon />
            </div>
            <div>
              <b>Trash</b>
            </div>
            <div>0</div>
          </div>

          {!_.isEmpty(folders) ? <hr /> : null}

          {renderNewFolders()}
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
              variant="contained"
              startIcon={<CreateIcon />}
              onClick={() => handleEditFolderNameClick()}
            >
              Edit folder name
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
          <DialogContentText>
            Create new folder name below and click create button
          </DialogContentText>
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
            Edit folder name below and click edit button
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
    </div>
  );
}

export default Notes;
