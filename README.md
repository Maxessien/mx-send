# MX Send

A modern file sharing web application built with React and Express that allows users to upload, store, and download files with real-time progress tracking.

## Features

- **Drag & Drop File Upload** - Intuitive file upload interface with drag-and-drop support
- **Multiple File Upload** - Upload multiple files simultaneously
- **Real-time Progress Tracking** - Monitor upload progress with visual feedback
- **File Management** - View all uploaded files with metadata (name, size, upload date)
- **Download Files** - Download previously uploaded files
- **Persistent Storage** - Files stored locally with SQLite database tracking
- **Responsive Design** - Modern UI built with React and Sass

## Project Structure

```
mx-send/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Home.jsx    # Main upload/download interface
│   │   │   ├── Loader.jsx  # Loading component
│   │   │   └── SvgComponents.jsx
│   │   ├── hooks/          # Custom React hooks
│   │   │   └── uploadHook.js  # File upload logic
│   │   ├── assets/         # Styles and assets
│   │   └── App.jsx         # Root component
│   ├── public/             # Static assets
│   └── package.json
│
└── server/                 # Backend Express application
    ├── config/
    │   └── sqlConfig.js    # SQLite database configuration
    ├── controllers/
    │   └── uploadControllers.js  # Upload/download logic
    ├── routes/
    │   └── uploadRoutes.js # API routes
    ├── uploads/            # File storage directory
    ├── tempUploads/        # Temporary upload directory
    └── index.js            # Server entry point
```

## Tech Stack

### Frontend
- **React 19.2** - UI library
- **Vite** - Build tool and dev server
- **TanStack Query (React Query)** - Data fetching and caching
- **Axios** - HTTP client
- **Framer Motion** - Animation library
- **React Router DOM** - Routing
- **React Toastify** - Toast notifications
- **Zustand** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Sass** - CSS preprocessor
- **React Icons** - Icon library

### Backend
- **Express 5.2** - Web framework
- **SQLite3** - Database
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique identifier generation

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Maxessien/mx-send.git
   cd mx-send
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

## 🔧 Configuration

The server runs on port 3000 by default and serves the built client application. The database file (`upload.db`) will be created automatically in the server directory on first run.

## Usage

### Development Mode

1. **Start the server** (from the `server` directory)
   ```bash
   npm run dev
   ```
   - Server listens on `0.0.0.0:3000` and is reachable from devices on your local network.
   - On startup, the terminal prints your LAN URL and displays a QR code you can scan from a phone to open the app directly.
   - Example output:

     - URL: `http://<your-lan-ip>:3000/app`
     - A small ASCII QR code is rendered in the terminal.

2. **Start the client** (from the `client` directory, in a new terminal)
   ```bash
   npm run dev
   ```
   Client will run on `http://localhost:5173` (or another available port)

### Production Build

1. **Build the client** (from the `client` directory)
   ```bash
   npm run build
   ```

2. **Start the server** (from the `server` directory)
   ```bash
   npm run dev
   ```

3. **Access the application**
   Navigate to `http://localhost:3000/app`

## QR Code Access

The server now prints a scannable QR code in the terminal when it starts. This makes it easy to open the app on a phone connected to the same Wi‑Fi network.

- What it does: Generates a QR code for `http://<your-lan-ip>:3000/app` using `qrcode-terminal` and logs a clickable link with `chalk` styling.
- Where it lives: See `server/index.js` — the QR is generated inside the `app.listen` callback.
- How to use:
   - Ensure your computer and phone are on the same Wi‑Fi network.
   - Start the server from `server`: `npm run dev`.
   - Scan the QR code displayed in the terminal with your phone’s camera or a QR app.
   - The app opens at `http://<your-lan-ip>:3000/app`.
- Notes:
   - The code currently derives the IP from the `Wi-Fi` network interface on Windows. If your interface name differs (e.g., `Ethernet` or on macOS/Linux), you may need to update the interface selection in `server/index.js`.
   - The server binds to `0.0.0.0`, so it’s accessible to other devices on your LAN. Avoid running on untrusted networks.

### Dependencies used for QR

- `qrcode-terminal`: Renders the QR code in the terminal.
- `chalk`: Styles the terminal output for the printed URL.

## API Endpoints

### Upload File
- **POST** `/api/upload`
- **Body**: `multipart/form-data` with file field
- **Response**: `{ message: "File uploaded successfully" }`

### Get All Files
- **GET** `/api/upload`
- **Response**: Array of file objects with metadata

### Download File
- **GET** `/api/upload/:id`
- **Response**: File download

## Database Schema

The application uses SQLite with the following schema:

```sql
CREATE TABLE uploads (
    upload_id TEXT NOT NULL,
    path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    size INTEGER NOT NULL,
    ext TEXT NOT NULL,
    date_added TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
)
```

## Scripts

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server
- `npm run dev` - Start development server with nodemon

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Author

Maxessien

## Acknowledgments

- Built with modern web technologies
- Designed for simplicity and ease of use
- Optimized for performance with React Query caching
