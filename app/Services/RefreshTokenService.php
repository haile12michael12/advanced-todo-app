<?php
namespace App\Services;

use App\Core\Database;
use App\Helpers\Token;
use PDO;
use DateTime;
use DateInterval;

class RefreshTokenService {
    private PDO $db;
    public function __construct() {
        $this->db = Database::connect();
    }

    public function create(int $userId, ?string $ip = null, ?string $userAgent = null): array {
        $raw = Token::generateRaw(48);
        $hash = Token::hash($raw);
        $ttl = isset($_ENV['REFRESH_TOKEN_TTL']) ? (int)$_ENV['REFRESH_TOKEN_TTL'] : 1209600;
        $expiresAt = (new DateTime())->add(new DateInterval('PT' . $ttl . 'S'))->format('Y-m-d H:i:s');
        $stmt = $this->db->prepare('INSERT INTO refresh_tokens (user_id, token_hash, expires_at, ip, user_agent) VALUES (:user_id, :token_hash, :expires_at, :ip, :user_agent)');
        $stmt->execute(['user_id'=>$userId,'token_hash'=>$hash,'expires_at'=>$expiresAt,'ip'=>$ip,'user_agent'=>$userAgent]);
        return ['raw'=>$raw,'expires_at'=>$expiresAt,'id'=>(int)$this->db->lastInsertId()];
    }

    public function revokeByHash(string $hash): bool {
        $stmt = $this->db->prepare('UPDATE refresh_tokens SET revoked = 1 WHERE token_hash = :token_hash');
        $stmt->execute(['token_hash'=>$hash]);
        return $stmt->rowCount() > 0;
    }

    public function revokeAllForUser(int $userId): int {
        $stmt = $this->db->prepare('UPDATE refresh_tokens SET revoked = 1 WHERE user_id = :user_id');
        $stmt->execute(['user_id'=>$userId]);
        return $stmt->rowCount();
    }

    public function findValidByHash(string $hash) {
        $stmt = $this->db->prepare('SELECT * FROM refresh_tokens WHERE token_hash = :token_hash LIMIT 1');
        $stmt->execute(['token_hash'=>$hash]);
        $row = $stmt->fetch();
        if (!$row) return null;
        if ((int)$row['revoked'] === 1) return null;
        if (new DateTime($row['expires_at']) < new DateTime()) return null;
        return $row;
    }

    public function revokeById(int $id): bool {
        $stmt = $this->db->prepare('UPDATE refresh_tokens SET revoked = 1 WHERE id = :id');
        $stmt->execute(['id'=>$id]);
        return $stmt->rowCount() > 0;
    }
}
