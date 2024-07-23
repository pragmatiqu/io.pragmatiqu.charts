import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./EmployeeStatusChart" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $EmployeeStatusChartSettings extends $ControlSettings {

        /**
         * The mnemonic of the employee.
         */
        abbr?: string | PropertyBindingInfo;

        /**
         * The text to display.
         */
        budgeted?: number | PropertyBindingInfo | `{${string}}`;

        /**
         * The text to display.
         */
        posted?: number | PropertyBindingInfo | `{${string}}`;
    }

    export default interface EmployeeStatusChart {

        // property: abbr

        /**
         * The mnemonic of the employee.
         */
        getAbbr(): string;

        /**
         * The mnemonic of the employee.
         */
        setAbbr(abbr: string): this;

        // property: budgeted

        /**
         * The text to display.
         */
        getBudgeted(): number;

        /**
         * The text to display.
         */
        setBudgeted(budgeted: number): this;

        // property: posted

        /**
         * The text to display.
         */
        getPosted(): number;

        /**
         * The text to display.
         */
        setPosted(posted: number): this;
    }
}
