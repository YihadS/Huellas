<?php
require 'conn.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, UPDATE');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata, true); // Parse as associative array

    // Get the data from the request
    $idUsuario = $request["idUsuario"];
    $username= $request["username"];
    $contrasena = $request["contrasena"];
    $rol = $request["rol"];

    // Update the client data in the database
    $query = "UPDATE usuario SET username = '$username', contrasena = '$contrasena', rol = '$rol' WHERE idUsuario= $idUsuario";

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