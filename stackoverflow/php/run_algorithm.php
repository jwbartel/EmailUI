<?php
	$algorithmName = $_POST['algorithm'];
	$json = json_decode($_POST['json']);
	$tags = $json->{'tags'};
	$times = $json->{'times'};
	$tagsString = implode(" ", $tags);
	$timesString = implode(" ", $times);
	$finalString = $algorithmName . " " . count($tags) . " " . $tagsString . " " . $timesString;
	$result = exec("java -jar AlgorithmProcessor.jar " . $finalString);
	echo $result;

?>