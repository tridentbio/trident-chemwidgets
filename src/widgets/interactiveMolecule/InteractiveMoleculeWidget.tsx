import React from 'react';
import MoleculeDrawingHighlight from '../../components/drawings/MoleculeDrawingHighlight';
import withModelContext, { WidgetProps } from '../../context/modelContext';
import { useModelState } from '../../hooks/widgetModel';


const InteractiveMolecule = (props: WidgetProps): JSX.Element => {
    // @ts-ignore
    const [smiles, setSmiles] = useModelState('smiles');
    // @ts-ignore
    const [atomsData, setAtomsData] = useModelState('data');

    // TODO: generate random id for this widget
 
    return (
        <>
            <MoleculeDrawingHighlight
                smiles={smiles}
                allAtoms={true}
                atomsData={atomsData}
                colorColumns={Object.keys(atomsData[0])}
                // allBonds={false}
                height={400}
                width={400}
                id='test'
            />
        </>
    );
};

export default withModelContext(InteractiveMolecule);
