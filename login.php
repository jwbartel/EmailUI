<?php
session_start();
$_SESSION['login'] = time();
header("Location: http://wwwx.cs.unc.edu/~bartel/cgi-bin/emailUI/EmailUI/");
?>