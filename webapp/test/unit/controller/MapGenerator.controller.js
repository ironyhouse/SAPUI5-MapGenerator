/*global QUnit*/

sap.ui.define([
	"map-generator/controller/MapGenerator.controller"
], function (Controller) {
	"use strict";

	QUnit.module("MapGenerator Controller");

	QUnit.test("I should test the MapGenerator controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
