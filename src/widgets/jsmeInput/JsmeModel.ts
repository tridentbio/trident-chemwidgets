import { DOMWidgetModel, ISerializers } from "@jupyter-widgets/base";
import { MODULE_NAME, MODULE_VERSION } from "../../version";


const defaultJsmeProperties = {
    smiles: ''
}

export type JsmeModelState = typeof defaultJsmeProperties;

export default class JsmeModel extends DOMWidgetModel {

    defaults() {
        return {
            ...super.defaults(),
            _model_name: JsmeModel.model_name,
            _model_module: JsmeModel.model_module,
            _model_module_version: JsmeModel.model_module_version,
            _view_name: JsmeModel.view_name,
            _view_module_version: JsmeModel.view_module_version,
            ...defaultJsmeProperties
        };
    }

    static serializers: ISerializers = {
        ...DOMWidgetModel.serializers
    };

    static model_name = 'JsmeModel';
    static model_module = MODULE_NAME;
    static model_module_version = MODULE_VERSION;
    static view_name = 'JsmeView';
    static view_module = MODULE_NAME;
    static view_module_version = MODULE_VERSION;
}