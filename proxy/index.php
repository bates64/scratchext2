<?php
//http://scratchextproxy.x10.mx/?p=start.js&mime=text/javascript
header("Access-Control-Allow-Origin: *");

$url = 'https://raw.githubusercontent.com/GrannyCookies/scratchext2/master/code/' . $_GET['p'];
$mime_type = $_GET['mime'];

header('Content-Type: ' . $mime_type);

echo file_get_contents($url);
?>
