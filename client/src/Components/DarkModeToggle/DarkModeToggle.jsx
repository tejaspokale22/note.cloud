import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../Slices/uiSlice';
import { DarkModeSwitch } from 'react-toggle-dark-mode';


function DarkModeToggle() {
  const darkMode = useSelector((state) => state.ui.darkMode);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <DarkModeSwitch
      checked={!darkMode} // Invert the checked property
      onChange={handleToggle}
      size={28}
      style={{ display: 'flex', alignItems: 'center' }}
      moonColor="white" // Keep moon color white
      sunColor="white" // Keep sun color white
      className='w-6 h-6'
    />
  );
}

export default DarkModeToggle;
