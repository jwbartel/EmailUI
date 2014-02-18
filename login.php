<?php
session_start();
$_SESSION["login"]="Yes, I'm in";
header("Location: http://www.google.com");
//header("Location: http://wwwx.cs.unc.edu/~bartel/cgi-bin/emailUI/EmailUI/");
die();
?>

