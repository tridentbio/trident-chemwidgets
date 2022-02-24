import initRDKit from "../../utils/rdkit";

function plot_mol_svg(smiles: string, width:number = 250, height:number = 200): string {
    // @ts-ignore
    if (!window.RDKit) {
        initRDKit();
    }

    // @ts-ignore
    var mol = window.RDKit.get_mol(smiles);
    var svg = mol.get_svg(width, height);

    // Manually delete, since mol is beyond reach of garbage collection
    // see https://sourceforge.net/p/rdkit/mailman/message/37598458/
    mol.delete();

    return svg;
}

function mol_svg_formatter(value: any, valueToHtml: (value: any) => string, maxDepth: number) {
    return plot_mol_svg(value);
}

const tooltipOptions = {
    formatTooltip: mol_svg_formatter,
    theme: 'light',
};

export default tooltipOptions;