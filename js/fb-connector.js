var APP_ID = "";

/*
*   FB/login foo
*/

FB._https = true;
FB.init({
    appId  : APP_ID,
    status : true, // check login status
    cookie : true, // enable cookies to allow the server to access the session
    xfbml  : true, // parse XFBML
    oauth  : true // enable oauth 2.0
});

window.fbAsyncInit = function() {
    // FB.Canvas.setSize();
}

FB.Canvas.setAutoResize(true);

function login(next_function) {
    FB.login(function(response) {
    	console.log("in login, response: ", response);
        if (response.authResponse !== null) {
            current_session = response.authResponse;
            current_user = response.authResponse.userID;
            next_function();
      	} else {
            // some error message
            $("body").html("<h2>Sorry, some error occurred or you are not authorized.</h2>");
      	}
    },
    {
      	scope:'read_stream,publish_stream,offline_access,email'
    });
}

function check_login(next_function) {
	console.log("in check_login");
	FB.getLoginStatus(function(response) {
		console.log("response", response);
		if (response.authResponse !== null) {
			current_session = response.authResponse;
			current_user = response.authResponse.userID;
			next_function();
		} else if (response.status == "not_authorized") {
			// not an admin

		} else {
			login(next_function);
		}
	});
}