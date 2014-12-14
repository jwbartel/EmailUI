<?php 
session_start();
if (!isset($_SESSION['id'])) {
    header("Location: consent/consent.html");
}

//fetch the test data

else {

    $data = exec('php php/read_config.php');
    $data = explode(";",$data); //each test case is separated by semi colons
    $_SESSION["number_of_tests"] = count($data) - 1;
    
    if ($_SESSION["current_test"] == $_SESSION["number_of_tests"]) {
		$log_file = $log_url.$_SESSION["id"];
        $result = file_put_contents($log_file, $_SESSION["log"]);
        session_destroy();
        header("Location: html/thankyou.html");
    }

    else
        $data = $data[$_SESSION["current_test"]];
}

?>

<!DOCTYPE html>
<html lang="en">
  <head>
  <script type="text/javascript">
    var data = '<?php echo $data; ?>';
    var current_test = '<?php echo $_SESSION["current_test"]; ?>' + 1;
    var current_user = '<?php echo $_SESSION["signature"];?>';
  </script>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<title> Sample Email </title>

	<!-- Bootstrap -->
    <link href="libs/Bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <!--jQuery UI-->
    <link rel="stylesheet" type="text/css" href="libs/jqueryui/1.10.4/jquery-ui.css">
    <!--Custom CSS-->
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>

<body>
<div id="container">

	<div class = "row" id="header">
		<div id='title'>
			<h2> Email Prediction Test </h2>
			<div id='replayMenu'>
			<input type="button" id="get_file" value="Grab file">
			<input type="file" id="my_file">
		  <!-- <button class='btn-sm replay' onclick='startReplay()'> Play New </button>-->
		   <button class='btn-sm replay' onclick='stop()'> Stop </button>
		   <button class='btn-sm replay'onclick='restart()'> Restart </button>
		   <button class='btn-sm replay' onclick='hide()'> Hide </button>
		</div>
		    <div id='stats'>
		   <div class='replay'> Time : <span id='time'> 0.00 </span> sec </div>
		   <div class='replay'> Button Clicks : <span id='btn_clicks'> 0 </span> </div>
		   <div class='replay'> Key Strokes : <span id='key_stokes'> 0 </span> </div>
		     </div>
	</div>
            <div class="modal fade" id="instructions" role="dialog" tab-index="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title">Instructions</h3>
                        </div>
                        <div class="modal-body">
                            <p></p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-select tracked click" data-dismiss="modal" id="timeNparen">Time and Prediction</button>
							<button type="button" class="btn btn-select tracked click" data-dismiss="modal" id="paren">Prediction</button>
							<button type="button" class="btn btn-select tracked click" data-dismiss="modal" id="time">Time</button>
							<button type="button" class="btn btn-select tracked click" data-dismiss="modal" id="flat">Neither</button>
                        </div>
                    </div>
                </div>
            </div><!-- /.modal -->
			
			<div class="modal fade" id="popup_instr" role="dialog" tab-index="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title">Instructions</h3>
                        </div>
                        <div class="modal-body">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div><!-- /.modal -->

            <div class="modal fade" id="results" role="dialog" tab-index="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title">Result</h3>
                        </div>
                        <div class="modal-body">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal">Continue</button>
                        </div>
                    </div>
                </div>
            </div><!-- /.modal -->
	</div>
    <div class = "row" id="content">
        
    	<div class="col-md-1" id="navigation">
			<div class="btn-group-vertical" id="navigation">
				<button type="button" class="btn btn-default tracked click" id="nav_new_message">New Message</button>
				<button type="button" class="btn btn-default tracked click" id="nav_inbox">Inbox</button>
 				<button type="button" class="btn btn-default tracked click" id="nav_sent">Sent</button>
				<button type="button" class="btn btn-default tracked click" id="play" onclick="showReplay()"> Replay</button>
 				<button type="button" class="btn btn-default tracked click" id="nav_contacts">Contacts</button>
 				<button type="button" class="btn btn-default tracked click" id="nav_trash">Trash</button>
				<button type="button" class="btn btn-default tracked click" id="nav_instructions">Instructions</button>
                <button type="button" class="btn btn-warning tracked click" id="save_session">Quit and Save</button>
                <button type="button" class="btn btn-danger tracked click" id="end_session">Quit</button>
			</div>
            
		</div>
        <div class ="col-md-10" id="email_list">
        	<div class="panel panel-default">
        		<ul class="list-group"></ul>
        	</div>
        </div>
		
		<!--<div class ="col-md-10" id="contact_list">
		    <div class="panel panel-default">
        		<ul class="contact-group"></ul>
        	</div>
        </div>-->
        
        <div class ="col-md-10" id="email_expanded_col">
        	<div class="panel panel-default" id="email_expanded">
  				<div class="panel-heading"><h3 class="panel-title tracked" id="expanded_subject"></h3></div>
  				<div class="panel-body">
  				</div>
			</div>
        </div>

        <div class="col-md-6">
        <div class ="panel panel-default"  id="new_message_editor">
        	<div class="panel-heading">New Message</div>
        	<div class="panel-body">
				<span class="form-control" id="to_field_outer">
					<table>
						<tr>
							<td><div id="contact_box"></div></td>
							<td><input type="text" class='tracked click text' id="to_field" placeholder="To" autofocus><br></td>
						<tr>
						</table>
					</span>
            	<div id="predictions">
            	</div>
            	<input type="text" class="form-control tracked text click" id="cc_field" placeholder="Cc"><br>
            	<input type="text" class="form-control tracked text click" id="subect_field" placeholder="Subject">
            	<br>
            	<textarea rows="12" class ="form-control tracked text click" id="message_field" placeholder="Write your message here"></textarea>
            	<div id="new_message_options">
                	<button type="button" class="btn btn-success tracked click" id="send"> Send </button>
                	<button type="button" class="btn btn-warning tracked click" id="save"> Save Draft</button>
                	<button type="button" class="btn btn-danger tracked click" id="discard"> Discard </button>
           	 	</div>
           	</div>
		</div>
		</div>
	</div>
    <!-- JS Files -->
    <script src="libs/jquery.min.js"></script>
    <script src="libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
    <script src="libs/Bootstrap/js/bootstrap.min.js"></script>

	<script src="js/objects.js"></script>
	<script src="js/main.js"></script>
	<script src='play/replay.js'></script>

</body>
</html>
