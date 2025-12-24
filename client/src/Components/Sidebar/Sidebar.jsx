import React from 'react';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';

const Sidebar = () => {
  return (
    <div className="fixed left-0 z-30 flex flex-col items-center justify-center p-2 space-y-4 bg-black border-gray-400 rounded-r shadow-lg dark:border-r dark:border-y bottom-4 md:left-0 lg:left-0 xl:left-0">
      <div className="hover:scale-110"> 
        <DarkModeToggle />
     </div>
        <div className="hover:scale-110">
      <a
        href="https://www.linkedin.com/in/tejas-pokale-5047061b3/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl text-blue-600"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 448 512"
          height="1.3em"
          width="1.2em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M100.28 448H7.4V148.9h92.78zM53.79 108.1c-29.82 0-53.95-24.33-53.95-54.28S23.97 0 53.79 0s53.95 24.33 53.95 54.28-24.13 53.82-53.95 53.82zM447.1 448h-92.59V302.4c0-34.71-12.4-58.48-43.44-58.48-23.68 0-37.79 15.97-43.98 31.34-2.26 5.44-2.84 13.08-2.84 20.75V448H171.45s1.24-243.53 0-268.89h92.61v38.07c-0.19 0.31-0.46 0.62-0.65 0.92h0.65v-0.92c12.32-19.02 34.38-46.14 83.74-46.14 61.18 0 107.06 39.74 107.06 125.15V448z" />
        </svg>
      </a>
      </div>
    </div>
  );
};

export default Sidebar;
