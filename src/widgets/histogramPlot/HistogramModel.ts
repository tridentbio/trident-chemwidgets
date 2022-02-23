import { DOMWidgetModel, ISerializers } from '@jupyter-widgets/base';
import { MODULE_NAME, MODULE_VERSION } from '../../version';


const defaultHistogramProperties = {
    data: [],
    x_label: 'x'
}

export type HistogramModelState = typeof defaultHistogramProperties;

export default class HistogramModel extends DOMWidgetModel {
    
    defaults() {
        return {
            ...super.defaults(),
            _model_name: HistogramModel.model_name,
            _model_module: HistogramModel.model_module,
            _model_module_version: HistogramModel.model_module_version,
            _view_name: HistogramModel.view_name,
            _view_module_version: HistogramModel.view_module_version,
            ...defaultHistogramProperties
        }
    }

    static serializers: ISerializers = {
        ...DOMWidgetModel.serializers
    };

    static model_name = 'HistogramModel';
    static model_module = MODULE_NAME;
    static model_module_version = MODULE_VERSION;

    static view_name = 'HistogramView';
    static view_module = MODULE_NAME;
    static view_module_version = MODULE_VERSION;

}