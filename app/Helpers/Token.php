<?php
namespace App\Helpers;

class Token {
    public static function generateRaw(int $bytes = 48): string {
        return bin2hex(random_bytes($bytes));
    }

    public static function hash(string $token): string {
        return hash('sha256', $token);
    }
}
