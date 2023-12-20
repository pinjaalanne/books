import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Root from './routes/Root';
import Books from './routes/Books';
import Book from './routes/Book';
import AddBook from './routes/AddBook';

// Creating a theme for the page
const theme = createTheme({
  palette: {
    primary: {
      main: '#004d40',
    },
    secondary: {
      main: '#ffab40',
    },
  },
});

function App() {
  // Creating a router to navigate between routes/pages
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        { path: '/', element: <Books /> },
        { path: '/:id', element: <Book /> },
        { path: '/addnew', element: <AddBook /> },
      ],
    },
  ]);

  return (
    // MUI component enabling date and time localization
    // AdapterDay is for formatting date and time
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
