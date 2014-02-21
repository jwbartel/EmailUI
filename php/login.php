<?php
session_start();

$_SESSION["login"]="Eliezer Encarnacion";
$_SESSION["start_date"] = date(DATE_COOKIE);
$_SESSION["filename"] = strval(time());
$_SESSION["log"] = "Session started at: " + $_SESSION["start_date"]+'\n';

header("Location: http://wwwx.cs.unc.edu/~bartel/cgi-bin/emailUI/EmailUI/");
die();
?>

