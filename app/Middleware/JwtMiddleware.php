<?php
namespace App\Middleware;

use App\Helpers\Response;
use App\Services\AuthService;

class JwtMiddleware {
    private AuthService $authService;
    public function __construct() {
        $this->authService = new AuthService();
    }

    public function handle(callable $next) {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? ($_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? null);
        if (!$authHeader) {
            return Response::json(['error'=>'Authorization header not found'], 401);
        }
        if (!preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            return Response::json(['error'=>'Malformed Authorization header'], 401);
        }
        $token = $matches[1];
        $decoded = $this->authService->verifyToken($token);
        if (!$decoded) return Response::json(['error'=>'Invalid or expired token'], 401);
        $_SERVER['user_id'] = $decoded->sub ?? null;
        return $next();
    }
}
