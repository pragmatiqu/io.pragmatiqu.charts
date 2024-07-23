/*!
 * ${copyright}
 */

import Lib from "sap/ui/core/Lib";

import * as coreLib from "sap/ui/core/library"
coreLib; // prevent removal of unused import which is needed to load the core lib asynchronously

/**
 * Initialization Code and shared classes of library io.pragmatiqu.
 */

// delegate further initialization of this library to the Core
const thisLib: { [key: string]: unknown } = Lib.init({
	name: "io.pragmatiqu.charts",
	version: "${version}",
	dependencies: [
		// keep in sync with the ui5.yaml and .library files
		"sap.ui.core"
	],
	types: [],
	interfaces: [],
	controls: [
		"io.pragmatiqu.charts.Chart",
		"io.pragmatiqu.charts.ProjectStatusChart",
	],
	elements: [],
	noLibraryCSS: true // if no CSS is provided, you can disable the library.css load here
}) as { [key: string]: unknown };

// export the library namespace
export default thisLib;
