import SignupAndLogin from './components/signupAndLogin/signupAndLogin';
import Notes from './components/notes/notes';

function App() {
  const renderView = () => {
    let view = <SignupAndLogin />;

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
