# File Sharing Web Application

A modern web application built with React and Vite that allows users to upload, list, and share files with PDF preview capabilities.

## Features

- **User Authentication**
  - Sign up with username, password, firstname, and lastname
  - Sign in functionality
  - JWT-based authentication

- **File Management**
  - Upload files
  - List uploaded files
  - Generate shareable links for files
  - PDF preview functionality for PDF files

- **Modern Tech Stack**
  - React 19
  - Vite 6
  - TailwindCSS
  - Flowbite React components
  - React Router DOM for navigation
  - Axios for API requests

## Prerequisites

- Node.js (>= 18.18.0)
- npm or yarn package manager

## Environment Setup

1. Create two environment files in the root directory:

`.env.development`:
```env
VITE_BASE_URL=http://localhost:3000/api/v1
```

`.env.production`:
```env
VITE_BASE_URL=your_production_api_url
```

## Installation

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Build for production
```bash
npm run build
# or
yarn build
```

## Project Structure

```
├── src/
│   ├── components/          # Reusable components
│   ├── pages/              # Page components
│   ├── services/           # API services
│   ├── App.jsx            # Main application component
│   └── main.jsx          # Application entry point
├── public/                # Static assets
└── vite.config.js        # Vite configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run postinstall` - Run Flowbite React patch

## Dependencies

### Main Dependencies
- react
- react-dom
- react-router-dom
- axios
- flowbite-react
- tailwindcss
- react-pdf
- react-modal
- dotenv

### Development Dependencies
- vite
- @vitejs/plugin-react
- eslint
- @eslint/js
- eslint-plugin-react-hooks
- eslint-plugin-react-refresh

## API Integration

The application uses Axios for API requests with the following endpoints:

- **User Authentication**
  - POST `/api/v1/user/signin` - User sign in
  - POST `/api/v1/user/signup` - User registration

- **File Operations**
  - GET `/api/v1/file/list` - List uploaded files
  - POST `/api/v1/file/upload` - Upload new file
  - GET `/api/v1/file/share` - Generate share link for file

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

