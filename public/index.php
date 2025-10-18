<?php
require_once __DIR__ . '/../vendor/autoload.php';

use App\Core\App;

// load env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->safeLoad();

$app = new App();
require_once __DIR__ . '/../routes/web.php';
$app->run();
