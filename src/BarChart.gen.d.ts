import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./BarChart" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $BarChartSettings extends $ControlSettings {

        /**
         * The ordered value to display.
         */
        orderedTxt?: string | PropertyBindingInfo;

        /**
         * The posted value to display.
         */
        posted?: number | PropertyBindingInfo | `{${string}}`;

        /**
         * The postedTxT value to display.
         */
        postedTxt?: string | PropertyBindingInfo;

        /**
         * The settled value to display.
         */
        settled?: number | PropertyBindingInfo | `{${string}}`;

        /**
         * The settledTxt value to display.
         */
        settledTxt?: string | PropertyBindingInfo;

        /**
         * The color value to display.
         */
        color?: string | PropertyBindingInfo;
    }

    export default interface BarChart {

        // property: orderedTxt

        /**
         * The ordered value to display.
         */
        getOrderedTxt(): string;

        /**
         * The ordered value to display.
         */
        setOrderedTxt(orderedTxt: string): this;

        // property: posted

        /**
         * The posted value to display.
         */
        getPosted(): number;

        /**
         * The posted value to display.
         */
        setPosted(posted: number): this;

        // property: postedTxt

        /**
         * The postedTxT value to display.
         */
        getPostedTxt(): string;

        /**
         * The postedTxT value to display.
         */
        setPostedTxt(postedTxt: string): this;

        // property: settled

        /**
         * The settled value to display.
         */
        getSettled(): number;

        /**
         * The settled value to display.
         */
        setSettled(settled: number): this;

        // property: settledTxt

        /**
         * The settledTxt value to display.
         */
        getSettledTxt(): string;

        /**
         * The settledTxt value to display.
         */
        setSettledTxt(settledTxt: string): this;

        // property: color

        /**
         * The color value to display.
         */
        getColor(): string;

        /**
         * The color value to display.
         */
        setColor(color: string): this;
    }
}
