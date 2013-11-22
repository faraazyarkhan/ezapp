define(["jquery",
        "backbone",
        "helpers/Constants",
        "helpers/Util",
        "modal",
        "models/ServiceResponseModel",
        "text!templates/serviceaccesserror.html",
        "text!templates/Request/eligibilityrequest.html"],

    function ($,
            Backbone,
            Constants,
            Util,
            modal,
            ServiceResponseModel,
            ServiceErrorModal,
            EligibilityRequest) {

        //var serviceResponseModel = new ServiceResponseModel;

        var Services = {

            //Get Authentication token from the screener response header
            GetAuthenticateToken: function () {
                $.ajax({
                    type: 'HEAD',
                    url: gblAppURL,
                    data: "",
                    async: false,
                    success: function (data, textStatus, request) {
                        Util.getAuthToken(request);
                    },
                    error: function (msg) {
                        console.log('Error getting auth token: ' + msg.status + " - " + msg.statusText);
                    }
                });
            },

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
                        Util.getAuthToken(request);

                        if (serviceOutput && (serviceOutput.ssa && serviceOutput.ssa.active !== true) || (serviceOutput.ffm && serviceOutput.ffm.active !== true) || (serviceOutput.irs && serviceOutput.irs.active !== true)) {
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

            CallEligibility: function (appModel) {

                var token = $('#authtoken').val();
                var screening_id = $('#screeningid').val();
                //var token = $(Constants.AuthHiddenInput).val();
                //var screening_id = $(Constants.ScreeningHiddenInput).val();
                var jsonData = "";
                var requestData = _.template(EligibilityRequest, { model: appModel, modelJSON: appModel.toJSON() });
                requestData = requestData.replace(/(\r\n|\n|\r)/gm, "");

                $.ajax({
                    type: "POST",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader(Constants.AuthResponseHeader, token);
                        xhr.setRequestHeader(Constants.ScreeningIdHeader, screening_id);
                    },
                    url: gblEligibilityServiceURL,
                    //dataType: "json",
                    //contentType: "application/json; charset=utf-8",
                    data: requestData,
                    statusCode: {

                        202: function (response) {

                            Util.getAuthToken(response);
                            try {
                                var location = response.getResponseHeader(Constants.LocationResponseHeader);
                                if (location) gblEligibilityResultsServiceURL = gblServicePath + location;
                            }
                            catch (e) {
                                console.log(Constants.LocationResponseErrorMessage);
                            }

                        } 
                    },
                    success: function (response, textStatus, request) {
                        Util.getAuthToken(request);
                        try {
                            var location = request.getResponseHeader(Constants.LocationResponseHeader);
                            if (location) gblEligibilityResultsServiceURL = gblServicePath + location;
                        }
                        catch (e) {
                            console.log(Constants.LocationResponseErrorMessage);
                        }
                    },
                    error: function (msg) {
                        console.log('Eligibility Service error: ' + msg.status + " - " + msg.statusText);
                    }
                });

                return jsonData;
            },


            GetEligibilityData: function () {
                var token = $('#authtoken').val();
                $.ajax({
                    type: 'GET',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader(Constants.AuthResponseHeader, token);
                    },
                    url: gblEligibilityResultsServiceURL,
                    contentType: 'application/json',
                    data: "",
                    success: function (serviceOutput, textStatus, request) {
                        Util.getAuthToken(request);
                    },
                    error: function (msg) {
                        console.log('Eligibility Check Failure: ' + msg.status + " - " + msg.statusText);
                    }
                });
            },

            SubmitAppData: function (EZAppModel) {

                var token = $('#authtoken').val();
                var screening_id = $('#screeningid').val();
                //var token = $(Constants.AuthHiddenInput).val();
                //var screening_id = $(Constants.ScreeningHiddenInput).val();

                $.ajax({
                    type: "POST",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader(Constants.AuthResponseHeader, token);
                        xhr.setRequestHeader(Constants.ScreeningIdHeader, screening_id);
                    },
                    url: gblApplicationSubmitURL,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(EZAppModel),
                    success: function (serviceOutput, textStatus, request) {
                        Util.getAuthToken(request);
                    },
                    error: function (msg) {
                        console.log('Submit Application Failed: ' + msg.status + " = " + msg.statusText);
                    }
                });
            }


        };
        return Services;


    });
