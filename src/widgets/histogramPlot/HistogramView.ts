import { DOMWidgetView } from "@jupyter-widgets/base";
import HistogramWidget from "./HistogramWidget";
import ReactDOM from 'react-dom';
import React from "react";


export default class HistogramView extends DOMWidgetView {
    render() {
        this.el.classList.add('histogram-widget');
        const component = React.createElement(HistogramWidget, {
            model: this.model,
            data: this.model.get('data'),
            x_label: this.model.get('x_label')
        });

        ReactDOM.render(component, this.el);
    }
}