import React from 'react';
import Histogram from '../../components/plots/Histogram';
import { useModelState } from '../../hooks/widgetModel';
import withModelContext, { WidgetProps } from '../../context/modelContext';


const HistogramWidget = (props: WidgetProps): JSX.Element => {
    // @ts-ignore
    const [ savedSelected, setSavedSelected ] = useModelState('savedSelected');
    
    return <Histogram
                data={ props.model.get('data') }
                xLabel={ props.model.get('x_label') }
                xIsDate={ props.model.get('x_is_date') }
                xDateFormat={ props.model.get('x_format_date_string') }
                onChange={setSavedSelected}/>;
}

export default withModelContext(HistogramWidget);