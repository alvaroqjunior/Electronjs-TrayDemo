define(function (require) {
    //#region atributtes
    var self = this;
    //#endregion

    //#region model
    var model = {
        Descricao: ko.observable(''),
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
        $.support.cors = false;

        var Params = {};
        Params.type = 'GET';
        Params.url = 'http://localhost:9090/api/test';
        Params.dataType = 'json';
        Params.contentType = "application/json; charset=utf-8";
        Params.cache = false;
        Params.success = function (data) {
            model.Status(data);
        };
        return $.ajax(Params).fail(
            function (_xhr, _textStatus, _err) {
                model.Status('Error ao buscar status');
            });
    }

    getStatus();

    return indexView;
});
