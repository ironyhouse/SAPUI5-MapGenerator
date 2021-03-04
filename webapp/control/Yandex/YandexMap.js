sap.ui.define(
  [
    "sap/ui/core/Control",
    "sap/m/Label",
    "sap/m/Input",
    "sap/m/Button",
  ],
  function (Control, Label, Input, Button) {
    "use strict";
    return Control.extend("mapgenerator.control.yandex.YandexMap", {
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
      },

      init: function () {
        // from
        this.setAggregation(
          "_labelAddressFrom",
          new Label({
            text: "{i18n>botWelcome}",
          })
        );
        this.setAggregation(
          "_inputAddressFrom",
          new Input({
            text: "{i18n>botWelcome}",
          })
        );

        // to
        this.setAggregation(
          "_labelAddressTo",
          new Label({
            text: "{i18n>botWelcome}",
          })
        );
        this.setAggregation(
          "_inputAddressTo",
          new Input({
            text: "{i18n>botWelcome}",
          }).addStyleClass("sapUiSmallMarginButton")
        );

        // button
        this.setAggregation(
          "_button",
          new Button({
            text: "Show Yandex Map",
            press: this.onOpenQuestionDialog.bind(this),
          })
        );
      },

      onOpenQuestionDialog: function () {
        // this.getModel("YandexMap").setProperty("/YandexMap/aCoordinates", [
        //   53.9,
        //   27.56,
        // ]);

        // var myMap = new ymaps.Map("map", {
        //   // coordinates
        //   center: [53.9, 27.56],
        //   // zoom: from 0 to 19
        //   zoom: 10,
        // });
      },

      // render map
      onAfterRendering: function () {
        this.getModel("YandexMap").setProperty("/YandexMap/aCoordinates", [
          55.76,
          37.64,
        ]);
        var aCoordinates = this.getModel("YandexMap").getProperty(
          "/YandexMap/aCoordinates"
        );

        // create map
        var myMap = new ymaps.Map("map", {
          center: aCoordinates,
          zoom: 7,
          controls: ["routeButtonControl"],
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
        oYandexMap.openStart("div", "map");
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
