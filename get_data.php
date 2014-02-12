<?php
$log_file = "log_file.txt";
$data = $_POST["data"];
file_put_contents($log_file, $data);
?>