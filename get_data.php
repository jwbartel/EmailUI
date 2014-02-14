<?php
$log_url = "/afs/cs.unc.edu/home/bartel/emailUI_tracking/";
$data = $_POST["data"];
$log_file = $_POST["file_name"];

file_put_contents($log_url.$log_file."txt", $data);
?>
