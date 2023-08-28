<?php
require 'conn.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata, true);
    // Get the data from the request
    $idDoctor = $request["idDoctor"];

    // Fetch the name of the client based on the provided ID
    $queryClientName = "SELECT nombre, apellidos FROM doctor WHERE idDoctor = '$idDoctor'";
    $resultClientName = mysqli_query($db, $queryClientName);
    
    $rowClientName = mysqli_fetch_assoc($resultClientName);
    $nombreCliente = $rowClientName["nombre"];
    $apellidosCliente = $rowClientName["apellidos"];

    // Use prepared statements to delete the doctor data
    $stmt = $db->prepare("DELETE FROM doctor WHERE idDoctor = ?");
    $stmt->bind_param("i", $idDoctor);
    $result = $stmt->execute();
    $stmt->close();

    if ($result) {
        // Inserción a bitácora
        $usuario = $request['userName'];
        $accion = "Se eliminó al doctor " . $nombreCliente . " " . $apellidosCliente;
        $fecha = date("Y-m-d H:i:s"); // Current date and time
        $stmt2 = $db->prepare("INSERT INTO bitacora (fecha, usuario, accion) VALUES (?, ?, ?)");
        $stmt2->bind_param("sss", $fecha, $usuario, $accion);
        $result2 = $stmt2->execute();
        $stmt2->close();

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