import { VisualizationSpec } from "react-vega";

const histogramSpec = (
    width: number = 400,
    height: number = 400,
    x_label: string = 'x'
): VisualizationSpec => {
    return {
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
                        title: x_label
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
                    x: { field: 'x', bin: true },
                    y: { aggregate: 'count' },
                    color: { value: '#8EBDB2' }
                }
            }
        ]
    } as VisualizationSpec;
}

export default histogramSpec;