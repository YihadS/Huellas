<?php
require 'conn.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata, true);
    // Get the data from the request
    $idMascota = $request["idMascota"];

    // Fetch the name of the mascota based on the provided ID
    $queryMascotaName = "SELECT nombre FROM mascota WHERE idMascota = ?";
    $stmt = $db->prepare($queryMascotaName);
    $stmt->bind_param("i", $idMascota);
    $stmt->execute();
    $stmt->bind_result($nombreMascota);
    $stmt->fetch();
    $stmt->close();

    // Use prepared statements to delete the mascota data
    $queryDeleteMascota = "DELETE FROM mascota WHERE idMascota = ?";
    $stmt2 = $db->prepare($queryDeleteMascota);
    $stmt2->bind_param("i", $idMascota);
    $result = $stmt2->execute();
    $stmt2->close();

    if ($result) {
        // Inserción a bitácora
        $usuario = $request['userName'];
        $accion = "Se eliminó la mascota " . $nombreMascota;
        $fecha = date("Y-m-d H:i:s"); // Current date and time
        $queryInsertBitacora = "INSERT INTO bitacora (fecha, usuario, accion) VALUES (?, ?, ?)";
        $stmt3 = $db->prepare($queryInsertBitacora);
        $stmt3->bind_param("sss", $fecha, $usuario, $accion);
        $result2 = $stmt3->execute();
        $stmt3->close();

        if ($result2) {
            // Successful deletion and bitácora update
            echo json_encode(["status" => "success"]);
        } else {
            // Error updating bitácora
            echo json_encode(["status" => "error", "message" => "Error updating bitácora."]);
        }
    } else {
        // Error deleting
        echo json_encode(["status" => "error", "message" => "Error deleting record."]);
    }
}

// Close the database connection
$db->close();
?>