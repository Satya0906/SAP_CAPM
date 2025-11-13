/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["app001/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
