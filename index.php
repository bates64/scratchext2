<?php
// this should be our rawgit mini :D

header('Content-Type: text/javascript');
header("Access-Control-Allow-Origin: *");

$url = filter_input(INPUT_GET,"link",FILTER_SANITIZE_STRING);
echo $url;
?>
