<?php
$log_file = "/afs/cs.unc.edu/home/bartel/emailUI_tracking/log_file.txt";
$data = $_POST["data"];
file_put_contents($log_file, $data);
?>
