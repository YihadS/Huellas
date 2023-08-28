<?php
require 'conn.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$stmt = $db->prepare("
    SELECT
        c.idCita,
        c.costo,
        c.motivo,
        c.fecha,
        c.estado,
        d.nombre AS nombreDoctor,
        d.apellidos AS apellidosDoctor,
        cl.nombre AS nombreCliente,
        cl.apellidos AS apellidosCliente,
        h.nombre AS nombreHabitacion,
        m.nombre AS nombreMascota
    FROM cita c
    JOIN doctor d ON c.idDoctor = d.idDoctor
    JOIN cliente cl ON c.idCliente = cl.idCliente
    JOIN habitacion h ON c.idHabitacion = h.idHabitacion
    JOIN mascota m ON c.idMascota = m.idMascota
");

$stmt->execute();

$citaData = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

echo json_encode($citaData);

$stmt->close();
$db->close();
?>