<?php

$file = "tests/config.properties";

$output = exec('java -jar php/ConfigFileDriver.jar read '.$file);
//$output = exec('/usr/bin/java -jar ConfigFileDriver.jar read config.properties';
//$output = exec('cat write_config.php');
//exec('/usr/bin/java -jar HelloWorld.jar', $output, $return);
echo $output;
?>
