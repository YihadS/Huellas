<?php
require 'conn.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata, true);
    // Get the data from the request
    $idCita = $request["idCita"];

    // Use prepared statements to delete the client data
    $stmt = $db->prepare("DELETE FROM cita WHERE idCita = ?");
    $stmt->bind_param("i", $idCita);
    $result = $stmt->execute();
    $stmt->close();

    if ($result) {
        // Inserción a bitácora
        $usuario = $request['userName'];
        $accion = "Se eliminó la cita " . $idCita;
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
