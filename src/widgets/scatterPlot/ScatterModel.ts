import { DOMWidgetModel, ISerializers } from "@jupyter-widgets/base";
import { MODULE_NAME, MODULE_VERSION } from "../../version";


const defaultScatterProperties = {
    data: {},
    x_label: 'x',
    y_label: 'y'
}

export type ScatterModelState = typeof defaultScatterProperties;

export default class ScatterModel extends DOMWidgetModel {

    defaults() {
        return {
            ...super.defaults(),
            _model_name: ScatterModel.model_name,
            _model_module: ScatterModel.model_module,
            _model_module_version: ScatterModel.model_module_version,
            _view_name: ScatterModel.view_name,
            _view_module_version: ScatterModel.view_module_version,
            ...defaultScatterProperties
        };
    }

    static serializers: ISerializers = {
        ...DOMWidgetModel.serializers
    };

    static model_name = 'ScatterModel';
    static model_module = MODULE_NAME;
    static model_module_version = MODULE_VERSION;
    static view_name = 'ScatterView';
    static view_module = MODULE_NAME;
    static view_module_version = MODULE_VERSION;
}