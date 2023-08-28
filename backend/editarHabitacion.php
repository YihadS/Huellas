<?php
require 'conn.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, UPDATE');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata, true); // Parse as associative array

    // Get the data from the request
    $idHabitacion = $request["idHabitacion"];
    $nombre = $request["nombre"];
    $costo = $request["costo"];
    $capacidad = $request["capacidad"];

    // Update the client data in the database
    $query = "UPDATE habitacion SET nombre = '$nombre', costo = '$costo', capacidad = '$capacidad' WHERE idHabitacion= $idHabitacion";

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