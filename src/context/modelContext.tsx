import React from "react";
import { WidgetModel } from "@jupyter-widgets/base";
import { WidgetModelContext } from '../hooks/widgetModel';


/**
 * Default interface for widget props
 */
export interface WidgetProps {
    model: WidgetModel
}

/**
 * Creates a model context for each specific widget.
 * @param Component that will be rendered (widget view)
 * @returns An component using the specific context.
 */
const withModelContext = (Component: (props: WidgetProps) => JSX.Element) => {
    return (props: WidgetProps) => (
        <WidgetModelContext.Provider value={props.model}>
            <Component {...props} />
        </WidgetModelContext.Provider>
    );
}

export default withModelContext;
