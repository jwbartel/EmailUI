<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'GET') { //trying to get existing log
    echo $_SESSION['log'];
}
else { //POST request
	//$log_url = "/afs/cs.unc.edu/home/bartel/emailUI_tracking/";
	$submitted_log = $_POST["data"];
	$log = $_SESSION["log"];
    $_SESSION["log"] = $log.$submitted_log; 
    $_SESSION["current_test"]++;
    
}

?>
