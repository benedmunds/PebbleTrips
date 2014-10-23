<?php

// Copyright 2008-2012 Concur Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may
// not use this file except in compliance with the License. You may obtain
// a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

include_once('tripit.php');

$oauth_consumer_key    = '1923c33a543a1222bedf5483e76cfb4c5a036c22';
$oauth_consumer_secret = 'e226d3c0992d5e1c1f15639bb79e43f9d7997242';

session_start();


if (isset($_REQUEST) && !empty($_REQUEST)) {

	//get the authorized access tokens
	$oauth_credential = new OAuthConsumerCredential($oauth_consumer_key, $oauth_consumer_secret, $_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);

	$tripit = new TripIt($oauth_credential);
	$authed_tokens = $tripit->get_access_token();

	$url = 'pebblejs://close#' . json_encode(array(
		'oauth_token' => $authed_tokens['oauth_token'],
		'oauth_token_secret' => $authed_tokens['oauth_token_secret'],
	));

	//$url = 'http://192.168.10.4/personal/apps/test_pebble/web/get_trips.php';
	//$_SESSION['authed_oauth_token']        = $authed_tokens['oauth_token'];
	//$_SESSION['authed_oauth_token_secret'] = $authed_tokens['oauth_token_secret'];

	header('Refresh: 3; url=' . $url);
	echo '
	   <html>
		 <body style="background-color:#F0F0F0;">
	       <h2 style="color:#333;">You\'ve been Successfully Logged In to TripIt!</h2>
	       <h3 style="color:#333;">Thanks!</h2>
	     </body>
       </html>
    ';
	exit;

}
else {

	echo 'non';
	//get the request token
	$oauth_credential = new OAuthConsumerCredential($oauth_consumer_key, $oauth_consumer_secret);

	$tripit = new TripIt($oauth_credential);
	$tokens = $tripit->get_request_token();

	$_SESSION['oauth_token']        = $tokens['oauth_token'];
	$_SESSION['oauth_token_secret'] = $tokens['oauth_token_secret'];

	$url = 'https://www.tripit.com/oauth/authorize?oauth_token=' . $tokens['oauth_token'] . '&oauth_callback=' . urlencode('http://192.168.10.4/personal/apps/test_pebble/web/login.php');
	header('Location: ' . $url);
	exit;

}