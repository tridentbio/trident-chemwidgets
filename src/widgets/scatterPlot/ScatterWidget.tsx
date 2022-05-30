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
                 xIsDate={props.model.get('x_is_date')}
                 xDateFormat={props.model.get('x_format_date_string')}
                 yLabel={props.model.get('y_label')}
                 yIsDate={props.model.get('y_is_date')}
                 yDateFormat={props.model.get('y_format_date_string')}
                 hueLabel={props.model.get('hue_label')}
                 hueType={props.model.get('hue_type')}
                 hueMin={props.model.get('hue_min')}
                 hueMax={props.model.get('hue_max')}
                 onChange={setSavedSelected} />
    );
}

export default withModelContext(ScatterWidget);