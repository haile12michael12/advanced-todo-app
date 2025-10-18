<?php
namespace App\Core;
use PDO;

class Database {
    private static ?PDO $instance = null;

    public static function connect(): PDO {
        if (!self::$instance) {
            $dsn = sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', $_ENV['DB_HOST'] ?? '127.0.0.1', $_ENV['DB_NAME'] ?? 'todo_app');
            self::$instance = new PDO($dsn, $_ENV['DB_USER'] ?? 'root', $_ENV['DB_PASS'] ?? '', [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
        }
        return self::$instance;
    }
}
