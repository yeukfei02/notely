import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  DefaultOptions,
} from '@apollo/client';
import { getUrl } from './helpers/helpers';
import App from './app/app';
import Signup from './app/components/signup/signup';
import Login from './app/components/login/login';
import Notes from './app/components/notes/notes';
import NotesMarkdownPreview from './app/components/notes/notesMarkdownPreview';
import PrivateRoute from './app/components/privateRoute/privateRoute';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fa4549',
    },
    secondary: {
      main: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: ['Varela Round', 'sans-serif'].join(','),
  },
});

const url = getUrl();

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const client = new ApolloClient({
  uri: url,
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/notes"
              element={
                <PrivateRoute>
                  <Notes />
                </PrivateRoute>
              }
            />
            <Route
              path="/notes/:id/markdown-preview"
              element={
                <PrivateRoute>
                  <NotesMarkdownPreview />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </ThemeProvider>
  </StrictMode>
);
