import { useState } from 'react';
import Button from '@mui/material/Button';
import FolderIcon from '@mui/icons-material/Folder';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import _ from 'lodash';

function Notes() {
  const [folders, setFolders] = useState<string[]>([]);
  const [notes, setNotes] = useState(['notes']);

  const handleNewFolderClick = () => {
    const foldersList = folders.concat(`Folder ${folders.length + 1}`);
    setFolders(foldersList);
  };

  const renderNewFolders = () => {
    let newFoldersView = null;

    if (folders) {
      newFoldersView = folders.map((folder, i) => {
        return (
          <div
            key={i}
            className="d-flex flex-row align-items-center justify-content-around pointer my-4"
          >
            <div>
              <FolderIcon />
            </div>
            <div>{folder}</div>
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
      <div className="row" style={{ height: '100vh', overflowY: 'auto' }}>
        <div
          className="col-sm-3 d-none d-sm-block p-0"
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
          <div className="d-flex flex-row my-4">
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
              onClick={() => handleNewFolderClick()}
            >
              New folder
            </Button>
          </div>

          <div className="d-flex flex-row align-items-center my-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search notes"
            />
            <div className="mx-2">
              <CreateIcon className="pointer" />
            </div>
          </div>

          {renderNotes()}
        </div>
        <div className="col-sm-6 p-0">
          <textarea
            className="form-control p-4"
            placeholder="Write something..."
            style={{
              height: '100%',
              border: 'none',
              outline: 'none',
            }}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default Notes;
