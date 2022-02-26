import JSME from './JSME';
import theme from '../../theme';
import Logo from '../../utils/logo';
import initRDKit from '../../utils/rdkit';
import React, { useState, useEffect } from 'react';
import { Button, Grid, ThemeProvider } from '@mui/material';
import MoleculeGallery from '../drawings/MoleculeGallery';
import { Point0D } from '../../types/dataTypes';

interface JSMEProps {
    baseSmiles: string,
    onChange?: (smilesList: string[]) => void 
}

const JSMEWithGallery = (props: JSMEProps): JSX.Element =>  {
    const [currentSmiles, setCurrentSmiles] = useState<string>('')
    const [smiles, setSmiles] = useState<string[]>([])
    const [indexedSmiles, setIndexedSmiles] = useState<Point0D[]>([])
    const [resetState, setResetState] = useState(false)
    // @ts-ignore
    const [rdKitLoaded, setRdKitLoaded] = useState(false);
    // @ts-ignore
    const [rdKitError, setRdKitError] = useState(false);

    useEffect(() => {
        if (!(window as any).RDKit) {
            initRDKit();
        }
    }, []);

    const handleAddSmilesToList = () => {
        if (currentSmiles !== '') {
            let newSmiles = [...smiles, currentSmiles]
            let newIndexedSmiles = [...indexedSmiles]

            if (indexedSmiles.length == 0) {
                newIndexedSmiles.push({smiles: currentSmiles, index: 0})
            } else {
                newIndexedSmiles.push({smiles: currentSmiles, index: indexedSmiles.length})
            }

            setSmiles(newSmiles)
            setIndexedSmiles(newIndexedSmiles)

            if (props.onChange) {
                props.onChange(newSmiles)
            }
        }
    }

    const handleResetToBaseSmiles = () => {
        setResetState(true)
    }

    const indexSmiles = (smiles: string[]):Point0D[] => {
        let indexedSmiles = []

        for (let i = 0; i < smiles.length; i++) {
            indexedSmiles.push({'smiles': smiles[i], 'index': i})
        } 

        return indexedSmiles
    }

    useEffect(() => {
        initRDKit()
            .then(() => {
                setRdKitLoaded(true);
            })
            .catch(() => {
                setRdKitError(true);
            })
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Grid container sx={{marginTop: '10px'}} spacing={2}
                  direction='row' alignItems='center'>
                <Grid item sm={12} md={6} alignItems='center'
                      justifyContent='center'>
                    <Grid container spacing={2} direction='column'
                          alignItems='center'>
                        <Grid item xs={6} alignItems='center'
                              justifyContent='center'>
                            <JSME width='400px' height='350px' smiles={props.baseSmiles} reset={resetState} altOptions={{guicolor: '#f5f8ff'}} onReset={setResetState} onChange={setCurrentSmiles} />
                        </Grid>
                        <Grid sm={12} sx={{marginTop: '15px'}}>
                            <Button onClick={handleAddSmilesToList}>
                                Add to SMILES list
                            </Button>
                            <Button onClick={handleResetToBaseSmiles}>
                                Reset to base SMILES
                            </Button>
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
                <Grid item sm={12} md={6} alignItems='center' justifyContent='center'>
                    <MoleculeGallery selected={indexSmiles(smiles)} />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default JSMEWithGallery;