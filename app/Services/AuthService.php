<?php
namespace App\Services;

use App\Core\Database;
use App\Helpers\Token;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthService {
    private $db;
    private RefreshTokenService $refreshService;

    public function __construct() {
        $this->db = Database::connect();
        $this->refreshService = new RefreshTokenService();
    }

    public function register(array $data): array {
        if (empty($data['email']) || empty($data['password']) || empty($data['name'])) {
            return ['success'=>false,'message'=>'name,email,password required'];
        }
        $stmt = $this->db->prepare('SELECT id FROM users WHERE email = :email LIMIT 1');
        $stmt->execute(['email'=>$data['email']]);
        if ($stmt->fetch()) return ['success'=>false,'message'=>'Email already registered'];
        $passwordHash = password_hash($data['password'], PASSWORD_DEFAULT);
        $stmt = $this->db->prepare('INSERT INTO users (name,email,password,created_at) VALUES (:name,:email,:password,NOW())');
        $stmt->execute(['name'=>$data['name'],'email'=>$data['email'],'password'=>$passwordHash]);
        $id = (int)$this->db->lastInsertId();
        $tokens = $this->issueTokensForUser($id);
        return ['success'=>true,'user'=>['id'=>$id,'name'=>$data['name'],'email'=>$data['email']],'tokens'=>$tokens];
    }

    public function login(array $data): array {
        if (empty($data['email']) || empty($data['password'])) return ['success'=>false,'message'=>'email and password required'];
        $stmt = $this->db->prepare('SELECT id,password,name,email FROM users WHERE email = :email LIMIT 1');
        $stmt->execute(['email'=>$data['email']]);
        $user = $stmt->fetch();
        if (!$user) return ['success'=>false,'message'=>'Invalid credentials'];
        if (!password_verify($data['password'], $user['password'])) return ['success'=>false,'message'=>'Invalid credentials'];
        $tokens = $this->issueTokensForUser((int)$user['id']);
        return ['success'=>true,'user'=>['id'=>(int)$user['id'],'name'=>$user['name'],'email'=>$user['email']],'tokens'=>$tokens];
    }

    private function issueTokensForUser(int $userId): array {
        $now = time();
        $accessTtl = isset($_ENV['ACCESS_TOKEN_TTL']) ? (int)$_ENV['ACCESS_TOKEN_TTL'] : 900;
        $payload = ['iat'=>$now,'exp'=>$now+$accessTtl,'sub'=>$userId,'iss'=>$_SERVER['HTTP_HOST'] ?? 'todo-app'];
        $accessToken = JWT::encode($payload, $_ENV['JWT_SECRET'] ?? 'default_secret', 'HS256');

        $ip = $_SERVER['REMOTE_ADDR'] ?? null;
        $ua = $_SERVER['HTTP_USER_AGENT'] ?? null;
        $refresh = $this->refreshService->create($userId, $ip, $ua);

        return [
            'access_token' => $accessToken,
            'access_expires_in' => $accessTtl,
            'refresh_token' => $refresh['raw'],
            'refresh_expires_at' => $refresh['expires_at']
        ];
    }

    public function refresh(string $rawRefreshToken): ?array {
        $hash = Token::hash($rawRefreshToken);
        $row = $this->refreshService->findValidByHash($hash);
        if (!$row) return null;
        $userId = (int)$row['user_id'];
        $this->refreshService->revokeById((int)$row['id']);
        $tokens = $this->issueTokensForUser($userId);
        return array_merge(['user_id'=>$userId], $tokens);
    }

    public function logout(string $rawRefreshToken = null, ?int $userId = null, bool $revokeAll = false): bool {
        if ($revokeAll && $userId) {
            $this->refreshService->revokeAllForUser($userId);
            return true;
        }
        if ($rawRefreshToken) {
            $hash = Token::hash($rawRefreshToken);
            return $this->refreshService->revokeByHash($hash);
        }
        return false;
    }

    public function verifyToken(string $token) {
        $secret = $_ENV['JWT_SECRET'] ?? 'default_secret';
        try {
            $decoded = JWT::decode($token, new Key($secret, 'HS256'));
            return $decoded;
        } catch (\Exception $e) {
            return null;
        }
    }
}
