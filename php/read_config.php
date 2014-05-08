<?php

$file = "/afs/cs.unc.edu/home/bartel/public_html/cgi-bin/emailUI/EmailUI/tests/config.properties";

$output = exec('java -jar php/ConfigFileDriver.jar read '.$file);
//$output = exec('/usr/bin/java -jar ConfigFileDriver.jar read config.properties';
//$output = exec('cat write_config.php');
//exec('/usr/bin/java -jar HelloWorld.jar', $output, $return);
echo $output;
?>
