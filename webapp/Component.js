sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/ODataModel",
  ],
  function (UIComponent) {
    "use strict";
    return UIComponent.extend(
        "sap.ui.demo.Component", {
      metadata: {
        interfaces: [
            "sap.ui.core.IAsyncContentCreation"
        ],
        manifest: "json",

      },
      init: function () {
        UIComponent.prototype.init.apply(this, arguments);
        this.getRouter().initialize();
      },
    });
  }
);
