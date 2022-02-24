from ipywidgets import DOMWidget
from traitlets import Unicode, Dict, Float, List, Integer
from .._frontend import module_name, module_version


class Scatter(DOMWidget):

    _model_name = Unicode('ScatterModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode('ScatterView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

    # Handle passing data
    x_label = Unicode('x').tag(sync=True)
    y_label = Unicode('y').tag(sync=True)
    data = Dict(per_key_traits={
        'points': List(trait=Dict(per_key_traits={
            'index': Integer(),
            'smiles': Unicode(),
            'x': Float(),
            'y': Float()
        }))
    }).tag(sync=True)

    savedSelected = List(trait=Integer()).tag(sync=True)

    def __init__(self, data, smiles, x, y, **kwargs):
        super().__init__(**kwargs)

        self._smiles_col = smiles
        self._x_col = x
        self._y_col = y

        self._data = data

        self.data = self.prep_data_for_plot()
        self.x_label = kwargs['x_label'] if 'x_label' in kwargs else x
        self.y_label = kwargs['y_label'] if 'y_label' in kwargs else x

    def prep_data_for_plot(self):
        data_list = (self._data[[self._smiles_col, self._x_col, self._y_col]]
                     .rename(columns={self._smiles_col: 'smiles', self._x_col: 'x', self._y_col: 'y'})
                     .to_dict(orient='records'))

        for i in range(len(data_list)):
            data_list[i]['index'] = i

        data_dict = {'points': data_list}

        return data_dict

    @property
    def selection(self):
        return self._data.iloc[self.savedSelected]
