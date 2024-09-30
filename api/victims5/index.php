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
            $sql = "SELECT TIME_PERIOD AS Year, 
CASE
    WHEN PRIMARY_TYPE IN ('ASSAULT', 'BATTERY') THEN 'Violent Crimes'
    WHEN PRIMARY_TYPE = 'CRIMINAL SEXUAL ASSAULT' THEN 'Sexual Assault'
    WHEN PRIMARY_TYPE = 'HOMICIDE' THEN 'Homicide'
    WHEN PRIMARY_TYPE = 'ROBBERY' THEN 'Robbery'
    WHEN PRIMARY_TYPE = 'NON-FATAL' THEN 'NON-FATAL'
END AS Cause,
COUNT(*) AS Impact
FROM victims
WHERE TIME_PERIOD >= 2004
AND PRIMARY_TYPE IS NOT NULL
GROUP BY TIME_PERIOD, Cause
ORDER BY TIME_PERIOD;";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($users);
        } catch (Exception $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;
}
