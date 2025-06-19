sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
  ],
  function (Controller, JSONModel, MessageBox) {
    "use strict";
    return Controller.extend("sap.ui.demo.controller.App", {
      onInit: function () {
        const oModel = new JSONModel(
          sap.ui.require.toUrl("sap/ui/demo/Data.json")
        );
        this.getView().setModel(oModel, "products");
      },
      onPress: function (oEvent) {
        const oCtx = oEvent.getSource().getBindingContext("products");
        const sId = oCtx.getProperty("ID");
        this.getOwnerComponent().getRouter().navTo("detail", { id: sId });
      },
      onAddProductPress: function () {
        this.getView().byId("addProductDialog").open();
      },
      onCancelAddProduct: function () {
        this.getView().byId("addProductDialog").close();
        this._clearAddProductForm();
      },
      onConfirmAddProduct: function () {
        const oView = this.getView();
        const sName = oView.byId("newProductName").getValue();
        const sPrice = oView.byId("newProductPrice").getValue();
        const iRating = oView.byId("newProductRating").getValue();
        if (
          !sName ||
          !sPrice ||
          isNaN(parseFloat(sPrice)) ||
          iRating < 1 ||
          iRating > 5
        ) {
          MessageBox.error("Vyplňte správně všechna pole!");
          return;
        }
        const oModel = oView.getModel("products");
        const aProducts = oModel.getProperty("/d");
        const oNewProduct = {
          ID: aProducts.length,
          Name: sName,
          Description: "",
          Price: parseFloat(sPrice).toFixed(2),
          Rating: iRating,
        };
        aProducts.push(oNewProduct);
        oModel.setProperty("/d", aProducts);
        this.onCancelAddProduct();
        MessageBox.success("Produkt byl úspěšně přidán!");
      },
      _clearAddProductForm: function () {
        const oView = this.getView();
        oView.byId("newProductName").setValue("");
        oView.byId("newProductPrice").setValue("");
        oView.byId("newProductRating").setValue(3);
      },
    });
  }
);
