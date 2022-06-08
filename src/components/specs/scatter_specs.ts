import { VisualizationSpec } from "react-vega";

function scatterSpec(
    width: number = 400,
    height: number = 400,
    x_label: string = 'x',
    y_label: string = 'y',
    hueLabel: string | undefined,
    hueType: string | undefined,
    hueMin: number | undefined,
    hueMax: number | undefined,
    xIsDate: boolean | undefined,
    xDateFormat: string | undefined,
    yIsDate: boolean | undefined,
    yDateFormat: string | undefined,
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
            x: {
                field: 'x',
                type: 'quantitative',
                title: x_label
            },
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

    if (!!hueLabel) {
        if (hueType === 'float') {
            hueMin = (hueMin != undefined && hueMin > 0) ? 0 : hueMin;
            specs.encoding["color"] = {
                "field": "hue",
                "type": "quantitative",
                "title": hueLabel,
                "scale": {
                    "domain": [hueMin, hueMax]
                }
            };
        } else {
            specs.encoding["color"] = {
                "field": "hue",
                "type": "nominal",
                "title": hueLabel
            };
        }
    } else {
        specs.encoding["fill"] = {
            condition: {
                param: 'brush',
                value: '#8ebdb2',
                empty: false
            }, value: 'gray'
        };
    }

    if (xIsDate) {
        specs.encoding['x']['type'] = 'temporal';
        if (!!xDateFormat)
            specs.encoding["x"]["axis"] = { "format": xDateFormat }
    }

    if (yIsDate) {
        specs.encoding['y']['type'] = 'temporal';
        if (!!yDateFormat)
            specs.encoding['y']["axis"] = { "format": yDateFormat }
    }

    return specs as VisualizationSpec;
}

export default scatterSpec;