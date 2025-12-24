import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[rgb(255,255,255)] text-black px-4 dark:bg-black dark:text-white">
      <h1 className="mt-16 mb-4 text-3xl font-extrabold text-center md:text-4xl lg:text-5xl">Welcome to note.cloud!</h1>
      <p className="max-w-3xl mb-8 text-lg leading-relaxed text-center md:text-xl">
        note.cloud is your personal space to create, manage, and organize notes with ease. Whether you're jotting down quick thoughts, creating a detailed to-do list, or saving important information, note.cloud has you covered.
      </p>

      <h2 className="mb-4 text-2xl font-bold md:text-4xl">Key Features</h2>

      <ul className="max-w-2xl space-y-3 text-lg list-disc list-inside md:text-xl">
        <li>Effortless note creation and management</li>
        <li>Seamless integration with local storage for data persistence</li>
        <li>Dark mode toggle for comfortable viewing at all times</li>
        <li>Mobile-friendly and responsive design</li>
        <li>Secure login to keep your notes private</li>
        <li>Fully customizable note categories</li>
        <li>Share your notes with others</li>
      </ul>

      <div className="mt-12 mb-4 text-center">
        <p className="text-md md:text-lg">
          Start organizing your thoughts with <span className="font-bold">note.cloud</span> and experience the best note-taking app!
        </p>
      </div>
    </div>
  );
};

export default About;
