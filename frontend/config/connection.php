<?php
error_reporting(E_ALL);
// $servername = $_SERVER['HTTP_HOST'];
// $servername = 'localhost';
// $username = "root";
// $password = "";

// server
if ($_SERVER['HTTP_HOST'] == '150.242.111.235' || $_SERVER['HTTP_HOST'] == 'localhost') {
    // server
    $servername = '150.242.111.235';
    $username = "root";
    $password = "r00t@dm1n05";
    $dbname = "smsbc_telin";
}else{
    // server
    $servername = 'localhost';
    $username = "root";
    $password = "R0012qwe!!@";
    $dbname = "smsbc_telin";
}
// $servername = '150.242.111.235';
// $username = "root";
// $password = "r00t@dm1n05";
// $dbname = "smsbc_telin";


// local
// $servername = 'localhost';
// $username = "root";
// $password = "";
// $dbname = "smsbc_telin";

$link = mysqli_connect($servername, $username, $password, $dbname);

if (!$link) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}
