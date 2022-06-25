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

const GET_FOLDERS = gql`
  query folders {
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

  const [getFolders, getFoldersResult] = useLazyQuery(GET_FOLDERS);

  console.log('createFolderResult.data = ', createFolderResult.data);
  console.log('createFolderResult.loading = ', createFolderResult.loading);
  console.log('createFolderResult.error = ', createFolderResult.error);

  console.log('getFoldersResult.data = ', getFoldersResult.data);
  console.log('getFoldersResult.loading = ', getFoldersResult.loading);
  console.log('getFoldersResult.error = ', getFoldersResult.error);

  useEffect(() => {
    getFolders({
      context: {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    });
  }, [getFolders]);

  useEffect(() => {
    if (getFoldersResult.data) {
      setFolders(getFoldersResult.data.folders);
    }
  }, [getFoldersResult.data]);

  useEffect(() => {
    if (createFolderResult.data) {
      window.location.reload();
    }
  }, [createFolderResult.data]);

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
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const renderNewFolders = () => {
    let newFoldersView = null;

    if (folders) {
      newFoldersView = folders.map((folder: any, i) => {
        return (
          <div
            key={i}
            className="d-flex flex-row align-items-center justify-content-around pointer my-4"
          >
            <div>
              <FolderIcon />
            </div>
            <div>{folder.name}</div>
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
      notesView = notes.map((note, i) => {
        return (
          <div key={i} className="card my-4">
            <div className="card-body">
              <div className="d-flex justify-content-end">
                <ClearIcon className="pointer" />
              </div>
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
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
            <div>Notes</div>
            <div>0</div>
          </div>

          <div className="d-flex flex-row align-items-center justify-content-around pointer my-4">
            <div>
              <DeleteIcon />
            </div>
            <div>Trash</div>
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
