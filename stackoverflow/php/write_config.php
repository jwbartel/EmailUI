<?php

//$file = "../config.properties";
$file = "../tests";

$output = exec('java -jar ConfigFileDriver.jar write '.$file);
print $output;
?>
