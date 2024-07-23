/*!
 * ${copyright}
 */
import Control from "sap/ui/core/Control";
import type { MetadataOptions } from "sap/ui/core/Element";
import RenderManager from "sap/ui/core/RenderManager";
import * as d3 from "d3";

/**
 * Constructor for a new <code>io.pragmatiqu.charts.EmployeeStatusChart</code> control.
 *
 * Some class description goes here.
 * @extends Control
 *
 * @author Michael Gerzabek
 * @version ${version}
 *
 * @constructor
 * @public
 * @name io.pragmatiqu.charts.EmployeeStatusChart
 */
export default class EmployeeStatusChart extends Control {
	// The following three lines were generated and should remain as-is to make TypeScript aware of the constructor signatures
	constructor(id?: string | $EmployeeStatusChartSettings);
	constructor(id?: string, settings?: $EmployeeStatusChartSettings);
	constructor(id?: string, settings?: $EmployeeStatusChartSettings) {
		super(id, settings);
	}

	static readonly metadata: MetadataOptions = {
		library: "io.pragmatiqu.charts",
		properties: {
			/**
			 * The mnemonic of the employee.
			 */
			abbr: {
				type: "string",
				group: "Data",
				defaultValue: null
			},
			/**
			 * The text to display.
			 */
			budgeted: {
				type: "float",
				group: "Data",
				defaultValue: null
			},
			/**
			 * The text to display.
			 */
			posted: {
				type: "float",
				group: "Data",
				defaultValue: null
			}
		}
	};

	static renderer = {
		apiVersion: 2,
		render: function (rm: RenderManager, control: EmployeeStatusChart): void {
			rm.openStart("svg", control);
			rm.attr("id", control.getId());
			rm.openEnd();
			rm.close("svg");
		}
	};

	public onAfterRendering(e: jQuery.Event): void {
		const thresholds = [0, 25, 50, 75, 100]; // thresholds fix
		const colors = {
			green: "#157804",
			yellow: "#f2d707",
			red: "#ed2f07"
		};
		const backgrounds = {
			green: "#bee8b7",
			yellow: "#f7f1c3",
			red: "#f7ccc3"
		}

		const sizeX = 400;
		const sizeY = 20;

		const barHeight = 12;

		// Dimensions
		const margin = { top: 0, right: 0, bottom: 0, left: 0 },
			width = sizeX - margin.left - margin.right,
			height = sizeY - margin.top - margin.bottom;

		// Create the SVG container.
		const svg = d3.select("#" + this.getId());
		svg.attr("viewBox", `0 0 ${sizeX} ${sizeY}`)
			.attr("preserveAspectRatio", "xMidYMid meet");
		if (0 === this.getBudgeted()) {
			svg.append("text")
				.attr("x", 2)
				.attr("y", 17)
				.attr("text-anchor", "start")
				.text("Für diesen Mitarbeiter wurde kein Budget eröffnet")
				.style("font-size", "10px") // Set font size
				.style("font-weight", "400")
				.style("font-family", "Arial"); // Set font family
			return;
		}

		// Scales, immer 0-150, weil wir prozentuell anzeigen und Budgets
		// überschritten werden können
		const xScale = d3.scaleLinear([0, 100], [0, width]);

		// Calculate the position of hours worked on the timeline for each worker
		const hoursToTime = d3.scaleLinear()
			.domain([0, this.getBudgeted()])
			.range([0, width]);

		const percent = (this.getPosted() * 100) / this.getBudgeted();
		let color = colors.green;
		let background = backgrounds.green;
		if ( percent < 25) {
			color = colors.red;
			background = backgrounds.red;
		}
		if (percent > 80) {
			color = colors.yellow;
			background = backgrounds.yellow;
		}

		// Add the bar showing hours worked
		svg.append("rect")
			.attr("x", 0)
			.attr("y", 0)
			.attr("width", hoursToTime(this.getBudgeted()))
			.attr("height", height)
			.attr("fill", background);

		// Add the bar showing hours worked
		svg.append("rect")
			.attr("x", 0)
			.attr("y", 4)
			.attr("width", hoursToTime(this.getPosted()))
			.attr("height", barHeight)
			.attr("fill", color);

		// Thresholds (qualitative ranges)
		thresholds.forEach((threshold, i) => {
			svg.append("line")
				.attr("x1", xScale(thresholds[i]))
				.attr("x2", xScale(thresholds[i]))
				.attr("y1", 0)
				.attr("y2", 19)
				.attr("stroke", "black")
				.attr("stroke-width", .5)/*
				.attr("stroke-dasharray", [1,1])*/;
		});
	}
}
