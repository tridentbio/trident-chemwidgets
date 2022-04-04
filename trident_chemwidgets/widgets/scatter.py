from ipywidgets import DOMWidget
from traitlets import Unicode, Dict, Float, List, Integer
from .._frontend import module_name, module_version


class Scatter(DOMWidget):
    """Plot an interactive scatter plot based on the given data and
    the selected variables to generate the axis.

    The scatter plot will be displayed to the left of the cell output, with a
    molecule gallery displayed to the right. The molecule gallery can show
    the structures present in the currently-selected subset of the data.

    Args:
        data (pd.DataFrame): Data used to generate the scatter plot.
        smiles (str): Name of the column that contains the SMILES
            string of each molecule.
        x (str): Name of the column used to generate the x-axis
            of the scatter plot.
        y (str): Name of the column used to generate the y-axis
            of the scatter plot.
        x_label (str): Label for the x-axis of the histogram, defaults to the
            value of `x` if not provided.
        y_label (str): Label for the y-axis of the histogram, defaults to the
            value of `y` if not provided.

    Examples:
        >>> import trident_chemwidgets as tcw
        >>> import pandas as pd
        >>> dataset = pd.read_csv(PATH)
        >>> scatter = tcw.Scatter(data=dataset, smiles='smiles', x='mwt', y='logp')
        >>> scatter
    """

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

    def __init__(self, data, smiles, x, y, x_label, y_label, **kwargs):
        super().__init__(**kwargs)

        self._smiles_col = smiles
        self._x_col = x
        self._y_col = y

        self._data = data

        self.data = self.prep_data_for_plot()
        self.x_label = x_label if x_label else x
        self.y_label = y_label if y_label else y

    def prep_data_for_plot(self):
        """Transforms and selects the data correctly for use by the plot.

        Returns:
            dict: Data in dict format to be used in plot.
        """
        data_list = (self._data[[self._smiles_col, self._x_col, self._y_col]]
                     .rename(columns={self._smiles_col: 'smiles', self._x_col: 'x', self._y_col: 'y'})
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
