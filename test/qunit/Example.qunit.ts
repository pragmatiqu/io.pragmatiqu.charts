/* eslint-disable @typescript-eslint/no-misused-promises */
import EmployeeStatusChart from "io/pragmatiqu/charts/EmployeeStatusChart";

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
	const oExample = new EmployeeStatusChart({
		text: "Example"
	});
	assert.equal(oExample.getText(), "Example", "Check text equals 'Example'");
});
