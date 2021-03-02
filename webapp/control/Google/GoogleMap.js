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
                    _buttonNavToCoordinate: {
                        type: "sap.m.Button",
                        multiple: false,
                        visibility: "hidden",
                    },
                    _buttonCreateRoute: {
                        type: "sap.m.Button",
                        multiple: false,
                        visibility: "hidden",
                    }
                }
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
                        id: "From",
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
                var latitude = +sap.ui.getCore().byId("Latitude").getValue();
                var longitude = +sap.ui.getCore().byId("Longitude").getValue();

                this.myMap.setZoom(10);
                this.myMap.setCenter({ lat: latitude, lng: longitude });
            },

            createRoute: function () {
                var aMarkers = this.getModel("GoogleMap").getProperty(
                    "/GoogleMap/aMarkers"
                );
                // Create a renderer for directions and bind it to the map.
                const directionsRenderer = new google.maps.DirectionsRenderer({});
                // Instantiate a directions service.
                const directionsService = new google.maps.DirectionsService();

                // First, remove any existing markers from the map.
                for (let i = 0; i < aMarkers.length; i++) {
                    aMarkers[i].setMap(null);
                }

                directionsRenderer.setMap(this.myMap);

                directionsService.route(
                    {
                        origin: "st louis, mo",
                        destination: "gallup, nm",
                        travelMode: google.maps.TravelMode.DRIVING,  // WALKING
                    },
                    (response, status) => {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsRenderer.setDirections(response);
                            // showSteps(result, aMarkers, stepDisplay, this.myMap);
                        } else {
                            window.alert(
                                "Directions request failed due to " + status
                            );
                        }
                    }
                );
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

                // // create marker
                // this.myMap.addListener("click", (mapsMouseEvent) => {
                //     let marker = new google.maps.Marker({
                //         position: mapsMouseEvent.latLng,
                //         map: this.myMap,
                //         title: "Click to zoom",
                //     });

                //     // show marker coordinate
                //     marker.addListener("click", () => {
                //         let infoWindow = new google.maps.InfoWindow({
                //             position: mapsMouseEvent.latLng,
                //         });
                //         infoWindow.setContent(
                //             JSON.stringify(
                //                 mapsMouseEvent.latLng.toJSON(),
                //                 null,
                //                 2
                //             )
                //         );
                //         infoWindow.open(this.myMap);
                //     });
                // });

                // this.myMap.addListener("center_changed", () => {
                //   // 3 seconds after the center of the map has changed, pan back to the
                //   // marker.
                //   window.setTimeout(() => {
                //     this.myMap.panTo(marker.getPosition());
                //   }, 3000);
                // });
            },

            renderer: function (oYandexMap, oControl) {
                //nav to coordinate
                oYandexMap.openStart("div");
                    oYandexMap.style("max-width", "300px");
                    oYandexMap.style("margin", "1em");
                    oYandexMap.openEnd();
                    // from
                    oYandexMap.renderControl(
                        oControl.getAggregation("_labelLatitude")
                    );
                    oYandexMap.renderControl(
                        oControl.getAggregation("_inputLatitude")
                    );
                    // to
                    oYandexMap.renderControl(
                        oControl.getAggregation("_labelLongitude")
                    );
                    oYandexMap.renderControl(
                        oControl.getAggregation("_inputLongitude")
                    );
                    // button
                    oYandexMap.renderControl(oControl.getAggregation("_buttonNavToCoordinate"));
                oYandexMap.close("div");


                // createRoute
                oYandexMap.openStart("div");
                    oYandexMap.style("max-width", "300px");
                    oYandexMap.style("margin", "1em");
                    oYandexMap.openEnd();
                    // from
                    oYandexMap.renderControl(
                        oControl.getAggregation("_labelAddressFrom")
                    );
                    oYandexMap.renderControl(
                        oControl.getAggregation("_inputAddressFrom")
                    );
                    // to
                    oYandexMap.renderControl(
                        oControl.getAggregation("_labelAddressTo")
                    );
                    oYandexMap.renderControl(
                        oControl.getAggregation("_inputAddressTo")
                    );
                    // button
                    oYandexMap.renderControl(oControl.getAggregation("_buttonCreateRoute"));
                oYandexMap.close("div");


                //map
                oYandexMap.openStart("div", "mapG");
                oYandexMap.class("map-yandex");
                oYandexMap.style("height", "50vh");
                oYandexMap.style("margin", "0 auto");
                oYandexMap.openEnd();
                oYandexMap.close("div");
            },
        });
    }
);
