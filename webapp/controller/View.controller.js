sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (Controller, Fragment, MessageToast, JSONModel) {
    "use strict";

    return Controller.extend("app001.controller.View", {

        onInit: function () {
            // Always get model here
            this.oInvoiceModel = this.getView().getModel("invoice");

            
        },

        // OPEN FRAGMENT
        onitem: function () {
            var oView = this.getView();

            if (!this.byId("addItemDialog")) {
                Fragment.load({
                    id: oView.getId(),
                    name: "app001.view.Newitem",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    oDialog.open();
                }.bind(this));   // <-- IMPORTANT bind(this)
            } else {
                this.byId("addItemDialog").open();
            }
        },

        // SAVE NEW ITEM
        onSaveItem: function () {
            // Always refresh model reference
            this.oInvoiceModel = this.getView().getModel("invoice");

            

            // Read input values
            var sProduct = this.byId("inpProduct").getValue();
            var sQty = Number(this.byId("inpQty").getValue());
            var sPrice = Number(this.byId("inpPrice").getValue());

            if (!sProduct || !sQty || !sPrice) {
                MessageToast.show("Please fill all fields");
                return;
            }

            // Read existing array
            var aData = this.oInvoiceModel.getProperty("/Invoices");

            // Push new item
            aData.push({
                ProductName: sProduct,
                Quantity: sQty,
                ExtendedPrice: sPrice,
                ShipperName: "New Vendor",
                Status: "A"
            });

            // Update model
            this.oInvoiceModel.setProperty("/Invoices", aData);

            MessageToast.show("Item Added Successfully");

            this.byId("addItemDialog").close();
        },

        onCancel: function () {
            this.byId("addItemDialog").close();
        }

    });
});
