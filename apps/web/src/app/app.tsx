import Login from './components/login/login';
import Notes from './components/notes/notes';

function App() {
  const renderView = () => {
    let view = <Login />;

    const token = localStorage.getItem('token');
    const users_id = localStorage.getItem('users_id');
    if (token && users_id) {
      view = <Notes />;
    }

    return view;
  };

  return (
    <div style={{ maxWidth: '100%', overflowX: 'hidden' }}>{renderView()}</div>
  );
}

export default App;
