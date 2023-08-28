<?php
session_start();
require 'conn.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Obtiene los datos del usuario
$data = json_decode(file_get_contents("php://input"), true);
error_log(print_r($data, true)); // Log received data

$estado = "En proceso";

// Insert into cita table
$stmt = $db->prepare("INSERT INTO cita(fecha, idCliente, idMascota, idDoctor, idHabitacion, costo, motivo, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssssss", $data['fecha'], $data['idCliente'], $data['idMascota'], $data['idDoctor'], $data['idHabitacion'], $data['costo'], $data['motivo'], $estado);
$result = $stmt->execute();
$stmt->close();

// Inserción a bitácora
$usuario = $data['userName'];
$accion = "Se registró una cita al usuario al cliente " . $data['idCliente'];
$fecha = date("Y-m-d H:i:s"); // Current date and time

$stmt2 = $db->prepare("INSERT INTO bitacora(fecha, usuario, accion) VALUES (?, ?, ?)");
$stmt2->bind_param("sss", $fecha, $usuario, $accion);
$result2 = $stmt2->execute();
$stmt2->close();

if ($result && $result2) {
  // Success: data inserted
} else {
  // Error: failed to insert data
  die("Error inserting record.");
}

$db->close();
?>





