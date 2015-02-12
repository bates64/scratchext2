<?php
//http://scratchextproxy.x10.mx/?p=start.js&mime=text/javascript
header("Access-Control-Allow-Origin: *");

$mime_type = $_GET['mime'];
header('Content-Type: ' . $mime_type);

// default case
$url = 'https://raw.githubusercontent.com/GrannyCookies/scratchext2/master/code/' . $_GET['p'];

// special cases
if ($url == 'datanarrative') {
  $url = 'https://raw.githubusercontent.com/MrSherlockHolmes/NarrativeC/master/DataNarrative.js';
}

echo file_get_contents($url);
?>
