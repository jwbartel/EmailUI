<?php 
	session_start();

	$signature = $_POST['participantSig'];
	$date = $_POST['date'];
	$id = time();
	$_SESSION['id'] = $id;
	
	$private_folder= '/afs/cs.unc.edu/home/bartel/emailUI_tracking/private_data/'.$id;
	if (!file_exists ($private_folder)) {
		mkdir($private_folder);
	}
	
	$signatures_file= '/afs/cs.unc.edu/home/bartel/email_threads/private_data/signatures.txt';
	file_put_contents($signatures_file, "".$signature.", ".$date."=>".$id."\n" , FILE_APPEND | LOCK_EX);
	
	header( 'Location: https://wwwp.cs.unc.edu/~bartel/cgi-bin/emailUI/EmailUI/' ) ;

?>
