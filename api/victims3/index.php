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
    CASE 
        WHEN RACE = 'BLK' THEN 'Black'
        WHEN RACE = 'WHI' THEN 'White'
        WHEN RACE = 'WWH' THEN 'White Hispanic'
        ELSE 'Unknown'
    END AS Skin,
    COUNT(*) AS Victims
FROM victims
WHERE RACE IN ('BLK', 'WHI', 'WWH')
GROUP BY Race
ORDER BY Race;";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($users);
        } catch (Exception $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;
}
