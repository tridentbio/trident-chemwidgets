from ipywidgets import DOMWidget
from traitlets import Unicode, Dict, Float, List, Integer
from .._frontend import module_name, module_version


class Histogram(DOMWidget):
    """Plot an interactive histogram based on the distribution of the given
    data and the selected variable.

    The histogram will be displayed to the left of the cell output, with a
    molecule gallery displayed to the right. The molecule gallery can show
    the structures present in the currently-selected subset of the data.

    Args:
        data (pd.DataFrame): DataFrame used to generate the histogram.
        smiles (str): Name of the column that contains the SMILES string
            of each molecule.
        x (str): Name of the column used to generate the x-axis of the histogram.
        x_label (str): Label for the x-axis of the histogram, defaults to the
            value of `x` if not provided.

    Examples:
        >>> import trident_chemwidgets as tcw
        >>> import pandas as pd
        >>> dataset = pd.read_csv(PATH)
        >>> histogram = tcw.Histogram(data=dataset, smiles='smiles', x='tpsa')
        >>> histogram
    """

    _model_name = Unicode('HistogramModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode('HistogramView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

    # Handle passing data
    x_label = Unicode('x').tag(sync=True)
    data = Dict(per_key_traits={
        'points': List(trait=Dict(per_key_traits={
            'index': Integer(),
            'smiles': Unicode(),
            'x': Float()
        }))
    }).tag(sync=True)

    savedSelected = List(trait=Integer()).tag(sync=True)

    def __init__(self, data, smiles, x, x_label=None, **kwargs):
        super().__init__()

        self._smiles_col = smiles
        self._x_col = x
        self._data = data

        self.data = self.prep_data_for_plot()
        self.x_label = x_label if x_label else x

    def prep_data_for_plot(self):
        """Transforms and correctly selects the data that will be transformed
        into dict and will be used by React to generate the histogram.

        Returns:
            dict: data in dictionary format. 
        """
        data_list = (self._data[[self._smiles_col, self._x_col]]
                     .rename(columns={self._smiles_col: 'smiles', self._x_col: 'x'})
                     .to_dict(orient='records'))

        for i in range(len(data_list)):
            data_list[i]['index'] = i

        data_dict = {'points': data_list}

        return data_dict

    @property
    def selection(self):
        """Current selection of molecules made by the user.
        """
        return self._data.iloc[self.savedSelected]
