<?php

$file = "../config.properties";

$output = exec('/usr/bin/java -jar ConfigFileDriver.jar write '.$file);
print $output;
?>
