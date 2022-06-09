import pandas as pd
import re
from ipywidgets import DOMWidget
from traitlets import Any, Bool, Unicode, Dict, Float, List, Integer
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
    x_is_date = Bool(False).tag(sync=True)
    x_format_date_string = Unicode('').tag(sync=True)

    data = Dict(per_key_traits={
        'points': List(trait=Dict(per_key_traits={
            'index': Integer(),
            'smiles': Unicode(),
            'x': Any()
        }))
    }).tag(sync=True)

    savedSelected = List(trait=Integer()).tag(sync=True)

    def __init__(
        self,
        data: pd.DataFrame,
        smiles: str,
        x: str,
        x_label: str = None,
        x_date_format: str = None,
        **kwargs
    ):
        super().__init__()

        self._smiles_col = smiles

        self._x_col = x
        self.x_label = x_label if x_label else x
        self._format_x_date = x_date_format if x_date_format else ''

        self._data = data

        self.data = self.prep_data_for_plot()

    def prep_data_for_plot(self):
        """Transforms and correctly selects the data that will be transformed
        into dict and will be used by React to generate the histogram.

        Returns:
            dict: data in dictionary format. 
        """
        data = pd.DataFrame({
            'smiles': self._data[self._smiles_col].values.copy(),
            'x': self._data[self._x_col].values.copy()
        })

        x_type = re.sub('[0-9]', '', str(data['x'].dtype))
        if x_type not in ['int', 'float']:
            try:
                # Try to convert each row to a date
                data['x'] = pd.to_datetime(
                    data['x']).apply(lambda x: x.__str__())
                # Otherwise we can consider that the column contains dates
                # NOTE: we can't convert to date cause the Vega-side does this once
                # we declare in the widget component to
                self.x_is_date = True
                self.x_format_date_string = self._format_x_date
            except ValueError:
                self.x_is_date = False

        data_list = data.to_dict(orient='records')

        for i in range(len(data_list)):
            data_list[i]['index'] = i

        data_dict = {'points': data_list}

        return data_dict

    @property
    def selection(self):
        """Current selection of molecules made by the user.
        """
        return self._data.iloc[self.savedSelected]
