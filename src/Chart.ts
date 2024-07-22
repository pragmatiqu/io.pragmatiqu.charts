/*!
 * ${copyright}
 */
import Control from "sap/ui/core/Control";
import type { MetadataOptions } from "sap/ui/core/Element";
import RenderManager from "sap/ui/core/RenderManager";
import * as d3 from "d3";

/**
 * Constructor for a new <code>io.pragmatiqu.Example</code> control.
 *
 * Some class description goes here.
 * @extends Control
 *
 * @author Michael Gerzabek
 * @version ${version}
 *
 * @constructor
 * @public
 * @name io.pragmatiqu.charts.Chart
 */
export default class Chart extends Control {
	// The following three lines were generated and should remain as-is to make TypeScript aware of the constructor signatures
	constructor(id?: string | $ChartSettings);
	constructor(id?: string, settings?: $ChartSettings);
	constructor(id?: string, settings?: $ChartSettings) {
		super(id, settings);
	}

	static readonly metadata: MetadataOptions = {
		library: "io.pragmatiqu.charts",
		properties: {
			/**
			 * The text to display.
			 */
			text: {
				type: "string",
				group: "Data",
				defaultValue: null
			}
		}
	};

	static renderer = {
		apiVersion: 2,
		render: function (rm: RenderManager, control: Chart): void {
			rm.openStart("svg", control);
			rm.attr("id", control.getId());
			rm.attr("width", 100);
			rm.attr("height", 100);
			rm.openEnd();
			rm.close("svg");
		}
	};

	public onAfterRendering(e: jQuery.Event): void {
		const svg = d3.select("#" + this.getId());
		// Define points for the triangle
		const points = [
			{x: 50, y: 10},
			{x: 90, y: 80},
			{x: 10, y: 80}
		];

		// Draw the triangle
		svg.append("polygon")
			.attr("points", points.map(d => `${d.x},${d.y}`).join(" "))
			.attr("fill", "blue");

		// Add text below the triangle
		svg.append("text")
			.attr("x", 50)
			.attr("y", 95)
			.attr("text-anchor", "middle")
			.text("200 EUR");
	}
}
