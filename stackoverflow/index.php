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
    <div id="header">
            <div id="backButton">&#10094; Go back to list</div>
            <h1 id="title">Question Board</h1>
    </div>
    <div id="questionListArea">
        
        <div id="body">
            <h2>Questions</h2>
                <div id="questionList">
                </div>
        </div>

    </div>
    <div id="questionDetailArea">

    </div>
    <div id="instructions">
        <p></p>
    </div>

    <!-- JS Files -->
    <script src="libs/jquery.min.js"></script>
    <script src="libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
    <script src="libs/relativeTime.min.js"></script>
    <script src="libs/Bootstrap/js/bootstrap.min.js"></script>
    <script src="js/objects2.js"></script>
    <script src="js/main2.js"></script>
</body>
</html>
