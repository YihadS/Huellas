<?php
require 'conn.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$stmt = $db->prepare("SELECT idCliente, nombre, apellidos, carnet, telefono, nacimiento FROM cliente");
$stmt->execute();

$clientNames = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);


echo json_encode($clientNames);


$stmt->close();
$db->close();
?>