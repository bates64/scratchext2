<?php

header('Content-Type: text/javascript');
$url = filter_input(INPUT_GET,"link",FILTER_SANITIZE_STRING);
echo $url;

?>