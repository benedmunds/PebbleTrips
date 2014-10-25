<?php

//store the json to a file
$store = fopen(__DIR__ . '/logs/' . date('Ymd') . '.txt', 'a');

//error?
if ($store === FALSE)
{
	echo 'Failed to write to logs';
	return FALSE;
}

fwrite($store, date('m-d-Y H:i:s') . ' - ' . "\r\n" . $_POST['message'] . "\r\n\r\n\r\n");
fclose($store);