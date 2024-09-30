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
            $sql = "SELECT 
  TIME_PERIOD AS Year,
  CASE 
    WHEN SEX = 'M' THEN 'Male'
    WHEN SEX = 'F' THEN 'Female'
    ELSE 'Unknown'
  END AS Gender,
  COUNT(*) AS Victims
FROM victims
where TIME_PERIOD >= 2004
GROUP BY TIME_PERIOD, SEX
ORDER BY TIME_PERIOD, SEX;";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($users);
        } catch (Exception $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;
}
