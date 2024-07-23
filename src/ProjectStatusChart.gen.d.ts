import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./ProjectStatusChart" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $ProjectStatusChartSettings extends $ControlSettings {

        /**
         * The ordered value to display.
         */
        ordered?: number | PropertyBindingInfo | `{${string}}`;

        /**
         * The posted value to display.
         */
        posted?: number | PropertyBindingInfo | `{${string}}`;

        /**
         * The settled value to display.
         */
        settled?: number | PropertyBindingInfo | `{${string}}`;
    }

    export default interface ProjectStatusChart {

        // property: ordered

        /**
         * The ordered value to display.
         */
        getOrdered(): number;

        /**
         * The ordered value to display.
         */
        setOrdered(ordered: number): this;

        // property: posted

        /**
         * The posted value to display.
         */
        getPosted(): number;

        /**
         * The posted value to display.
         */
        setPosted(posted: number): this;

        // property: settled

        /**
         * The settled value to display.
         */
        getSettled(): number;

        /**
         * The settled value to display.
         */
        setSettled(settled: number): this;
    }
}
