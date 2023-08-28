<?php
require 'conn.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata, true);
    // Get the data from the request
    $idCliente = $request["idCliente"]; // Use $request instead of $_GET to get data from the request payload

    // Fetch the name of the client based on the provided ID
    $queryClientName = "SELECT nombre, apellidos FROM cliente WHERE idCliente = '$idCliente'";
    $resultClientName = mysqli_query($db, $queryClientName);
    
    $rowClientName = mysqli_fetch_assoc($resultClientName);
    $nombreCliente = $rowClientName["nombre"];
    $apellidosCliente = $rowClientName["apellidos"];
    
    // Delete the client data from the database
    $query = "DELETE FROM cliente WHERE idCliente = '$idCliente'";
    $query2 = "DELETE FROM mascota WHERE cliente = '$nombreCliente $apellidosCliente'";

    // Inserción a bitácora
    $usuario = $request['userName'];
    $accion = "Se eliminó al ciente " . $nombreCliente . " " . $apellidosCliente;
    $fecha = date("Y-m-d H:i:s"); // Current date and time          
    $query3 =  "INSERT INTO bitacora(fecha, usuario, accion) VALUES ('$fecha', '$usuario', '$accion')";
    
    if (mysqli_query($db, $query) && mysqli_query($db, $query2) && mysqli_query($db, $query3)) { // Execute both queries
        // Successful deletion
        echo json_encode(["status" => "success"]);
    } else {
        // Error
        echo json_encode(["status" => "error"]);
    }
}

// Close the database connection
mysqli_close($db);
?>