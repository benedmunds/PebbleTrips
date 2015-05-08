<?php

$oauth_consumer_key    = '';
$oauth_consumer_secret = '';

session_start();

$authed_oauth_token = $_SESSION['authed_oauth_token'];
$authed_oauth_token_secret = $_SESSION['authed_oauth_token_secret'];

var_dump($authed_oauth_token);


$headers = array(
	'Authorization' => 'OAuth realm="https://api.tripit.com/",
          consumer_key="' . $oauth_consumer_key . '",
          oauth_consumer_key="' . $oauth_consumer_key . '",
          oauth_token="' . $authed_oauth_token . '",
          oauth_signature_method="HMAC-SHA1",
          oauth_timestamp="' . time() . '",
          oauth_nonce="' . microtime() . '",
          oauth_version="1.0"',
);

var_dump($headers);


date_default_timezone_set('America/Chicago');

$ch = curl_init('https://api.tripit.com/v1/list/trip?format=json');
curl_setopt($ch, CURLINFO_HEADER_OUT, TRUE);
curl_setopt($ch, CURLOPT_VERBOSE, TRUE);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
curl_setopt ($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

var_dump(curl_getinfo($ch));

$response = curl_exec($ch);

var_dump($response);
