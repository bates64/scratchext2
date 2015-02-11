<?php
// http://www.stefanbates.com/scratchext2/temp/index.php?p=start.js

header('Content-Type: text/javascript');
header("Access-Control-Allow-Origin: *");

$url = $_GET['p'];
echo file_get_contents('https://raw.githubusercontent.com/GrannyCookies/scratchext2/master/code/' . $url);
?>
