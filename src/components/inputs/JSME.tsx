import React, { useState, useEffect } from 'react';

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}

interface callbacks {
    [key: string]: (() => void) | undefined
}

interface altOptionTypes {
    jme?: string;            // structure in JME format
    smiles?: string;         // structure in SMILES format
    mol?: string;            // structure in MOL format
    guicolor?: string;       // background color of the GUI elements in RGB hex format (e.g. #FFFFFF) (see also method setUserInterfaceBackgroundColor() )
    atomcolors?: string;     // atom colors
    atombg?: string;         // atom background colors - see the demo JSME_atom_highlight_demo.html for an example
    depictbg?: string;       // background color for the depict mode in hex format - no test yet
    atombgsize?: string;     // relative size of the atom background circle, default is "1.0" 
    bondbgsize?: string;     // relative size of the bond background rectangle, default is "1.0"
}

interface JSMEProps {
    width: string;
    height: string;
    smiles?: string;
    src?: string;
    reset?: boolean;
    options?: string;
    altOptions?: altOptionTypes;
    onReset?: (reset: boolean) => void;
    onChange?: (smiles: string) => void;
}

const JSME = (props: JSMEProps): JSX.Element => {
    const [jsmeIdState, _setJsmeIdState] = useState("jsme" + getRandomInt(1, 100000))
    const [jsmeLoadedState, setJsmeLoadedState] = useState(false)
    const [jsmeAppletState, setJsmeAppletState] = useState<any>()

    const handleChange = (jsmeEvent: any) => {
        let newSmiles = jsmeEvent.src.smiles()
        if (props.onChange) {
            props.onChange(newSmiles)
        }
        
    }

    const handleJsmeLoad = () => {
        const optionObject = {
            options: props.options ? props.options : '',
            ...props.altOptions
        }

        let jsmeApplet: any = new (window as any)
            .JSApplet
            .JSME(jsmeIdState, props.width, props.height, optionObject);

        jsmeApplet.setCallBack("AfterStructureModified", handleChange);
        jsmeApplet.readGenericMolecularInput(props.smiles)

        setJsmeAppletState(jsmeApplet)
    }

    let jsmeCallbacks: callbacks = {id: handleJsmeLoad};

    const setup = (src: string) => {
        if (!(window as any).jsmeOnLoad){
            const script = document.createElement('script');
            script.src = src;
            document.head.appendChild(script);
        }
        
        (window as any).jsmeOnLoad = () => {
            Object.values(jsmeCallbacks)
                .forEach((f: any) => f());
        }
    }

    // Handle mount and unmount
    useEffect(() => {
        if (!(window as any).jsmeOnLoad) {
            setup("/static/jsme/jsme.nocache.js");
            setJsmeLoadedState(true);
        } else {
            setJsmeLoadedState(true)
            handleJsmeLoad()
        }
    }, []);

    // Handle change of size
    useEffect(() => {
        if (jsmeLoadedState && jsmeAppletState) {
            jsmeAppletState.setSize(props.width, props.height)
        }
    }, [props.height, props.width]);

    // Handle change in options or altOptions
    useEffect(() => {
        if (jsmeLoadedState && jsmeAppletState) {
            const optionObject = {
                options: props.options,
                ...props.altOptions
            }
            jsmeAppletState.options(optionObject)
        }
    }, [props.options, props.altOptions]);

    useEffect(() => {
        if (jsmeLoadedState && jsmeAppletState && props.reset && props.onReset) {
            jsmeAppletState.clear()
            jsmeAppletState.readGenericMolecularInput(props.smiles)
            props.onReset(false)
        }
    }, [props.reset]);

    return <div id={jsmeIdState}></div>
}

export default JSME;