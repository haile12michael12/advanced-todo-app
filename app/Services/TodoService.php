<?php
namespace App\Services;

use App\Models\Todo;

class TodoService {
    private Todo $todo;
    public function __construct() {
        $this->todo = new Todo();
    }

    public function getAllByUser(int $userId) {
        return $this->todo->getAllByUser($userId);
    }

    public function create(array $data) {
        return $this->todo->create($data);
    }

    public function update(array $data) {
        return $this->todo->updateByUser($data);
    }

    public function deleteByUser(int $id, int $userId) {
        return $this->todo->deleteByUser($id, $userId);
    }
}
