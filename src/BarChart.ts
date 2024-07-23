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
 * @name io.pragmatiqu.charts.BarChart
 */
export default class BarChart extends Control {
	// The following three lines were generated and should remain as-is to make TypeScript aware of the constructor signatures
	constructor(id?: string | $BarChartSettings);
	constructor(id?: string, settings?: $BarChartSettings);
	constructor(id?: string, settings?: $BarChartSettings) {
		super(id, settings);
	}

	static readonly metadata: MetadataOptions = {
		library: "io.pragmatiqu.charts",
		properties: {
			/**
			 * The ordered value to display.
			 */
			orderedTxt: {
				type: "string",
				group: "Data",
				defaultValue: "NaN"
			},
			/**
			 * The posted value to display.
			 */
			posted: {
				type: "float",
				group: "Data",
				defaultValue: 0
			},
			/**
			 * The postedTxT value to display.
			 */
			postedTxt: {
				type: "string",
				group: "Data",
				defaultValue: "NaN"
			},
			/**
			 * The settled value to display.
			 */
			settled: {
				type: "float",
				group: "Data",
				defaultValue: 0
			},
			/**
			 * The settledTxt value to display.
			 */
			settledTxt: {
				type: "string",
				group: "Data",
				defaultValue: "NaN"
			},
			/**
			 * The color value to display.
			 */
			color: {
				type: "string",
				group: "Data",
				defaultValue: "green"
			}
		}
	};

	static renderer = {
		apiVersion: 2,
		render: function (rm: RenderManager, control: BarChart): void {
			rm.openStart("svg", control);
			rm.attr("id", control.getId());
			rm.openEnd();
			rm.close("svg");
		}
	};

	public onAfterRendering(e: jQuery.Event): void {
		const thresholds = [0, 25, 50, 75, 100]; // thresholds fix
		interface displayColor {
			foreground: string,
			background: string
		}
		interface displayColors {
			green: displayColor,
			yellow: displayColor,
			red: displayColor,
		}
		const colors: displayColors = {
			green: {
				foreground: "#157804",
				background: "#bee8b7"
			},
			yellow: {
				foreground: "#f2d707",
				background: "#f7f1c3"
			},
			red: {
				foreground: "#ed2f07",
				background: "#f7ccc3"
			}
		};
		const sizeX = 800;
		const sizeY = 60;
		const alertingThreshold = 80;
		const estimatedValue = 90;
		const orderedValue = 100;

		const orderedValueText = this.getOrderedTxt();
		const postedValue = this.getPosted();
		const postedValueText = this.getPostedTxt();
		const settledValue = this.getSettled();
		const settledValueText = this.getSettledTxt();

		const backgroundColor = colors[this.getColor() as keyof displayColors].background;
		const foregroundColor = colors[this.getColor() as keyof displayColors].foreground;

		const margin = {top: 20, right: 10, bottom: 20, left: 10};
		const width = sizeX - margin.left - margin.right;
		const height = sizeY - margin.top - margin.bottom;

		// Create the SVG container.
		const svg = d3.select("#" + this.getId());
		svg.attr("viewBox", `0 0 ${sizeX} ${sizeY}`)
			.attr("preserveAspectRatio", "xMidYMid meet");

		const g = svg.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		// Scales… immer 0-150 weil wir prozentuell anzeigen
		const xScale = d3.scaleLinear([0, 150], [0, width]);

		// Thresholds (qualitative ranges)
		thresholds.forEach((threshold, i) => {
			g.append("line")
				.attr("x1", xScale(thresholds[i]))
				.attr("x2", xScale(thresholds[i]))
				.attr("y1", 0 === i % 4 ? -4 : -3)
				.attr("y2", 0 === i % 4 ? height + 4 : height + 3)
				.attr("stroke", "black")
				.attr("stroke-width", 0 === i % 4 ? 2 : 1);
		});

		// estimatedValue
		g.append("rect")
			.attr("x", 1)
			.attr("width", xScale(estimatedValue))
			.attr("height", height)
			.attr("fill", backgroundColor); // grün # bee8b7 gelb #f7f1c3 rot #f7ccc3

		// estimatedValue ergänzt um Sicherheitsaufschlag = Auftragssumme
		g.append("rect")
			.attr("x", xScale(estimatedValue))
			.attr("width", xScale(100 - estimatedValue) - 1)
			.attr("height", height)
			.attr("fill", "#eef");

		// postedValue
		g.append("rect")
			.attr("x", 1)
			.attr("y", 4)
			.attr("width", xScale(Math.min(postedValue, 140)))
			.attr("height", height - 8)
			.attr("fill", foregroundColor);
		// grün solange postedValue <= alertingThreshold
		// gelb solange alertingThreshold < postedValue <= orderedValue
		// rot sobald postedValue > orderedValue

		// Target value (comparative marker)
		g.append("line")
			.attr("x1", xScale(alertingThreshold))
			.attr("x2", xScale(alertingThreshold))
			.attr("y1", -8)
			.attr("y2", height + 8)
			.attr("stroke", "#fc0303")
			.attr("stroke-width", 3);

		if (0 < settledValue) { // abgerechnetes Budget -------------------
			g.append("rect")
				.attr("x", 0)
				.attr("width", xScale(settledValue))
				.attr("height", height)
				.attr("fill", "#3236a8");

			g.append("text")
				.attr("x", xScale(settledValue) / 2) // Center the text in the rectangle
				.attr("y", (height / 2) + 2) // Vertically center
				.attr("text-anchor", "middle") // Ensure the text is centered
				.attr("dominant-baseline", "middle") // Center text vertically
				.text(`${settledValueText} EUR`)
				.style("fill", "white")
				.style("font-weight", "600")
				.style("font-size", "12px")
				.style("font-family", "Arial");
		} // ende abgerechnetes Budget -------------------

		// Labels
		g.append("text")
			.attr("x", xScale(Math.min(postedValue, 140)))
			.attr("y", height + margin.bottom / 2 + 2)
			.attr("text-anchor", postedValue > 25 ? "end" : "start")
			.text(`${postedValueText} EUR`)
			.style("font-size", "10px") // Set font size
			.style("font-weight", "600")
			.style("font-family", "Arial"); // Set font family

		g.append("text")
			.attr("x", xScale(orderedValue))
			.attr("y", 0 - margin.top / 2 + 4)
			.attr("text-anchor", "end")
			.text(`${orderedValueText} EUR`)
			.style("font-size", "10px") // Set font size
			.style("font-weight", "400")
			.style("font-family", "Arial");
	}
}
