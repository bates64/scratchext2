<?php
//http://scratchextproxy.x10.mx/?p=start.js
header("Access-Control-Allow-Origin: *");

$url = $_GET['p'];

// mime content detector
$finfo = finfo_open($filename);
$mime_type = finfo_file($finfo, $filename);
finfo_close($finfo);

echo '<h1>IN DEVELOPMENT</h1>';

// set MIME type based on extension
echo $mime_type;
header('Content-Type: text/html');

echo file_get_contents('<br>' . 'https://raw.githubusercontent.com/GrannyCookies/scratchext2/master/code/' . $url);
?>
