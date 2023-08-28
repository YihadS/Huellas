<?php
require 'conn.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, UPDATE');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata, true); // Parse as associative array

    // Get the data from the request
    $idDoctor = $request["idDoctor"];
    $nombre = $request["nombre"];
    $apellidos = $request["apellidos"];
    $telefono = $request["telefono"];
    $carnet = $request["carnet"];
    $nacimiento = $request["nacimiento"];
    $sueldo = $request["sueldo"];
    $especialidad = $request["especialidad"];

    // Update the client data in the database
    $query = "UPDATE doctor SET nombre = '$nombre', apellidos = '$apellidos', telefono = '$telefono', carnet = '$carnet', nacimiento = '$nacimiento', sueldo = '$sueldo', especialidad = '$especialidad' WHERE idDoctor= $idDoctor";

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