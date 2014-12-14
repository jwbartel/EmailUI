<?php

$doc_root = $_SERVER['DOCUMENT_ROOT'];

$data = $_POST['log'];

$date = date('m.d.y');

file_put_contents($doc_root.'/play/'.$date.'.txt', $data);

print($_SESSION["signature"]);

?>