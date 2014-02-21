<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'GET') { //trying to get existing log
		echo $_SESSION["log"];
}
else { //POST request
	$log_url = "/afs/cs.unc.edu/home/bartel/emailUI_tracking/";
	$data = $_POST["data"];
	$log_name = $_SERVER["id"];
	$log_file = $log_url.$log_name;
	$_SERVER["log"] = $_SERVER["log"].$data;

	if ($_POST["end_session"]) {
		
		$result = file_put_contents($log_file, $_SERVER["log"]);
		if ($result === FALSE) 
			echo "Could not write\n";
		
		session_destroy();
		echo "http://wwwx.cs.unc.edu/~bartel/cgi-bin/emailUI/EmailUI/html/thankyou.html";
	}
}
	
	
	
	
	

	
	

?>
