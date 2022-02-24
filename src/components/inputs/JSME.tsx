import React, { useEffect } from 'react';

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}

interface callbacks {
    [key: string]: (() => void) | undefined
}

interface altOptionTypes {
    jme: string;            // structure in JME format
    smiles: string;         // structure in SMILES format
    mol: string;            // structure in MOL format
    guicolor: string;       // background color of the GUI elements in RGB hex format (e.g. #FFFFFF) (see also method setUserInterfaceBackgroundColor() )
    atomcolors: string;     // atom colors
    atombg: string;         // atom background colors - see the demo JSME_atom_highlight_demo.html for an example
    depictbg: string;       // background color for the depict mode in hex format - no test yet
    atombgsize: string;     // relative size of the atom background circle, default is "1.0" 
    bondbgsize: string;     // relative size of the bond background rectangle, default is "1.0"
}

interface JSMEProps {
    smiles: string;
    width: number;
    height: number;
    src?: string;
    options?: string;
    altOptions?: altOptionTypes;
    onChange?: (smiles: string) => void;
}

const JSME = (props: JSMEProps): JSX.Element => {

    const id = "jsme" + getRandomInt(1, 100000)

    let jsmeIsLoaded = false;
    let jsmeCallbacks: callbacks = {}
    let jsmeApplet: any;

    const setup = (src = "https://jsme.cloud.douglasconnect.com/JSME_2017-02-26/jsme/jsme.nocache.js") => {
        const script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);

        // @ts-ignore
        window.jsmeOnLoad = () => {
            Object.values(jsmeCallbacks)
                .forEach((f: any) => f());
            jsmeIsLoaded = true;
        }
    }

    const handleJsmeLoad = () => {

        const optionObject = {
            options: props.options,
            ...props.altOptions
        }

        // @ts-ignore
        jsmeApplet = new window.JSApplet.JSME(id, props.width, props.height, optionObject);
        jsmeApplet.setCallBack("AfterStructureModified", handleChange);
        jsmeApplet.readGenericMolecularInput(props.smiles)

        jsmeIsLoaded = true;
    }

    const handleChange = (jsmeEvent: any) => {
        if (props.onChange) {
            props.onChange(jsmeEvent.src.smiles())
        }
    }

    // Handle mount and unmount
    useEffect(() => {
        if (jsmeIsLoaded) {
            handleJsmeLoad();
        } else {
            // @ts-ignore
            if (!window.jsmeOnLoad) {
                setup(props.src);
            }

            //@ ts-ignore
            jsmeCallbacks[id] = handleJsmeLoad;
        }

        return function cleanup() {
            jsmeCallbacks[id] = undefined;
        };

    });

    // Handle change of size
    useEffect(() => {
        jsmeApplet.setSize(props.width, props.height)
    }, [props.height, props.width]);

    // Handle change of SMILES string
    useEffect(() => {
        jsmeApplet.readGenericMolecularInput(props.smiles)
    }, [props.smiles]);

    // Handle change in options or altOptions
    useEffect(() => {
        const optionObject = {
            options: props.options,
            ...props.altOptions
        }
        jsmeApplet.options(optionObject)
    }, [props.options, props.altOptions]);

    return <div id={id}></div>
}

export default JSME;