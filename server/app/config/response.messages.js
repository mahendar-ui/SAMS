const resMessages = {
    "errors" :{
        "error_unknown" : {
            
        },
        "error_500" : {
            "errorCode" : 500,
            "errorMessage" : "Server connection error"
        },
        "error_403" : {
            "errorCode" : 403,
            "errorMessage" : "Session Expired"
        },
        "error_404" : {
            "errorCode" : 404,
            "errorMessage" : "Page not found"
        }
    },
    "auth" : {
        "token" : {
            "error" : {
                "expMessage" : "Token Expired",
                "notValidMessage" : "Token not valid"
            },
            "info" : {
                "statusCode" : 200,
                "successMessage" : "Token Vaild",
            }
        },
        "authInfo" : {
            "error" : {
                "notValidInfoMessage" : "Provided login details not valid" 
            }
        }
    }
}
module.exports = resMessages;