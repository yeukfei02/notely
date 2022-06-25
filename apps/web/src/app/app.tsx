import SignupAndLogin from './components/signupAndLogin/signupAndLogin';
import Notes from './components/notes/notes';

function App() {
  const renderView = () => {
    let view = <SignupAndLogin />;

    const token = localStorage.getItem('token');
    if (token) {
      view = <Notes />;
    }

    return view;
  };

  return <div style={{ overflow: 'hidden' }}>{renderView()}</div>;
}

export default App;
