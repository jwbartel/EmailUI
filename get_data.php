<?php
$log_url = "/afs/cs.unc.edu/home/bartel/emailUI_tracking/";
$data = $_POST["data"];
$log_name = $_POST["file_name"];
$log_file = $log_url.$log_name."txt";
$result = file_put_contents($log_file, $data);
if ($result === FALSE) {
	echo "Could not write\n";
}
echo $log_file;
?>
