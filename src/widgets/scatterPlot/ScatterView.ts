import { DOMWidgetView } from "@jupyter-widgets/base";
import React from "react";
import ReactDOM from 'react-dom';
import ScatterWidget from "./ScatterWidget";


export default class ScatterView extends DOMWidgetView {
    render() {
        this.el.classList.add('scatter-widget');
        const component = React.createElement(ScatterWidget, {
            model: this.model,
            data: this.model.get('data'),
            x_label: this.model.get('x_label'),
            y_label: this.model.get('y_label')
        });
        ReactDOM.render(component, this.el);
    }
}
