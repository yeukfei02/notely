import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { getUrl } from './helpers/helpers';
import Notes from './app/components/notes/notes';

import App from './app/app';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fa4549',
    },
    secondary: {
      main: '#f5f5f5',
    },
  },
});

const url = getUrl();

const client = new ApolloClient({
  uri: url,
  cache: new InMemoryCache(),
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
            <Route path="/notes" element={<Notes />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </ThemeProvider>
  </StrictMode>
);
