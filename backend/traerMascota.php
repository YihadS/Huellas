<?php
require 'conn.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$stmt = $db->prepare("SELECT idMascota, tipo, nombre, raza, edad, sexo, conducta, cliente FROM mascota");
$stmt->execute();

$clientNames = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);


echo json_encode($clientNames);


$stmt->close();
$db->close();
?>