sap.ui.define(
  ["sap/ui/core/Control", "sap/m/Label", "sap/m/Input", "sap/m/Button"],
  function (Control, Label, Input, Button) {
    "use strict";
    return Control.extend("mapgenerator.control.google.GoogleMap", {
      metadata: {
        properties: {
          value: { type: "float", defaultValue: 0 },
        },
        aggregations: {
          _labelAddressFrom: {
            type: "sap.m.Label",
            multiple: false,
            visibility: "hidden",
          },
          _inputAddressFrom: {
            type: "sap.m.Input",
            multiple: false,
            visibility: "hidden",
          },
          _labelAddressTo: {
            type: "sap.m.Label",
            multiple: false,
            visibility: "hidden",
          },
          _inputAddressTo: {
            type: "sap.m.Input",
            multiple: false,
            visibility: "hidden",
          },
          _button: {
            type: "sap.m.Button",
            multiple: false,
            visibility: "hidden",
          },
        },
        // events : {
        // 	change : {
        // 		parameters : {
        // 			value : {type : "int"}
        // 		}
        // 	}
        // }
      },

      init: function () {
        // Google Map
        this.myMap;

        // from
        this.setAggregation(
          "_labelAddressFrom",
          new Label({
            text: "From",
          })
        );
        this.setAggregation(
          "_inputAddressFrom",
          new Input({
            placeholder: "From",
          })
        );

        // to
        this.setAggregation(
          "_labelAddressTo",
          new Label({
            text: "To",
          })
        );
        this.setAggregation(
          "_inputAddressTo",
          new Input({
            placeholder: "To",
          }).addStyleClass("sapUiSmallMarginButton")
        );

        // button
        this.setAggregation(
          "_button",
          new Button({
            text: "Show Google Map",
            press: this.onOpenQuestionDialog.bind(this),
          })
        );
      },

      onOpenQuestionDialog: function () {
        this.myMap.setZoom(10);
        this.myMap.setCenter({ lat: 55.75, lng: 37.62 });
      },

      // render map
      onAfterRendering: function () {
        // create map
        this.myMap = new google.maps.Map(document.getElementById("mapG"), {
          center: { lat: 53.9, lng: 27.56 },
          zoom: 12,
        });
      },

      renderer: function (oYandexMap, oControl) {
        // from
        oYandexMap.renderControl(oControl.getAggregation("_labelAddressFrom"));
        oYandexMap.renderControl(oControl.getAggregation("_inputAddressFrom"));
        // to
        oYandexMap.renderControl(oControl.getAggregation("_labelAddressTo"));
        oYandexMap.renderControl(oControl.getAggregation("_inputAddressTo"));
        // button
        oYandexMap.renderControl(oControl.getAggregation("_button"));

        //map
        oYandexMap.openStart("div", "mapG");
        oYandexMap.class("map-yandex");
        oYandexMap.style("width", "90vw");
        oYandexMap.style("height", "50vh");
        oYandexMap.style("margin", "0 auto");
        oYandexMap.openEnd();
        oYandexMap.close("div");
      },
    });
  }
);
