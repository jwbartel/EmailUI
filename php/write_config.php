<?php

$file = "/afs/cs.unc.edu/home/bartel/public_html/cgi-bin/emailUI/config.properties";

exec('java -jar ConfigFileDriver.jar write '.$file);
?>