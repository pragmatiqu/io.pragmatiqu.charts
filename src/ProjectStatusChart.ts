/*!
 * ${copyright}
 */
import Control from "sap/ui/core/Control";
import type { MetadataOptions } from "sap/ui/core/Element";
import RenderManager from "sap/ui/core/RenderManager";
import * as d3 from "d3";
import Log from "sap/base/Log";

/**
 * Constructor for a new <code>io.pragmatiqu.charts.ProjectStatusChart</code> control.
 *
 * Some class description goes here.
 * @extends Control
 *
 * @author Michael Gerzabek
 * @version ${version}
 *
 * @constructor
 * @public
 * @name io.pragmatiqu.charts.ProjectStatusChart
 */
export default class ProjectStatusChart extends Control {
	// The following three lines were generated and should remain as-is to make TypeScript aware of the constructor signatures
	constructor(id?: string | $ProjectStatusChartSettings);
	constructor(id?: string, settings?: $ProjectStatusChartSettings);
	constructor(id?: string, settings?: $ProjectStatusChartSettings) {
		super(id, settings);
	}

	static readonly metadata: MetadataOptions = {
		library: "io.pragmatiqu.charts",
		properties: {
			/**
			 * The ordered value to display.
			 */
			ordered: {
				type: "float",
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
			 * The settled value to display.
			 */
			settled: {
				type: "float",
				group: "Data",
				defaultValue: 0
			}
		}
	};

	static renderer = {
		apiVersion: 2,
		render: function (rm: RenderManager, control: ProjectStatusChart): void {
			rm.openStart("svg", control);
			rm.attr("id", control.getId());
			rm.openEnd();
			rm.close("svg");
		}
	};

	private currency(n: float): string {
		return new Intl.NumberFormat('de-DE', {
			style: 'currency',
			currency: 'EUR',
			currencyDisplay: 'code'
		}).format(n);
	}

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

		const orderedValue = this.getOrdered();
		const postedValue = this.getPosted();
		const settledValue = this.getSettled();

		const orderedValueText = this.currency(orderedValue);
		const postedValueText = this.currency(postedValue);
		const settledValueText = this.currency(settledValue);

		const threshold = 80;
		const estimated = 90;
		const ordered = 100;

		if (0 === orderedValue) {
			Log.error("Cannot create chart when ordered value is zero! Aborting…");
			return;
		}

		const settled = (settledValue*100)/orderedValue;
		const posted = (postedValue*100)/orderedValue;

		let color = 'yellow';
		if (80 > posted) {
			color = 'green';
		}
		if (90 < posted) {
			color = 'red';
		}
		const backgroundColor = colors[color as keyof displayColors].background;
		const foregroundColor = colors[color as keyof displayColors].foreground;

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
			.attr("width", xScale(estimated))
			.attr("height", height)
			.attr("fill", backgroundColor); // grün # bee8b7 gelb #f7f1c3 rot #f7ccc3

		// estimatedValue ergänzt um Sicherheitsaufschlag = Auftragssumme
		g.append("rect")
			.attr("x", xScale(estimated))
			.attr("width", xScale(100 - estimated) - 1)
			.attr("height", height)
			.attr("fill", "#eef");

		// postedValue
		g.append("rect")
			.attr("x", 1)
			.attr("y", 4)
			.attr("width", xScale(Math.min(posted, 140)))
			.attr("height", height - 8)
			.attr("fill", foregroundColor);
		// grün solange postedValue <= alertingThreshold
		// gelb solange alertingThreshold < postedValue <= orderedValue
		// rot sobald postedValue > orderedValue

		// Target value (comparative marker)
		g.append("line")
			.attr("x1", xScale(threshold))
			.attr("x2", xScale(threshold))
			.attr("y1", -8)
			.attr("y2", height + 8)
			.attr("stroke", "#fc0303")
			.attr("stroke-width", 3);

		if (0 < settled) { // abgerechnetes Budget -------------------
			g.append("rect")
				.attr("x", 0)
				.attr("width", xScale(settled))
				.attr("height", height)
				.attr("fill", "#3236a8");

			let settleX = xScale(settled) / 2;
			let settleA = "middle";
			if (50 > settled) {
				settleX = 3;
				settleA = "start";
			}
			g.append("text")
				.attr("x", settleX) // Center the text in the rectangle
				.attr("y", (height / 2) + 1) // Vertically center
				.attr("text-anchor", settleA) // Ensure the text is centered
				.attr("dominant-baseline", "middle") // Center text vertically
				.text(settledValueText)
				.style("fill", "white")
				.style("font-weight", "600")
				.style("font-size", "10px")
				.style("font-family", "Arial");
		} // ende abgerechnetes Budget -------------------

		// Labels
		g.append("text")
			.attr("x", xScale(Math.min(posted, 140)))
			.attr("y", height + margin.bottom / 2 + 2)
			.attr("text-anchor", posted > 25 ? "end" : "start")
			.text(postedValueText)
			.style("font-size", "10px") // Set font size
			.style("font-weight", "600")
			.style("font-family", "Arial"); // Set font family

		g.append("text")
			.attr("x", xScale(ordered))
			.attr("y", 0 - margin.top / 2 + 4)
			.attr("text-anchor", "end")
			.text(orderedValueText)
			.style("font-size", "10px") // Set font size
			.style("font-weight", "400")
			.style("font-family", "Arial");
	}
}
