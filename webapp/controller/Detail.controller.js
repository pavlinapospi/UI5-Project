sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
  ],
  function (Controller, History,) {
  "use strict";
  return Controller.extend("sap.ui.demo.controller.Detail", {
    onInit: function () {
      const oRouter = this.getOwnerComponent().getRouter();
      oRouter
        .getRoute("detail")
        .attachPatternMatched(this._onObjectMatched, this);
    },
    _onObjectMatched: function (oEvent) {
      const sId = oEvent.getParameter("arguments").id;
      const oModel = this.getView().getModel("products");
      this.byId("rating").reset();

      const aProducts = oModel.getProperty("/d");
      const oProduct = aProducts.find(function (p) {
        return String(p.ID) === String(sId);
      });
      if (oProduct) {
        const oDetailModel = new sap.ui.model.json.JSONModel(oProduct);
        this.getView().setModel(oDetailModel, "products");
      }
    },
		onNavBack() {
			const oHistory = History.getInstance();
			const sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview", {}, true);
			}
		},
  });
});
