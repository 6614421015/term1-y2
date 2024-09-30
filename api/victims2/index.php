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
    WHEN AGE BETWEEN 0 AND 10 THEN '0-10'
    WHEN AGE BETWEEN 11 AND 20 THEN '11-20'
    WHEN AGE BETWEEN 21 AND 30 THEN '21-30'
    WHEN AGE BETWEEN 31 AND 40 THEN '31-40'
    WHEN AGE BETWEEN 41 AND 50 THEN '41-50'
    WHEN AGE BETWEEN 51 AND 60 THEN '51-60'
    WHEN AGE BETWEEN 61 AND 70 THEN '61-70'
    WHEN AGE BETWEEN 71 AND 80 THEN '71-80'
    ELSE 'Unknown'
  END AS AgeRange,
  COUNT(*) AS Total_Death
FROM victims
where TIME_PERIOD >= 2004
GROUP BY TIME_PERIOD, AgeRange
ORDER BY TIME_PERIOD, AgeRange;";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($users);
        } catch (Exception $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;
}
