import { DOMWidgetView } from "@jupyter-widgets/base";
import React from "react";
import ReactDOM from 'react-dom';
import JsmeWidget from "./JsmeWidget";


export default class JsmeView extends DOMWidgetView {
    render() {
        this.el.classList.add('jsme-widget');
        const component = React.createElement(JsmeWidget, {
            model: this.model,
        });
        ReactDOM.render(component, this.el);
    }
}
