import { VisualizationSpec } from "react-vega";

const histogramSpec = (
    width: number = 400,
    height: number = 400,
    xLabel: string = 'x',
    xIsDate: boolean | undefined,
    xDateFormat: string | undefined,
): VisualizationSpec => {

    const specs: {[key: string]: any} = {
        width: width,
        height: height,
        data: { name: 'points' },
        layer: [
            {
                mark: 'bar',
                params: [{
                    name: 'brush',
                    select: { type: 'interval', encodings: ['x'] },
                }],
                encoding: {
                    x: {
                        bin: true,
                        field: 'x',
                        title: xLabel
                    },
                    y: {
                        aggregate: 'count',
                        title: 'count'
                    },
                    color: { value: 'gray' }
                },
            },
            {
                transform: [{ filter: { param: 'brush', empty: false }}],
                mark: 'bar',
                encoding: {
                    x: {
                        field: 'x',
                        bin: true,
                    },
                    y: { aggregate: 'count' },
                    color: { value: '#8EBDB2' }
                }
            }
        ]
    }

    if (xIsDate) {
        specs.layer[0].encoding['x']['type'] = 'temporal';
        specs.layer[1].encoding['x']['axis'] = false;
        if (!!xDateFormat)
            specs.layer[0].encoding["x"]["axis"] = { "format": xDateFormat }
    }

    return specs as VisualizationSpec;
}

export default histogramSpec;