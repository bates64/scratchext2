<?php
//http://scratchextproxy.x10.mx/?p=start.js

header("Access-Control-Allow-Origin: *");

$url = $_GET['p'];

// set MIME type based on extension
$parts=explode(".", $_POST[$url]);
echo $parts[count($parts)-1];
header('Content-Type: text/javascript');

echo file_get_contents('https://raw.githubusercontent.com/GrannyCookies/scratchext2/master/code/' . $url);
?>
