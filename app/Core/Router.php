<?php
namespace App\Core;

class Router {
    private static $instance = null;
    private array $routes = [];

    private function __construct(){}

    public static function getInstance(): Router {
        if (!self::$instance) self::$instance = new Router();
        return self::$instance;
    }

    public function add($method, $path, $callback, $middleware = null) {
        $this->routes[$method][$path] = ['handler' => $callback, 'middleware' => $middleware];
    }

    public function get($path, $callback, $middleware = null) {
        $this->add('GET', $path, $callback, $middleware);
    }
    public function post($path, $callback, $middleware = null) {
        $this->add('POST', $path, $callback, $middleware);
    }
    public function put($path, $callback, $middleware = null) {
        $this->add('PUT', $path, $callback, $middleware);
    }
    public function delete($path, $callback, $middleware = null) {
        $this->add('DELETE', $path, $callback, $middleware);
    }

    public function resolve() {
        $uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
        $method = $_SERVER['REQUEST_METHOD'];
        $entry = $this->routes[$method][$uri] ?? null;
        if (!$entry) {
            http_response_code(404);
            echo json_encode(['error' => 'Not Found']);
            return;
        }
        $callback = $entry['handler'];
        $middleware = $entry['middleware'] ?? null;

        $call = function() use ($callback) {
            if (is_array($callback)) {
                [$class, $method] = $callback;
                $obj = new $class();
                return call_user_func([$obj, $method]);
            } elseif (is_callable($callback)) {
                return call_user_func($callback);
            } else {
                return $callback;
            }
        };

        if ($middleware) {
            $mw = new $middleware();
            $result = $mw->handle($call);
            // middleware or handler may already echo & exit
            if ($result !== null) {
                // if middleware returned something printable
                if (is_string($result)) echo $result;
                elseif (is_array($result)) echo json_encode($result);
            }
        } else {
            echo $call();
        }
    }
}

// convenience global router
$router = Router::getInstance();
