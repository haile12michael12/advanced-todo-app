<?php
namespace App\Controllers;

use App\Helpers\Response;
use App\Services\AuthService;

class AuthController {
    private AuthService $authService;

    public function __construct() {
        $this->authService = new AuthService();
    }

    public function register() {
        $body = json_decode(file_get_contents('php://input'), true);
        if (!$body) return Response::json(['error'=>'Invalid JSON'], 400);
        $res = $this->authService->register($body);
        return Response::json($res, $res['success'] ? 201 : 400);
    }

    public function login() {
        $body = json_decode(file_get_contents('php://input'), true);
        if (!$body) return Response::json(['error'=>'Invalid JSON'], 400);
        $res = $this->authService->login($body);
        return Response::json($res, $res['success'] ? 200 : 401);
    }

    public function refresh() {
        $body = json_decode(file_get_contents('php://input'), true) ?: [];
        $token = $body['refresh_token'] ?? null;
        if (!$token) return Response::json(['error'=>'refresh_token required'], 400);
        $res = $this->authService->refresh($token);
        if (!$res) return Response::json(['error'=>'Invalid or expired refresh token'], 401);
        return Response::json($res);
    }

    public function logout() {
        $body = json_decode(file_get_contents('php://input'), true) ?: [];
        if (!empty($body['revoke_all'])) {
            $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? null;
            if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $m)) {
                return Response::json(['error'=>'Authorization required to revoke all tokens'], 401);
            }
            $accessToken = $m[1];
            $decoded = $this->authService->verifyToken($accessToken);
            if (!$decoded) return Response::json(['error'=>'Invalid access token'], 401);
            $userId = (int)$decoded->sub;
            $this->authService->logout(null, $userId, true);
            return Response::json(['success'=>true]);
        }
        $refreshToken = $body['refresh_token'] ?? null;
        if (!$refreshToken) return Response::json(['error'=>'refresh_token required to logout'], 400);
        $ok = $this->authService->logout($refreshToken);
        return Response::json(['success' => (bool)$ok]);
    }
}
