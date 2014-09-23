<?php 
	session_start();

	$signature = $_POST['participantSig'];
	$date = $_POST['date'];
	$id = time();
	
    $_SESSION['id'] = $id;
	$_SESSION['current_test'] = 0;
	$_SESSION['signature'] = $signature;

    $start_date = date(DATE_COOKIE);
    $_SESSION['log'] = "Started Session on: ".$start_date."\n";
    // $signatures_file= '/afs/cs.unc.edu/home/bartel/emailUI_tracking/private_data/signatures.txt';
	file_put_contents($signatures_file, "".$signature.", ".$date."=>".$id."\n" , FILE_APPEND | LOCK_EX);
	
	header( 'Location: ../index.php' ) ;

?>
