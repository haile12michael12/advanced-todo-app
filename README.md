# Advanced Todo App

A robust and secure REST API for managing todos with user authentication, built with a custom lightweight PHP MVC architecture.

## Features

- 🔐 **JWT Authentication** - Secure token-based authentication with refresh token support
- ✅ **Full CRUD Operations** - Create, read, update, and delete todos
- 👤 **User Management** - User registration, login, and logout
- 🔒 **Protected Routes** - Middleware-based route protection
- 📊 **Advanced Todo Properties** - Support for categories, priorities, due dates, and descriptions
- 🚀 **RESTful API** - Clean and intuitive API endpoints
- 🏗️ **MVC Architecture** - Organized code structure with separation of concerns
- 💾 **MySQL Database** - Reliable data persistence with foreign key relationships

## Technology Stack

- **PHP** - Plain PHP with PSR-4 autoloading
- **Composer** - Dependency management
- **MySQL** - Database
- **JWT** - JSON Web Tokens for authentication (`firebase/php-jwt`)
- **phpdotenv** - Environment configuration management

## Project Structure

```
.
├── app/
│   ├── Controllers/       # HTTP request handlers
│   │   ├── AuthController.php
│   │   └── TodoController.php
│   ├── Core/             # Core framework classes
│   │   ├── App.php
│   │   ├── Database.php
│   │   └── Router.php
│   ├── Helpers/          # Helper utilities
│   │   ├── Response.php
│   │   └── Token.php
│   ├── Middleware/       # Request filtering
│   │   └── JwtMiddleware.php
│   ├── Models/           # Data models
│   │   └── Todo.php
│   └── Services/         # Business logic
│       ├── AuthService.php
│       ├── RefreshTokenService.php
│       └── TodoService.php
├── public/               # Web root
│   ├── index.php        # Entry point
│   ├── index.html       # Demo frontend
│   └── js/
│       └── demo.js
├── routes/
│   └── web.php          # Route definitions
├── sql/
│   └── schema.sql       # Database schema
├── .env                 # Environment variables (create from .env.example)
├── composer.json
└── README.md
```

## Installation

### Prerequisites

- PHP >= 7.4
- MySQL >= 5.7
- Composer
- Web server (Apache, Nginx, or WAMP/XAMPP)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd advanced-todo-app
   ```

2. **Install dependencies**
   ```bash
   composer install
   ```

3. **Create database**
   ```bash
   mysql -u root -p < sql/schema.sql
   ```
   
   Or manually import the `sql/schema.sql` file into your MySQL database.

4. **Configure environment**
   
   Create a `.env` file in the root directory:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=your_password
   DB_NAME=todo_app
   
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRY=3600
   
   REFRESH_TOKEN_EXPIRY=2592000
   ```

5. **Configure web server**
   
   Point your web server's document root to the `public/` directory.
   
   For Apache, ensure `.htaccess` is enabled with `mod_rewrite`.

6. **Access the application**
   
   Navigate to `http://localhost/advanced-todo-app/public/` (adjust based on your setup)

## API Documentation

### Base URL
```
http://localhost/advanced-todo-app/public/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { ... },
    "access_token": "eyJ0eXAiOiJKV1QiLCJh...",
    "refresh_token": "abc123..."
  }
}
```

#### Login
```http
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Refresh Token
```http
POST /api/refresh
Content-Type: application/json

{
  "refresh_token": "your_refresh_token_here"
}
```

#### Logout
```http
POST /api/logout
Authorization: Bearer {access_token}
```

### Todo Endpoints

All todo endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer {access_token}
```

#### Get All Todos
```http
GET /api/todos
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Complete project",
      "description": "Finish the advanced todo app",
      "category": "work",
      "priority": "high",
      "due_date": "2025-10-25",
      "is_completed": 0,
      "created_at": "2025-10-18 10:30:00"
    }
  ]
}
```

#### Create Todo
```http
POST /api/todos
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "title": "New task",
  "description": "Task description",
  "category": "personal",
  "priority": "medium",
  "due_date": "2025-10-30"
}
```

#### Update Todo
```http
PUT /api/todos
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "id": 1,
  "title": "Updated title",
  "is_completed": 1
}
```

#### Delete Todo
```http
DELETE /api/todos
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "id": 1
}
```

## Database Schema

### Users Table
- `id` - Primary key
- `name` - User's name
- `email` - Unique email address
- `password` - Hashed password
- `created_at` - Registration timestamp

### Todos Table
- `id` - Primary key
- `user_id` - Foreign key to users table
- `title` - Todo title
- `description` - Todo description
- `category` - Category classification
- `priority` - Priority level (low, medium, high)
- `due_date` - Due date
- `is_completed` - Completion status
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Refresh Tokens Table
- `id` - Primary key
- `user_id` - Foreign key to users table
- `token_hash` - Hashed refresh token
- `expires_at` - Expiration timestamp
- `revoked` - Revocation status
- `ip` - Client IP address
- `user_agent` - Client user agent

## Security Features

- 🔐 Password hashing with bcrypt
- 🎟️ JWT-based stateless authentication
- 🔄 Refresh token rotation for enhanced security
- 🛡️ Middleware protection for sensitive routes
- 🚫 SQL injection prevention through prepared statements
- ⏰ Token expiration management
- 📝 IP and user agent tracking for refresh tokens

## Development

### Running Locally

If you're using PHP's built-in server:
```bash
cd public
php -S localhost:8000
```

Then access: `http://localhost:8000`

### Testing with the Demo Frontend

Open `public/index.html` in your browser to use the interactive demo interface.

## Architecture

### MVC Pattern

- **Models**: Data representation and database interaction
- **Views**: JSON responses (API-only, no HTML views)
- **Controllers**: Request handling and response coordination

### Additional Layers

- **Services**: Business logic and complex operations
- **Middleware**: Request filtering and authentication
- **Helpers**: Utility functions for common tasks

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open-sourced software licensed under the MIT license.

## Support

For issues, questions, or contributions, please open an issue in the repository.
