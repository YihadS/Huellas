<?php
require 'conn.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, UPDATE');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata, true); // Parse as associative array

    // Get the data from the request
    $idCliente = $request["idCliente"];
    $nombre = $request["nombre"];
    $apellidos = $request["apellidos"];
    $telefono = $request["telefono"];
    $carnet = $request["carnet"];
    $nacimiento = $request["nacimiento"];

    // Update the client data in the database
    $query = "UPDATE cliente SET nombre = '$nombre', apellidos = '$apellidos', telefono = '$telefono', carnet = '$carnet', nacimiento = '$nacimiento' WHERE idCliente = $idCliente";

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