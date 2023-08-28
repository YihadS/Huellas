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
$stmt->close();

if ($result) {
    // Inserción a bitácora
    $usuario = $data['userName'];
    $accion = "Se registró la mascota " . $data['nombre'] . " de raza " . $data['raza'];
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
