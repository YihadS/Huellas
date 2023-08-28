<?php
require 'conn.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, UPDATE');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata, true); // Parse as associative array

    // Get the data from the request
    $idCita = $request["idCita"];
    $fecha = $request["fecha"];
    $costo = $request["costo"];
    $motivo = $request["motivo"];
    $estado = $request["estado"];

    // Update the client data in the database
    $query = "UPDATE cita SET fecha = '$fecha', costo = '$costo', motivo = '$motivo', estado = '$estado'  WHERE idCita = $idCita";

    if (mysqli_query($db, $query)) {
        // Successful update
        echo json_encode(["status" => "success"]);
    } else {
        // Error
        echo json_encode(["status" => "error"]);
    }
}

// Close the database connection
mysqli_close($db);
?>