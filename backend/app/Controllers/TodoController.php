<?php
namespace App\Controllers;

use App\Helpers\Response;
use App\Services\TodoService;

class TodoController {
    private TodoService $todoService;
    public function __construct() {
        $this->todoService = new TodoService();
    }

    public function index() {
        $userId = (int)($_SERVER['user_id'] ?? 0);
        $todos = $this->todoService->getAllByUser($userId);
        return Response::json(['todos'=>$todos]);
    }

    public function store() {
        $userId = (int)($_SERVER['user_id'] ?? 0);
        $data = json_decode(file_get_contents('php://input'), true) ?: [];
        $data['user_id'] = $userId;
        $ok = $this->todoService->create($data);
        return Response::json(['success'=>(bool)$ok], $ok ? 201 : 400);
    }

    public function update() {
        $userId = (int)($_SERVER['user_id'] ?? 0);
        $data = json_decode(file_get_contents('php://input'), true) ?: [];
        $data['user_id'] = $userId;
        $ok = $this->todoService->update($data);
        return Response::json(['success'=>(bool)$ok], $ok ? 200 : 400);
    }

    public function destroy() {
        $userId = (int)($_SERVER['user_id'] ?? 0);
        $data = json_decode(file_get_contents('php://input'), true) ?: [];
        $id = $data['id'] ?? null;
        if (!$id) return Response::json(['error'=>'id required'], 400);
        $ok = $this->todoService->deleteByUser($id, $userId);
        return Response::json(['success'=>(bool)$ok], $ok ? 200 : 404);
    }
}
