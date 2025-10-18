<?php
namespace App\Core;

class App {
    public function run() {
        $router = Router::getInstance();
        $router->resolve();
    }
}
