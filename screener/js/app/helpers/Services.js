define(["jquery",
        "backbone",
        "helpers/Constants",
        "helpers/Util",
        "modal",
        "text!templates/ServiceAccessError.html",
        "text!templates/Requests/screenerRequest.htm"],

    function ($,
            Backbone,
            Constants,
            Util,
            modal,
            ServiceErrorModal,
            requestTemplate) {


        var Services = {

            //Heartbeat poll recurring service call 
            HeartbeatPoll: function () {
                var self = this;
                var token = $('#authtoken').val();
                //setTimeout(function () {
                $.ajax({
                    type: 'GET',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader(Constants.AuthResponseHeader, token);
                    },
                    url: gblHeartBeatServiceURL,
                    data: "",
                    success: function (serviceOutput, textStatus, request) {
                        var authtoken = request.getResponseHeader('X-Auth-Token');
                        if (authtoken) $('#authtoken').val(authtoken);
                        if (serviceOutput && serviceOutput.ssa.active !== true || serviceOutput.ffm.active !== true || serviceOutput.irs.active !== true) {
                            $.modal(ServiceErrorModal);
                        }
                        //self.HeartbeatPoll();
                    },
                    error: function (msg) {
                        console.log('Heartbeat service error: ' + msg.status + " - " + msg.statusText);
                    }
                });
                //}, gblHeartBeatServiceInterval);
            },

            //Get Authentication token from the screener response header
            GetAuthenticateToken: function () {
                $.ajax({
                    type: 'HEAD',
                    url: gblScreenerURL,
                    data: "",
                    async: false,
                    success: function (data, textStatus, request) {
                        var authtoken = request.getResponseHeader('X-Auth-Token');
                        if (authtoken) $('#authtoken').val(authtoken);
                    },
                    error: function (msg) {
                        console.log('Token service error: ' + msg.status + " - " + msg.statusText);
                    }
                });
            },

            //Make screener service call to the middleware to validate user data and get screener 
            AuthenticateToken: function (applicationID, model) {
                var token = $('#authtoken').val();

                var requestData = _.template(requestTemplate, { token: token, model: model, applicationID: applicationID, Util: Util });
                requestData = requestData.replace(/(\r\n|\n|\r)/gm, "");

                $.ajax({
                    type: "POST",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('X-Auth-Token', token);
                    },
                    url: gblAuthenticateServiceURL,
                    async: false,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: requestData,
                    success: function (serviceOutput, textStatus, request) {

                        var authtoken = request.getResponseHeader('X-Auth-Token');
                        if (authtoken) $('#authtoken').val(authtoken);
                        var familySize = model.noOfFamily || 1;
                        if (serviceOutput && serviceOutput.status == 'OK' && serviceOutput.screening_id.length >= 0) {
                            var value = '{"screening_id":"' + serviceOutput.screening_id + '","X_Auth_Token":"' + authtoken + '","state":"' + model.applyingCoverageState + '","noOfFamily":"' + familySize + '","coverage":"' + model.coverage + '"}';
                            sessionStorage.clear();
                            sessionStorage.setItem("handShake", value);
                            window.location = gblEZappURL;
                        }
                        else
                            console.log('Status or Screening id is not valid');
                    },
                    error: function (msg) {
                        //TODO: Remove the following section
                        var screening_id = "empty_screener";
                        var authtoken = $('#authtoken').val();
                        var familySize = model.noOfFamily || 1;
                        var value = '{"screening_id":"' + screening_id + '","X_Auth_Token":"' + authtoken + '","state":"' + model.applyingCoverageState + '","noOfFamily":"' + familySize + '","coverage":"' + model.coverage + '"}';
                        sessionStorage.clear();
                        sessionStorage.setItem("handShake", value);
                        window.location = gblEZappURL;

                        console.log('Screener service error: ' + msg.status + " - " + msg.statusText);

                    }
                });

            }
        }
        return Services;

    });
        

