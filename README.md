# LocalDrop - A File Storage Web Application 🏷️

LocalDrop is a web-based file storage application that allows you to manage files and folders within your browser. It leverages IndexedDB for client-side storage, providing an offline experience similar to cloud-based storage solutions like Google Drive, but without the need for server-side infrastructure. You can upload, organize, and manage files with a sleek and intuitive user interface.

## Features ⭐⭐
- **File Management:** Upload, organize, and manage files and folders within the browser.
- **Client-Side Storage:** Uses IndexedDB for storing files locally, ensuring data is persistent across sessions.
- **Modular Architecture:** Application is structured with reusable components, making it maintainable and scalable.
- **Recursive Folder Structure:** Creates nested folder structures for better file organization.
- **Duplicate Name Prevention**: Automatically updates names to avoid conflicts when creating or moving files and folders.
- **Efficient Memory Usage**: The application stores data only once in memory, using IDs to refer to the data elsewhere. This reduces memory consumption by preventing the same files from being stored multiple times.
- **Dynamic Data Management:**
  - Add, cut, copy, paste, rename, starred, and delete files and folders.
  - Drag-and-select functionality for easy file selection.
- **Dark and Light Themes:** Switch between dark and light modes for a personalized user experience.
- **Multiple Views:** Easily switch between starred, recent, and trashed content for better file management.
- **Skeleton UI:** Smooth loading animations while waiting for file data to load.
- **Data Caching:** SVGs and other assets are cached locally to improve load performance.
- **Responsive Design:** The application is fully responsive, providing an optimal user experience across devices of all sizes.

## Technologies Used 💻
- **Frontend:** Vue JS, Vuex, Options API, Composition API, SASS, Vue Router, Vuetify.
- **Storage** IndexedDB
- **Build Tool:** Vite

## Project Structure 🏗️
- **/components:** Reusable UI Components.
- **/containers:** Components that handle logic and data flow
- **/views:** Main views of the applications
- **/composables:** Reusable logic for Vue Composition API functions
- **/database:** Handles object stores of IndexedDB.
- **/styles:** SCSS config files for styling
- **/stores:** Manages Vuex mutations and actions
- **/utils:** Common utility functions

## Architecture and Best Practices Used 🏛️
- **Separation of Concerns:** Core business logic is kept separate from components and views, allowing easy framework changes in the future.
- **Function Composition:** Utilizes closures, purity, and higher-order functions for clean, modular code.
- **SCSS Variables:** Constants in SCSS enable easy theme switching.
- **Index Files:** Each folder includes an index.js to streamline imports and keep main files encapsulated.
- **Performance:** Employs lazy loading, code splitting, and image compression for optimized performance.
- **API Usage:** Options API for components to provide structure and Composition API for Views and Containers for efficient handling of logic.

## Deployment 🚀
The project is deployed on Netlify. You can access the live version at [LocalDrop](https://localdrop.netlify.app/).
