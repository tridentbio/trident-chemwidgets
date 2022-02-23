import { DOMWidgetView } from "@jupyter-widgets/base";
import React from "react";
import ReactDOM from 'react-dom';
import InteractiveMoleculeWidget from "./InteractiveMoleculeWidget";


export default class InteractiveMoleculeView extends DOMWidgetView {
    render() {
        this.el.classList.add('interactive-molecule');
        const component = React.createElement(
            InteractiveMoleculeWidget, {
                model: this.model
            }
        );
        ReactDOM.render(component, this.el);
    }
}
