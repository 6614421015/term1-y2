<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


include '../DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();
 
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        try {
        $sql = "select TIME_PERIOD AS Year, COUNT(NUMBER_OF_VICTIMS) AS Total_Victims from victims  WHERE TIME_PERIOD >= 2004 GROUP BY YEAR ORDER BY Year;";
        $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($users);
        } catch (Exception $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;
}
?> 