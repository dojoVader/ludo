<?php

function getEncodedVideoString($type, $file) { 
   return 'data:audio/' . $type . ';base64,' . base64_encode(file_get_contents($file)); 
}

$wtf = scandir('sounds/');
$wtf = array_slice($wtf, 2);

for ($i = 0; $i < count($wtf); $i++) {
    echo $wtf[$i]." - ".getEncodedVideoString("mp3", "sounds/".$wtf[$i])."<br>";
}

?>