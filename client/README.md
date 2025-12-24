# note.cloud

note.cloud is a feature-rich and user-friendly web application built using React.js. It allows users to create, manage, and store notes efficiently. The application leverages Redux Toolkit for state management, Tailwind CSS for styling, and React Router for dynamic page rendering. Additionally, it uses localStorage to synchronize notes, ensuring data persistence across sessions.

## Features

- **Create Notes**: Easily create new notes with a title and content.
- **Manage Notes**: Update or delete existing notes.
- **Dark Mode**: Toggle between light and dark themes for better accessibility.
- **Responsive Design**: Optimized for various screen sizes using Tailwind CSS.
- **State Management**: Utilizes Redux Toolkit for efficient state management.
- **Dynamic Routing**: Employs React Router for smooth navigation between pages.
- **Local Storage**: Notes are saved in localStorage for persistence.

## Technologies Used

- **HTML**: Markup language for creating the structure of web pages.
- **CSS**: Styling the structure of web pages.
- **JavaScript**: Programming language for implementing application logic.
- **React.js**: JavaScript library for building user interfaces.
- **Redux Toolkit**: For managing and centralizing application state.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router**: For dynamic routing and rendering of components.
- **localStorage**: Web storage for persisting notes data.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/note.cloud.git
    ```
2. Navigate to the project directory:
    ```bash
    cd note.cloud
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm start
    ```

## Usage

- **Home Page**: View all your notes.
- **Create Page**: Add new notes by providing a title and content.
- **Manage Page**: Edit or delete your existing notes.
- **Dark Mode Toggle**: Switch between light and dark themes using the toggle button on the navbar.

## Project Structure

note.cloud/
├── public/
│ ├── index.html
├── src/
│ ├── components/
│ │ ├── Navbar.js
│ │ ├── Footer.js
│ │ ├── NoteForm.js
│ │ ├── NoteList.js
│ ├── pages/
│ │ ├── Home.js
│ │ ├── Create.js
│ │ ├── Manage.js
│ ├── store/
│ │ ├── notesSlice.js
│ │ ├── store.js
│ ├── App.js
│ ├── index.js
│ ├── styles/
│ ├── tailwind.css

markdown
Copy code

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, feel free to open an issue or submit a pull request.

## Acknowledgements

- [React.js](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
