import React, { useEffect } from 'react';
import  Scatter  from '../../components/plots/Scatter';
import { useModelState } from '../../hooks/widgetModel';
import withModelContext, { WidgetProps } from '../../context/modelContext';
import { compare } from 'vega';

const ScatterWidget = (props: WidgetProps): JSX.Element => {
    // @ts-ignore
    const [ savedSelected, setSavedSelected ] = useModelState('savedSelected');

    return (
        <Scatter data={props.model.get('data')}
                 xLabel={props.model.get('x_label')}
                 yLabel={props.model.get('y_label')}
                 hueLabel={props.model.get('hue_label')}
                 onChange={setSavedSelected} />
    );
}

export default withModelContext(ScatterWidget);