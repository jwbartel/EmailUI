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
    <link rel="stylesheet" type="text/css" href="libs/jqueryui/1.11.2/jquery-ui.min.css">
    <!--qTip -->
    <link type="text/css" rel="stylesheet" href="libs/qTip/jquery.qtip.css" />
    <!--magnific popup -->
    <link type="text/css" rel="stylesheet" href="libs/magnific/magnific-popup.css" />
    <!--tag-it-->
    <link type="text/css" rel="stylesheet" href="libs/tag-it/jquery.tagit.css" />
    <!--purecss-->
    <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css" />
    <!--Custom CSS-->
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>

<body>
    <div id="header">
            <div id="backButton">&#10094; Go back to list</div>
            <h1 id="title">Question Board</h1>
            <div id="settingsIcon" href="#settingsPopup"></div>
    </div>
    <div id="questionListArea">
        
        <div id="body">
            <h2>Questions</h2>
                <div id="questionList">
                </div>
                <div id="newQuestionButton" data-mfp-src="#newQuestionPopup">
                    New Question
                </div>
        </div>

    </div>
    <div id="questionDetailArea">
        <div id="mainDetailArea"></div>
        <div id="newAnswerButton" data-mfp-src="#newAnswerPopup">
            New Answer
        </div>

    </div>
    <div id="instructions">
        <p></p>
    </div>

    <div id="newQuestionPopup"  class="mfp-hide white-popup">
        <form class="pure-form pure-form-stacked">
            <fieldset>
                    <label for="title">Post title: </label>
                    <input type="text" name="title" id="postTitleField" placeholder="Post title" />
                    <label for="body">Post body: </label>
                    <textarea rows="5" cols="50" name="body" id="postBodyField" placeholder="Post body"></textarea>
                
                    <label for="tags" id="tags-label">Tags: </label>
                    <ul id="postTagsField"></ul>
                <strong>Estimated response time: </strong><span id="newQuestionPopupEstimatedTime">N/A</span>
                <br><br>
                <button type="button" id="newQuestionSubmitButton" class="pure-button pure-button-primary">Submit</button>
            </fieldset>
        </form>
    </div>

    <div id="settingsPopup" class="mfp-hide white-popup">
        <form class="pure-form pure-form-aligned">
            <label for="algorithmDropdown">Algorithm: </label>
            <select name="algorithmDropdown" id="algorithmDropdown">
                <option value="minimum">Minimum</option>
                <option value="average">Average</option>
                <option value="maximum">Maximum</option>
            </select>
            <br><br>
            <button type="button" id="changeAlgorithmButton" class="pure-button pure-button-primary">Set Prediction Algorithm</button>
        </form>
    </div>

    <div id="newAnswerPopup" class="mfp-hide white-popup">
        <form class="pure-form pure-form-stacked">
            <fieldset>
                    <label for="body">Answer body: </label>
                    <textarea rows="5" cols="50" name="body" id="answerBodyField" placeholder="Answer body"></textarea>
                <br><br>
                <button type="button" id="newAnswerSubmitButton" class="pure-button pure-button-primary">Submit</button>
            </fieldset>
        </form>
    </div>

    <!-- JS Files -->
    <script src="libs/jquery.min.js"></script>
    <script src="libs/jqueryui/1.11.2/jquery-ui.min.js"></script>
    <script src="libs/relativeTime.min.js"></script>
    <script type="text/javascript" src="libs/magnific/magnific-popup.js"></script>
    <script type="text/javascript" src="libs/tag-it/tag-it.min.js"></script>
    <script type="text/javascript" src="libs/qTip/jquery.qtip.min.js"></script>
    <script type="text/javascript" src="libs/qTip/imagesloaded.pkg.min.js"></script>
    <script src="libs/Bootstrap/js/bootstrap.min.js"></script>
    <script src="js/objects2.js"></script>
    <script src="js/main2.js"></script>
</body>
</html>
