import React from 'react';
import ReactDOM from 'react-dom/client';  
import './index.css';
import Home from './Components/Home/Home.jsx';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout.jsx';
import { Provider } from 'react-redux';
import { store, persistor } from './store.js';  // Import persistor
import View from './Components/View/View.jsx';
import Login from './Components/Login/Login.jsx';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './Components/PrivateRoute.jsx';
import About from './Components/About/About';
import NoteViewer from './Components/NoteViewer/NoteViewer.jsx';

// Define your routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='login' element={<Login />} />
      <Route path='about' element={<About />} />
      <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path='view/:_id' element={<PrivateRoute><View /></PrivateRoute>} /> 
      <Route path='public/view/:_id' element={<NoteViewer />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <>
          <RouterProvider router={router} />
          <ToastContainer />
        </>
    </PersistGate>
  </Provider>
);