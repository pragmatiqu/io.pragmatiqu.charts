/**
 * Also tried to overwrite the loader config, but not sure how to do this…
 * https://stackoverflow.com/questions/76970400/how-to-avoid-own-d3-library-being-overwritten-when-loading-other-flp-apps
 * https://stackoverflow.com/questions/75168281/jspdf-error-autotable-is-not-a-function-in-sap-ui5/75177939#75177939
 */
/*
sap.ui.loader.config({
	async: true,
	paths: {
		"d3": "https://cdn.jsdelivr.net/npm/d3@7"
	},
	shim: {
		"d3": {
			amd: true,
			exports: "d3",
			deps: ["d3"]
		}
	}
});
*/

import EmployeeStatusChart from "io/pragmatiqu/charts/EmployeeStatusChart";
import ProjectStatusChart from "io/pragmatiqu/charts/ProjectStatusChart";

// create a new instance of the Example control and
// place it into the DOM element with the id "content"
/*
new Chart({
	text: "Test"
}).placeAt("content");
*/
/*
new ProjectStatusChart("chart", {
	ordered: 16750,
	posted: 4531.25,
	settled: 1675
}).placeAt("content");
*/
new EmployeeStatusChart("employee", {
	budgeted: 0,
	posted: 4531.25,
}).placeAt("content");
