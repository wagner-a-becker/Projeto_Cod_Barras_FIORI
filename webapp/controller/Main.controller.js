sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, library, JSONModel) {
        "use strict";
        var urlObject = library.URLHelper;

        return Controller.extend("consultaprodutos.controller.Main", {
            onInit: function () {
                let produto = {};
                let productModel = new JSONModel(produto);
                let view = this.getView();
                view.setModel(productModel, "ModeloProduto");
            },

            onClickImage: function (oEvent){
                urlObject.redirect(oEvent.getSource().getSrc(), true );
            },
            onPressBuscar: function(){
               let input;
               input = this.byId("inpBusca");
               let valor = input.getValue();

               let parameters = {
                    url : "https://world.openfoodfacts.org/api/v2/product/" + valor,
                    method : "GET",
                    async : true,
                    crossDomain : true
               };

               $.ajax(parameters).done(function(response){
                let oProdutoModel = this.getView().getModel("ModeloProduto");
                oProdutoModel.setData({});
                oProdutoModel.refresh();
                oProdutoModel.setData(response);
                oProdutoModel.refresh();

               }.bind(this) )
               .fail(function(){

               }.bind(this) );
            }
        });
    });
