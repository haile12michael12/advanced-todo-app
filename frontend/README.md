# Advanced Todo App - Frontend

Modern, responsive frontend for the Advanced Todo App built with React, TypeScript, and Vite.

## Features

- ⚛️ **React 19** - Latest React with concurrent features
- 📘 **TypeScript** - Full type safety
- ⚡ **Vite** - Lightning-fast HMR and build
- 🎨 **Modern UI** - Clean and intuitive interface
- 📱 **Responsive Design** - Works on all devices
- 🔐 **JWT Authentication** - Secure token-based auth with refresh token support
- 🔄 **Auto Token Refresh** - Seamless authentication experience
- 🎯 **Advanced Features** - Priorities, categories, due dates, filtering, and sorting
- 🚀 **Optimized Performance** - Fast load times and smooth interactions

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx       # App layout with navigation
│   ├── ProtectedRoute.tsx  # Route protection
│   ├── TodoForm.tsx     # Todo creation form
│   └── TodoItem.tsx     # Individual todo component
├── contexts/            # React Context providers
│   └── AuthContext.tsx  # Authentication state management
├── hooks/               # Custom React hooks
│   └── useAuth.ts       # Auth hook
├── pages/               # Page components
│   ├── Home.tsx         # Landing page
│   ├── Login.tsx        # Login page
│   ├── Register.tsx     # Registration page
│   └── Todos.tsx        # Todo list page
├── services/            # API services
│   ├── api.ts           # Axios instance with interceptors
│   ├── authService.ts   # Authentication API calls
│   └── todoService.ts   # Todo CRUD operations
├── types/               # TypeScript type definitions
│   └── index.ts         # All app types
├── App.tsx              # Main app component with routing
├── main.tsx             # App entry point
├── index.css            # Global styles
└── App.css              # App-specific styles
```

## Technology Stack

- **React 19.1.1** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 7.1** - Build tool
- **React Router DOM 7** - Routing
- **Axios** - HTTP client
- **ESLint** - Code linting

## Prerequisites

- Node.js >= 18
- npm or yarn
- Backend API running (see `/backend` directory)

## Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   
   Copy `.env.example` to `.env` and configure:
   ```bash
   cp .env.example .env
   ```
   
   Update the API URL in `.env`:
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

## Development

**Start development server:**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build

**Create production build:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Key Features

### Authentication
- User registration with validation
- Secure login with JWT tokens
- Automatic token refresh
- Protected routes
- Persistent sessions

### Todo Management
- ✅ Create todos with rich details (title, description, category, priority, due date)
- ✏️ Edit todos inline
- 🗑️ Delete todos with confirmation
- ✔️ Toggle completion status
- 🔍 Filter by status (all, active, completed)
- 📊 Sort by date or priority
- 📈 Real-time statistics

### User Experience
- Clean, modern interface
- Responsive design for all screen sizes
- Loading states and error handling
- Form validation
- Smooth transitions
- Intuitive navigation

## Type Safety

The app uses TypeScript throughout with comprehensive type definitions:

- **User Types** - User data and authentication
- **Todo Types** - Todo entities and operations
- **API Types** - Request/response types
- **Context Types** - React context types
- **Props Types** - Component prop types

## API Integration

The frontend communicates with the backend API using Axios with:

- Automatic JWT token injection
- Token refresh on 401 errors
- Request/response interceptors
- Type-safe API calls
- Error handling

## Customization

### Styling
- Update `src/index.css` for global styles
- Modify component styles in respective files
- All styles use Tailwind-like utility classes

### API Endpoint
- Change `VITE_API_URL` in `.env` to point to your backend

### Features
- Add new pages in `src/pages/`
- Create reusable components in `src/components/`
- Add API services in `src/services/`
- Define types in `src/types/`

## Deployment

### Vercel
```bash
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Manual
1. Build: `npm run build`
2. Upload `dist/` folder to your hosting
3. Configure `.env` for production API URL

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8000/api` |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for learning or production.

## Support

For issues or questions:
- Check the main project README
- Review the backend API documentation
- Open an issue in the repository
