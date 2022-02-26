import React from 'react';
import JSMEWithGallery from '../../components/inputs/JSMEWithGallery';
import { useModelState } from '../../hooks/widgetModel';
import withModelContext, { WidgetProps } from '../../context/modelContext';

const JsmeWidget = (props: WidgetProps): JSX.Element => {
    // @ts-ignore
    const [ smiles, setSmiles ] = useModelState('smiles');

    // @ts-ignore
    const [baseSmiles, setBaseSmiles] = useModelState('base_smiles');

    return (
        <JSMEWithGallery baseSmiles={baseSmiles} onChange={setSmiles}/>
    );
}

export default withModelContext(JsmeWidget);