import { VisualizationSpec } from "react-vega";

function scatterSpec(
    width: number = 400,
    height: number = 400,
    x_label: string = 'x',
    y_label: string = 'y',
    hue_label: string | undefined,
) {
    const specs: {[key: string]: any} = {
        width: width,
        height: height,
        data: { name: 'points' },
        params: [{ name: 'brush', select: 'interval' }],
        mark: {
            type: 'point',
            filled: true
        },
        encoding: {
            x: { field: 'x', type: 'quantitative', title: x_label },
            y: { field: 'y', type: 'quantitative', title: y_label },
            tooltip: { field: 'smiles' },
            stroke: {
                condition: {
                    param: 'brush',
                    value: '#394f76',
                    empty: false
                }, value: 'gray'
            }
        }
    };

    if (hue_label) {
        specs.encoding["color"] = {
            "field": "hue",
            "type": "nominal",
            "title": hue_label
        };
    } else {
        specs.encoding["fill"] = {
            condition: {
                param: 'brush',
                value: '#8ebdb2',
                empty: false
            }, value: 'gray'
        }
    }

    return specs as VisualizationSpec;
}

export default scatterSpec;