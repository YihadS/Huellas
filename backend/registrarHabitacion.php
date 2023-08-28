<?php
require 'conn.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");


// Obtiene los datos del usuario
$data = json_decode(file_get_contents("php://input"), true);

$stmt = $db->prepare("INSERT INTO habitacion(nombre, costo, capacidad) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $data['nombre'], $data['costo'], $data['capacidad']);
$result = $stmt->execute();
$stmt->close();

if ($result) {
  // Inserción a bitácora
  $usuario = $data['userName'];
  $accion = "Se registró la habitación: " . $data['nombre'];
  $fecha = date("Y-m-d H:i:s"); // Current date and time
  $stmt2 = $db->prepare("INSERT INTO bitacora(fecha, usuario, accion) VALUES (?, ?, ?)");
  $stmt2->bind_param("sss", $fecha, $usuario, $accion);
  $result2 = $stmt2->execute();
  $stmt2->close();

  if ($result2) {
      // Success: user inserted and bitácora updated
      echo json_encode(array("message" => "User inserted and bitácora updated successfully."));
  } else {
      // Error: failed to insert into bitácora
      echo json_encode(array("message" => "Error updating bitácora."));
  }
} else {
  // Error: failed to insert into cliente
  echo json_encode(array("message" => "Error inserting record."));
}

$db->close();
?>
