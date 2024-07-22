/* eslint-disable @typescript-eslint/no-misused-promises */
import Chart from "io/pragmatiqu/charts/Chart";

// prepare DOM
const elem = document.createElement("div");
elem.id = "uiArea1";
document.body.appendChild(elem);

// module for basic checks
QUnit.module("Example Tests");

// example sync test
QUnit.test("Sync", function (assert) {
	assert.expect(1);
	assert.ok(true, "ok");
});

// example async test
QUnit.test("Async", function (assert) {
	assert.expect(1);
	return new Promise(function (resolve /*, reject */) {
		assert.ok(true, "ok");
		resolve(true);
	});
});

// module for basic checks
QUnit.module("Basic Control Checks");

// some basic control checks
QUnit.test("Test get properties", function (assert) {
	assert.expect(2);
	const oExample = new Chart({
		text: "Example"
	});
	assert.equal(oExample.getText(), "Example", "Check text equals 'Example'");
});

// some basic eventing check
QUnit.test("Test click event", function (assert) {
	assert.expect(1);
	const oExample = new Chart("example", {
		text: "Example"
	}).placeAt("uiArea1");
});
