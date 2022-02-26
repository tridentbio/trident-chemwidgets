import React, { useEffect, useState } from "react";
import initRDKit from '../../utils/rdkit';

interface MoleculeDrawingProps {
    smiles: string;
    width: number;
    height: number;
}

const MoleculeDrawing = (props: MoleculeDrawingProps): JSX.Element => {
    // TODO: handle unloaded rdkit and an error while loading
    // @ts-ignore
    const [rdKitLoaded, setRdKitLoaded] = useState(false);
    // @ts-ignore
    const [rdKitError, setRdKitError] = useState(false);
    const [moleculeDraw, setMoleculeDraw] = useState('');

    const {smiles, width, height} = props;

    const drawMolecule = () => {
        const molecule = (window as any).RDKit.get_mol(smiles, JSON.stringify({ sanitize: false }));
        const svg = molecule.get_svg(width, height);
        setMoleculeDraw(svg);

        // Manually delete the molecule since the object came from C++
        // See: https://emscripten.org/docs/porting/connecting_cpp_and_javascript/embind.html#memory-management
        molecule.delete();
    };

    useEffect(() => {
        initRDKit()
            .then(() => {
                setRdKitLoaded(true);
                drawMolecule();
            })
            .catch(() => {
                setRdKitError(true);
            })
    }, []);

    return (
        <div contentEditable='true'
             dangerouslySetInnerHTML={{
                __html: moleculeDraw
             }}
        >
        </div>
    );
};

export default MoleculeDrawing;