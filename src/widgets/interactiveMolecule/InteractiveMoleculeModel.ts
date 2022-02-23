import { DOMWidgetModel, ISerializers } from "@jupyter-widgets/base";
import { MODULE_NAME, MODULE_VERSION } from "../../version";


const defaultInteractiveMoleculeProperties = {
    smiles: '',
    atoms_data: []
};

export type InteractiveMoleculeModelState = typeof defaultInteractiveMoleculeProperties;

export default class InteractiveMoleculeModel extends DOMWidgetModel {
    
    defaults() {
        return {
            ...super.defaults(),
            _model_name: InteractiveMoleculeModel.model_name,
            _model_module: InteractiveMoleculeModel.model_module,
            _model_module_version: InteractiveMoleculeModel.model_module_version,
            _view_name: InteractiveMoleculeModel.view_name,
            _view_module_version: InteractiveMoleculeModel.view_module_version
        }    
    }

    static serializers: ISerializers = {
        ...DOMWidgetModel.serializers
    };

    static model_name = 'InteractiveMoleculeModel';
    static model_module = MODULE_NAME;
    static model_module_version = MODULE_VERSION;
    
    static view_name = 'InteractiveMoleculeView';
    static view_module = MODULE_NAME;
    static view_module_version = MODULE_VERSION;

}
