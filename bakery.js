//
// Bakery - cookie management module
//

window.onload = load();

var logging = Boolean();

 



function load() {
    console.log("Bakery loaded successfully.");
}



export function logToConsole(param){
    
    switch (param) {

        case true:
            logging = true;
        break;

        case false:
            logging = false;
        break;
    }

}



export function getCookie(name) {

    var cookiestring=RegExp(name+"=[^;]+").exec(document.cookie);
    let value = decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");

    if(logging === true) {
        colorLog(">> executed command: getCookie('" + name + "')", "info");
        console.log(value);
    }

    return [name, value];
}



export function setCookie(name = undefined, value = undefined, expire, path) {

    if(logging === true) {

        colorLog(">> executed command: setCookie('" + name + "', '" + value + "', '" + expire + "', '" + path + "')", "info");
    }

    var expiration;

    if(name) {
        if(value) {
            if(expire) {

                const expirationTime = expire.match(/[\d\.]+|\D+/g);
                var expirationType = expirationTime[1];
        
                var date = new Date();
                var milliseconds;
        
                if(expirationTime[1]) {
                    switch(expirationType) {
        
                        case "s":
                            milliseconds = 1000;
                        break;    
            
                        case "m":
                            milliseconds = 1000 * 60;
                        break;
            
                        case "h":
                            milliseconds = 1000 * 60 * 60;
                        break;
            
                        case "d":
                            milliseconds = 1000 * 60 * 60 * 24;
                        break;
            
                        case "w":
                            milliseconds = 1000 * 60 * 60 * 24 * 7;
                        break;
            
                        case "mo":
                            milliseconds = 1000 * 60 * 60 * 24 * 30;
                        break;
            
                        case "y":
                            milliseconds = 1000 * 60 * 60 * 24 * 365;
                        break;
            
                        default:
                            undefinedTimeUnit(name);
                        break;
        
                    }
                } else {
                    undefinedTimeUnit(name);
                }
        
                date.setTime(date.getTime() + (expirationTime[0] * milliseconds));
                expiration = "; expires=" + date.toGMTString();
        
            } else {
        
                expiration = "";
            }
        
            if(path) {
        
                var declaredPath = path;
            } else {
                
                declaredPath = "";
            }
        
            document.cookie = name + "=" + value + expiration + "; path=/" + declaredPath
    
            //logging
            if(logging === true) {
    
                console.log("Cookie created successfully.")
                console.table({name:name, value:value, expire:expire, path:path})
            }
        
            return [name, value, expire, path];

        } else {
            
            value = undefined;
            undefinedCookieParameter("value");

            document.cookie = name + "=" + value + expiration + "; path=/" + declaredPath
    
            //logging
            if(logging === true) {
    
                console.log("Cookie created successfully.")
                console.table({name:name, value:value, expire:expire, path:path})
            }
        
            return [name, value, expire, path];
        }

    } else {
        undefinedCookieParameter("name");
    }

}



export function removeCookie(name) {

    if(logging === true) {

        colorLog(">> executed command: removeCookie('" + name + "')", "info");
    }

    if(name) {
        
        document.cookie = name + "=empty; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // logging
        if(logging === true) {

            console.log("Cookie '" + name + "' has been removed successfully.")
        }

    } else {

        undefinedCookieName();
    }
}



export function removeAllCookies() {

    document.cookie.split(";").forEach(function(c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
    });

    // logging
    if(logging === true) {

        colorLog(">> executed command: removeAllCookies()", "info");
        console.log("All cookies has been removed successfully.")
    }
}



export function listCookies() {

    // logging
    if(logging === true) {

        colorLog(">> executed command: listCookies()", "info");
    }

    var list = Object.fromEntries(document.cookie.split('; ').map(c => c.split('=')));
    console.table(list);
}



//
// Error warnings
//

function undefinedTimeUnit(name) {
    if(logging === true) {
        console.warn("WARNING: A correct time unit has not been specified. \nCookie '" + name + "' will expire after current session. \nTo get a list of correct time units, please refer to Bakery's GitHub page. \nhttps://github.com/cinkciarzkozak/bakery/");
    }
}

function undefinedCookieName() {
    if(logging === true) {
        console.warn("WARNING: Cookie cannot be removed: cookie name has not been specified.");
    }
}

function undefinedCookieParameter(param) {
    if(logging === true) {
        switch(param) {
            case "name":
                console.error("ERROR: Cookie cannot be created: cookie name has not been specified.");
            break;
    
            case "value":
                console.warn("WARNING: cookie value has not been specified.");
            break;
        }
    }
}

//
// Colored logs
//

function colorLog(message, color) {

    color = color || "black";

    switch (color) {
        case "success":  
            color = "Green"; 
            break;
        case "info":     
            color = "DodgerBlue";  
            break;
        case "error":   
            color = "Red";     
            break;
        case "warning":  
            color = "Orange";   
            break;
        default: 
             color = color;
    }

    console.log("%c" + message, "color:" + color);
}