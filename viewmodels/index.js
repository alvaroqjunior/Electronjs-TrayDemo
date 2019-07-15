define(function (require) {
    //#region atributtes
    var self = this;
    //#endregion

    //#region model
    var model = {
        Device: ko.observable(''),
        Description: ko.observable(''),
        Name: ko.observable(''),
        AppCount: ko.observable(0),
        TaskCount: ko.observable(0),
        Status: ko.observable('')
    };
    //#endregion

    //#region Constructor
    var indexView = {
        Model: model
    };
    //#endregion

    //#region Actions
    ko.applyBindings(indexView);
    //#endregion

    function getStatus() {
        $.support.cors = true;

        var Params = {};
        Params.type = 'GET';
        Params.url = 'http://localhost:9090/api/test';
        Params.dataType = 'json';
        Params.contentType = "application/json; charset=utf-8";
        Params.cache = false;
        Params.crossDomain= true,
        Params.headers = { 'Access-Control-Allow-Origin': '*', Accept: 'application/json'},
        Params.success = function (data) {
            model.Status(data);
        };
        return $.ajax(Params).fail(
            function (xhr, textStatus, thrownError) {
                model.Status(xhr.responseText + "\n" + xhr.status + "\n" + thrownError);
            });
    }

    function getControllerInfo() {
        $.support.cors = true;

        var Params = {};
        Params.type = 'GET';
        Params.url = 'http://localhost:9090/api/test/controllerinfo';
        Params.dataType = 'json';
        Params.contentType = "application/json; charset=utf-8";
        Params.cache = false;
        Params.crossDomain= true,
        Params.headers = { 'Access-Control-Allow-Origin': '*', Accept: 'application/json'},
        Params.success = function (item) {
            var data = JSON.parse(item);
            model.Device(data.Device);
            model.Description(data.Description);
            model.Name(data.Name);
            model.AppCount(data.AppCount);
            model.TaskCount(data.TaskCount);
        };
        return $.ajax(Params).fail(
            function (xhr, textStatus, thrownError) {
                //model.Status(xhr.responseText + "\n" + xhr.status + "\n" + thrownError);
            });
    }

    getControllerInfo();
    getStatus();

    return indexView;
});
