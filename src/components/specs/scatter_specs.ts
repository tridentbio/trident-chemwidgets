import { VisualizationSpec } from "react-vega";

function scatterSpec(
    width: number = 400,
    height: number = 400,
    x_label: string = 'x',
    y_label: string = 'y',
) {
    return {
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
            fill: {
                condition: {
                    param: 'brush',
                    value: '#8ebdb2',
                    empty: false
                }, value: 'gray'
            },
            stroke: {
                condition: {
                    param: 'brush',
                    value: '#394f76',
                    empty: false
                }, value: 'gray'
            }
        }
    } as VisualizationSpec
}

export default scatterSpec;