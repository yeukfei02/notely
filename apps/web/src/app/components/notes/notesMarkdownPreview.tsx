import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { GET_NOTES_BY_ID } from '../../../helpers/gqlHelper';

function NotesMarkdownPreview() {
  const navigate = useNavigate();

  const params = useParams();
  const { id } = params;

  const [note, setNote] = useState({});

  const [getNoteById, getNoteByIdResult] = useLazyQuery(GET_NOTES_BY_ID);

  useEffect(() => {
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
  }, [id, getNoteById]);

  useEffect(() => {
    if (getNoteByIdResult.data) {
      setNote(getNoteByIdResult.data.note);
    }
  }, [getNoteByIdResult.data]);

  console.log('getNoteByIdResult.data = ', getNoteByIdResult.data);
  console.log('getNoteByIdResult.loading = ', getNoteByIdResult.loading);
  console.log('getNoteByIdResult.error = ', getNoteByIdResult.error);

  const handleBackButtonClick = () => {
    navigate('/notes');
  };

  const renderMarkdownPreview = () => {
    let markdownPreview = null;

    if (note) {
      markdownPreview = (
        <div data-color-mode="light" className="my-3">
          <MarkdownPreview
            source={(note as any).content}
            className="p-3 border rounded"
          />
        </div>
      );
    }

    return markdownPreview;
  };

  return (
    <div className="m-4">
      <div>
        <ArrowBackIcon
          className="pointer"
          onClick={() => handleBackButtonClick()}
        />
      </div>
      {renderMarkdownPreview()}
    </div>
  );
}

export default NotesMarkdownPreview;
