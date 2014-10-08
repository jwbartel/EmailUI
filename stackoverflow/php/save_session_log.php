<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'GET') { //trying to get existing log
    echo $_SESSION['log'];
}

else { //POST request
	$log_url = "/afs/cs.unc.edu/home/bartel/emailUI_tracking/";
	$data = $_POST["data"];
	$log_name = $_SESSION["id"];
	$log_file = $log_url.$log_name;
	$log = $_SESSION["log"];
    $_SESSION["log"] = $log.$data;
    //print json_encode($_POST);	
    if ($_POST["end_session"] == "true") {
		$result = file_put_contents($log_file, $_SESSION["log"]);
		if ($result === FALSE) 
			echo "Could not write\n";
		else {
		    session_destroy();
		    echo "../html/thankyou.html";
	    }
    }
    
}
	
	
	
	
	

	
	

?>
