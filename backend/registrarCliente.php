<?php
require 'conn.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");


// Obtiene los datos del usuario
$data = json_decode(file_get_contents("php://input"), true);

$stmt = $db->prepare("INSERT INTO cliente(nombre, apellidos, carnet, telefono, nacimiento) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssis", $data['nombre'], $data['apellidos'], $data['carnet'], $data['telefono'], $data['nacimiento']);
$result = $stmt->execute();

if ($result) {
  // Success: user inserted
} else {
  // Error: failed to insert user
  die("Error inserting record: " . $stmt->error);
}


$stmt->close();
$db->close();
?>
