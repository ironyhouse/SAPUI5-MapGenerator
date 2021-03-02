sap.ui.define(
    [
        "sap/ui/core/Control",
        "sap/m/Label",
        "sap/m/Input",
        "sap/m/Button",
        "sap/m/Select",
        "sap/ui/core/Item"
    ],
    function (Control, Label, Input, Button, Select, Item) {
        "use strict";
        return Control.extend("mapgenerator.control.google.GoogleMap", {
            metadata: {
                properties: {
                    value: { type: "float", defaultValue: 0 },
                },
                aggregations: {
                    _labelLatitude: {
                        type: "sap.m.Label",
                        multiple: false,
                        visibility: "hidden",
                    },
                    _labelLongitude: {
                        type: "sap.m.Label",
                        multiple: false,
                        visibility: "hidden",
                    },
                    _labelAddressFrom: {
                        type: "sap.m.Label",
                        multiple: false,
                        visibility: "hidden",
                    },
                    _labelAddressTo: {
                        type: "sap.m.Label",
                        multiple: false,
                        visibility: "hidden",
                    },
                    _labelTravelMode: {
                        type: "sap.m.Label",
                        multiple: false,
                        visibility: "hidden",
                    },
                    _inputLatitude: {
                        type: "sap.m.Input",
                        multiple: false,
                        visibility: "hidden",
                    },
                    _inputLongitude: {
                        type: "sap.m.Input",
                        multiple: false,
                        visibility: "hidden",
                    },
                    _inputAddressFrom: {
                        type: "sap.m.Input",
                        multiple: false,
                        visibility: "hidden",
                    },
                    _inputAddressTo: {
                        type: "sap.m.Input",
                        multiple: false,
                        visibility: "hidden",
                    },
                    _selectTravelMode: {
                        type: "sap.m.Select",
                        multiple: false,
                        visibility: "hidden",
                    },
                    _buttonNavToCoordinate: {
                        type: "sap.m.Button",
                        multiple: false,
                        visibility: "hidden",
                    },
                    _buttonCreateRoute: {
                        type: "sap.m.Button",
                        multiple: false,
                        visibility: "hidden",
                    },
                },
            },

            init: function () {
                // Google Map
                this.myMap;

                // Latitude
                this.setAggregation(
                    "_labelLatitude",
                    new Label({
                        text: "Latitude (° N)",
                    })
                );
                this.setAggregation(
                    "_inputLatitude",
                    new Input({
                        id: "Latitude",
                        placeholder: "XX.XX",
                    }).addStyleClass("sapUiSmallMarginButton")
                );

                // Longitude
                this.setAggregation(
                    "_labelLongitude",
                    new Label({
                        text: "Longitude (° E)",
                    })
                );
                this.setAggregation(
                    "_inputLongitude",
                    new Input({
                        id: "Longitude",
                        placeholder: "XX.XX",
                    }).addStyleClass("sapUiSmallMarginButton")
                );

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
                        id: "AddressFrom",
                        placeholder: "XX.XX",
                    }).addStyleClass("sapUiSmallMarginButton")
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
                        id: "AddressTo",
                        placeholder: "XX.XX",
                    }).addStyleClass("sapUiSmallMarginButton")
                );

                // Travel Mode
                this.setAggregation(
                    "_labelTravelMode",
                    new Label({
                        text: "Travel Mode",
                    })
                );

                var oWalking = new Item ({ key: "WALKING", text: "WALKING" });
                var oDriving = new Item ({ key: "DRIVING", text: "DRIVING" });

                this.setAggregation(
                    // WALKING DRIVING
                    "_selectTravelMode",
                    new Select({
                        id: "TravelMode",
                        width: "100%",
                    }).addStyleClass("sapUiSmallMarginButton").addItem(oWalking).addItem(oDriving)
                );

                // button
                this.setAggregation(
                    "_buttonNavToCoordinate",
                    new Button({
                        text: "Navigate",
                        press: this.navToCoordinate.bind(this),
                    })
                );

                // button
                this.setAggregation(
                    "_buttonCreateRoute",
                    new Button({
                        text: "Create Route",
                        press: this.createRoute.bind(this),
                    })
                );
            },

            navToCoordinate: function () {
                var nLatitude = +sap.ui.getCore().byId("Latitude").getValue();
                var nLongitude = +sap.ui.getCore().byId("Longitude").getValue();

                this.myMap.setZoom(10);
                this.myMap.setCenter({ lat: nLatitude, lng: nLongitude });
            },

            createRoute: function () {
                var aMarkers = this.getModel("GoogleMap").getProperty(
                    "/GoogleMap/aMarkers"
                );
                var nAddressFrom = sap.ui
                    .getCore()
                    .byId("AddressFrom")
                    .getValue();
                var nAddressTo = sap.ui.getCore().byId("AddressTo").getValue();
                var sTravelMode = sap.ui.getCore().byId("TravelMode").getSelectedKey();

                console.log(sTravelMode)

                // Create a renderer for directions and bind it to the map.
                const directionsRenderer = new google.maps.DirectionsRenderer(
                    {}
                );
                // Instantiate a directions service.
                const directionsService = new google.maps.DirectionsService();

                // First, remove any existing markers from the map.
                for (let i = 0; i < aMarkers.length; i++) {
                    aMarkers[i].setMap(null);
                }

                // create route
                directionsService.route(
                    {
                        origin: nAddressFrom,
                        destination: nAddressTo,
                        travelMode: google.maps.TravelMode[sTravelMode],
                    },
                    (response, status) => {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsRenderer.setDirections(response);
                        } else {
                            window.alert(
                                "Directions request failed due to " + status
                            );
                        }
                    }
                );

                // set changes
                directionsRenderer.setMap(this.myMap);
            },

            // render map
            onAfterRendering: function () {
                // create map
                this.myMap = new google.maps.Map(
                    document.getElementById("mapG"),
                    {
                        center: { lat: 53.9, lng: 27.56 },
                        zoom: 12,
                    }
                );
            },

            renderer: function (oGoogleMap, oControl) {
                //nav to coordinate
                oGoogleMap.openStart("div");
                oGoogleMap.style("max-width", "300px");
                oGoogleMap.style("margin", "1em");
                oGoogleMap.openEnd();
                // from
                oGoogleMap.renderControl(
                    oControl.getAggregation("_labelLatitude")
                );
                oGoogleMap.renderControl(
                    oControl.getAggregation("_inputLatitude")
                );
                // to
                oGoogleMap.renderControl(
                    oControl.getAggregation("_labelLongitude")
                );
                oGoogleMap.renderControl(
                    oControl.getAggregation("_inputLongitude")
                );
                // button
                oGoogleMap.renderControl(
                    oControl.getAggregation("_buttonNavToCoordinate")
                );
                oGoogleMap.close("div");

                // createRoute
                oGoogleMap.openStart("div");
                oGoogleMap.style("max-width", "300px");
                oGoogleMap.style("margin", "1em");
                oGoogleMap.openEnd();
                // from
                oGoogleMap.renderControl(
                    oControl.getAggregation("_labelAddressFrom")
                );
                oGoogleMap.renderControl(
                    oControl.getAggregation("_inputAddressFrom")
                );
                // to
                oGoogleMap.renderControl(
                    oControl.getAggregation("_labelAddressTo")
                );
                oGoogleMap.renderControl(
                    oControl.getAggregation("_inputAddressTo")
                );
                // travel mode
                oGoogleMap.renderControl(
                    oControl.getAggregation("_labelTravelMode")
                );
                oGoogleMap.renderControl(
                    oControl.getAggregation("_selectTravelMode")
                );
                // button
                oGoogleMap.renderControl(
                    oControl.getAggregation("_buttonCreateRoute")
                );
                oGoogleMap.close("div");

                //map
                oGoogleMap.openStart("div", "mapG");
                oGoogleMap.class("map-yandex");
                oGoogleMap.style("height", "50vh");
                oGoogleMap.style("margin", "0 auto");
                oGoogleMap.openEnd();
                oGoogleMap.close("div");
            },
        });
    }
);
