<?php
require 'conn.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");


// Obtiene los datos del usuario
$data = json_decode(file_get_contents("php://input"), true);
error_log(print_r($data, true)); // Log received data

$stmt = $db->prepare("INSERT INTO mascota(nombre, raza, sexo, tipo, cliente, conducta, edad) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $data['nombre'], $data['raza'], $data['sexo'], $data['tipo'], $data['idCliente'], $data['conducta'], $data['edad']);
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
