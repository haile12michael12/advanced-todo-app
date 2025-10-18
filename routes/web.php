<?php
use App\Controllers\AuthController;
use App\Controllers\TodoController;
use App\Middleware\JwtMiddleware;

// Auth
$router->post('/api/register', [AuthController::class, 'register']);
$router->post('/api/login', [AuthController::class, 'login']);
$router->post('/api/refresh', [AuthController::class, 'refresh']);
$router->post('/api/logout', [AuthController::class, 'logout']);

// Protected Todos
$router->get('/api/todos', [TodoController::class, 'index'], App\Middleware\JwtMiddleware::class);
$router->post('/api/todos', [TodoController::class, 'store'], App\Middleware\JwtMiddleware::class);
$router->put('/api/todos', [TodoController::class, 'update'], App\Middleware\JwtMiddleware::class);
$router->delete('/api/todos', [TodoController::class, 'destroy'], App\Middleware\JwtMiddleware::class);

// Simple root
$router->get('/', function() {
    header('Content-Type: text/html; charset=utf-8');
    echo '<h2>Advanced Todo App API</h2><p>See README.md for usage.</p>';
});
