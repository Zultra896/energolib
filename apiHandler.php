<?php
// Включение обработки ошибок (для разработки, потом отключите)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Настройки базы данных
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "databaselib";

// Создание соединения
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка соединения
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Определение действия
$action = isset($_GET['action']) ? $_GET['action'] : null;

// Проверка действия
if (!$action) {
    die(json_encode(["error" => "No action specified"]));
}

// Обработка различных действий
switch ($action) {
    case "getBooks":
        getBooks($conn);
        break;
    case "getSpecialties":
        getSpecialties($conn);
        break;
    default:
        echo json_encode(["error" => "Unknown action: $action"]);
}

// Закрытие соединения
$conn->close();

// Функция для получения книг
function getBooks($conn) {
    $specialtyFilter = isset($_GET['specialty']) ? $_GET['specialty'] : [];
    $specialtyCondition = "";

    if (!empty($specialtyFilter)) {
        $escapedSpecialties = array_map(fn($specialty) => $conn->real_escape_string($specialty), $specialtyFilter);
        $specialtyCondition = "WHERE specialty IN ('" . implode("','", $escapedSpecialties) . "')";
    }

    $sql = "SELECT id, image_url, title, link FROM tablelib $specialtyCondition";
    $result = $conn->query($sql);

    if (!$result) {
        die(json_encode(["error" => "Ошибка SQL: " . $conn->error]));
    }

    $books = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $books[] = $row;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($books);
}

// Функция для получения специальностей
function getSpecialties($conn) {
    $sql = "SELECT DISTINCT specialty FROM tablelib";
    $result = $conn->query($sql);

    if (!$result) {
        die(json_encode(["error" => "Ошибка SQL: " . $conn->error]));
    }

    $specialties = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $specialties[] = $row['specialty'];
        }
    }

    header('Content-Type: application/json');
    echo json_encode($specialties);
}
?>
