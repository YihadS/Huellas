<?php
require 'conn.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, UPDATE');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata, true); // Parse as associative array

    // Get the data from the request
    $idMascota = $request["idMascota"];
    $nombre = $request["nombre"];
    $raza = $request["raza"];
    $edad = $request["edad"];
    $sexo = $request["sexo"];
    $conducta = $request["conducta"];
    $cliente = $request["cliente"];
    $tipo = $request["tipo"];

    // Update the client data in the database
    $query = "UPDATE mascota SET nombre = '$nombre', raza = '$raza', edad = '$edad', sexo = '$sexo', conducta= '$conducta', tipo= '$tipo', cliente= '$cliente' WHERE idMascota = $idMascota ";

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