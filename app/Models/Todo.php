<?php
namespace App\Models;
use App\Core\Database;
use PDO;

class Todo {
    private PDO $db;
    public function __construct() {
        $this->db = Database::connect();
    }

    public function getAllByUser(int $userId) {
        $stmt = $this->db->prepare('SELECT * FROM todos WHERE user_id = :user_id ORDER BY created_at DESC');
        $stmt->execute(['user_id'=>$userId]);
        return $stmt->fetchAll();
    }

    public function create(array $data) {
        $stmt = $this->db->prepare('INSERT INTO todos (user_id, title, description, priority, due_date, created_at) VALUES (:user_id, :title, :description, :priority, :due_date, NOW())');
        return $stmt->execute([
            'user_id' => $data['user_id'],
            'title' => $data['title'] ?? '',
            'description' => $data['description'] ?? '',
            'priority' => $data['priority'] ?? 'medium',
            'due_date' => $data['due_date'] ?? null
        ]);
    }

    public function updateByUser(array $data) {
        $stmt = $this->db->prepare('UPDATE todos SET title=:title, description=:description, priority=:priority, due_date=:due_date, updated_at=NOW() WHERE id=:id AND user_id=:user_id');
        return $stmt->execute([
            'title' => $data['title'] ?? '',
            'description' => $data['description'] ?? '',
            'priority' => $data['priority'] ?? 'medium',
            'due_date' => $data['due_date'] ?? null,
            'id' => $data['id'],
            'user_id' => $data['user_id']
        ]);
    }

    public function deleteByUser(int $id, int $userId) {
        $stmt = $this->db->prepare('DELETE FROM todos WHERE id = :id AND user_id = :user_id');
        $stmt->execute(['id'=>$id,'user_id'=>$userId]);
        return $stmt->rowCount() > 0;
    }
}
