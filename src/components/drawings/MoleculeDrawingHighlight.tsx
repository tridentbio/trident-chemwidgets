import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, styled } from '@mui/material';
import initRDKit from '../../utils/rdkit';
import { ThemeProvider } from "@mui/system";
import theme from "../../theme";
import Logo from "../../utils/logo";
import { atomicNumberToName } from "../../utils/chem";


const MoleculeContainer = styled('div')({
    '& svg ellipse': {
        fill: 'rgb(217, 213, 213) !important',
        stroke: 'rgb(217, 213, 213) !important',
        '&:hover': {
            fill: 'rgb(167 164 164) !important',
            stroke: 'rgb(167 164 164) !important',
        },
        '&.active': {
            fill: '#8BBEB2 !important',
            stroke: '#8BBEB2 !important'
        }
    }
});

interface MoleculeDrawingHighlightProps {
    smiles: string,
    allAtoms: boolean,
    atoms?: Array<number>,
    atomsData?: Array<{[key:string]: any}>,
    // TODO: add bond support
    // allBonds: boolean,
    // bonds?: Array<number>,

    width: number,
    height: number,

    id: string
}

interface MoleculeDetails {
    atoms: Array<number>,
    width: number,
    height: number,
}

interface DisplayData {
    type: string,
    index: number,
    data: {[key: string]: any}
}


const MoleculeDrawingHighlight = (props: MoleculeDrawingHighlightProps): JSX.Element => {
    
    const { smiles, height, width, allAtoms, atomsData } = props;
    // @ts-ignore
    const [rdKitLoaded, setRdKitLoaded] = useState(false);
    // @ts-ignore
    const [rdKitError, setRdKitError] = useState(false);


    const [moleculeSvg, setMoleculeSvg] = useState('');
    const [displayData, setDisplayData] = useState<DisplayData | null>(null);
    const [atomsName, setAtomsName] = useState<string[]>([]);

    const getAllAtoms = (molecule: any) => {
        if (allAtoms) {
            const molecule_json = JSON.parse(molecule.get_json()).molecules[0];
            const names: string[] = [];
            const atomsIndices = molecule_json.atoms.map((atom: any, index: number) => {
                // Handle the name of each atom element
                if (atom['z'] === undefined) {
                    names.push('Carbon')
                } else {
                    names.push(atomicNumberToName(atom['z']))
                }
                return index;
            });
            setAtomsName(names);
            return atomsIndices;
        }
        return props?.atoms;
    };

    const atomOnMouseDown = (i: number) => {
        return (event: Event) => {
            const svgElement = document.getElementById(props.id)?.getElementsByTagName('svg');
            const atomsEllipses: any = svgElement?.item(0)?.getElementsByTagName('ellipse');
            const atoms: SVGSVGElement[] = Array.from(atomsEllipses);

            atoms.forEach((atom, index) => {
                if (index !== i) {
                    atom.classList.remove('active');
                } else {
                    atom.classList.add('active');
                    setDisplayData({
                        type: 'Atom',
                        index: index,
                        data: (atomsData ? atomsData[index] : {})
                    });
                }
            });
        }
    }

    const drawMolecule = () => {
        const molecule = (window as any).RDKit.get_mol(smiles);
        const atomsList = getAllAtoms(molecule);
        const moleculeDetails: MoleculeDetails = {
            atoms: atomsList,
            width: width,
            height: height,
        };
        const svg = molecule.get_svg_with_highlights(JSON.stringify(moleculeDetails));

        setMoleculeSvg(svg);
        molecule.delete();

        const svgElement = document.getElementById(props.id)?.getElementsByTagName('svg');
        const atomsEllipses: any = svgElement?.item(0)?.getElementsByTagName('ellipse');
        const atoms: SVGSVGElement[] = Array.from(atomsEllipses);
        atoms.forEach((atom, index) => {
            atom.onmousedown = atomOnMouseDown(index);
        });
    };

    useEffect(() => {
        initRDKit().then(() => {
            setRdKitLoaded(true);
            drawMolecule();
        }).catch(() => {
            setRdKitError(true);
        });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Grid container mt={2} spacing={2} direction='row'>
                <Grid item sm={12} md={6} alignItems='center'
                        justifyContent='center'>
                    <Grid container spacing={2} direction='column'
                        alignItems='center'>
                        <Grid item xs={6} alignItems='center'
                            justifyContent='center'>
                            <Grid textAlign='center'>
                                <Typography variant='h5'>
                                    Molecule Display
                                </Typography>
                                <Typography variant='h6'>
                                    {smiles}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} alignItems='center'
                            justifyContent='center'>
                            <Paper elevation={3}>
                                <MoleculeContainer
                                    id={props.id}
                                    contentEditable='true'
                                    dangerouslySetInnerHTML={{
                                        __html: moleculeSvg
                                    }}>
                                </MoleculeContainer>
                            </Paper>
                        </Grid>
                        <Grid container alignItems='center'
                            justifyContent='center' mt={2}>
                            <div style={{ width: '200px' }}>
                                <a href='https://www.trident.bio/' target='_blank'>
                                    <div dangerouslySetInnerHTML={{ __html: Logo() }} />
                                </a>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={12} md={6} alignItems='center' justifyContent='center' p={3}>
                    {displayData && (
                        <Paper elevation={3}>
                            <Grid container p={3}>
                                <Grid item sm={12}>
                                    <div>
                                        <Typography variant='h4'>
                                            {(displayData.type == 'Atom') ? 
                                                atomsName[displayData.index] : displayData.type}
                                        </Typography>
                                        <Typography color='text.secondary'>
                                            Atom • index: {displayData.index}
                                        </Typography>
                                    </div>
                                </Grid>
                                {Object.keys(displayData.data).map(key => (
                                    <Grid item sm={12} mt={3}>
                                        <div>
                                            <Typography variant='h6'>{key}</Typography>
                                            <p>
                                                {displayData.data[key]}
                                            </p>
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default MoleculeDrawingHighlight;
