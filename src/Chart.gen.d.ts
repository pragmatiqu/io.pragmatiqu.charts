import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./Chart" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $ChartSettings extends $ControlSettings {

        /**
         * The text to display.
         */
        text?: string | PropertyBindingInfo;
    }

    export default interface Chart {

        // property: text

        /**
         * The text to display.
         */
        getText(): string;

        /**
         * The text to display.
         */
        setText(text: string): this;
    }
}
