import pandas as pd
import numpy as np
import re
from ipywidgets import DOMWidget
from traitlets import Unicode, Dict, Float, List, Integer, Bool, Any, Union
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
        hue (str): Name of the column used to color the points
            of the scatter plot.
        x_label (str): Label for the x-axis of the histogram,
            defaults to the value of `x` if not provided.
        y_label (str): Label for the y-axis of the histogram,
            defaults to the value of `y` if not provided.
        hue_label (str): Label for the point colors of the histogram,
            defaults to the value of `hue` if not provided.
        x_date_format (str): Date format string to display datetime values on the
            x axis.
        y_date_format (str): Date format string to display datetime values on the
            y axis.

    Notes:
        Valid date format strings for the `x_date_format` and `y_date_format`
        arguments can be found here: https://github.com/d3/d3-time-format#locale_format.
        For example, a common date format string might be '%Y-%m-%d' to display
        the 4-digit year, 2-digit month, and 2-digit day (i.e. 2021-12-25).  

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

    # X-Axis params
    x_label = Unicode('x').tag(sync=True)
    x_is_date = Bool(False).tag(sync=True)
    x_format_date_string = Unicode('').tag(sync=True)

    # Y-Axis params
    y_label = Unicode('y').tag(sync=True)
    y_is_date = Bool(False).tag(sync=True)
    y_format_date_string = Unicode('').tag(sync=True)

    # Hue params
    hue_label = Unicode().tag(sync=True)
    hue_type = Unicode().tag(sync=True)
    hue_min = Float().tag(sync=True)
    hue_max = Float().tag(sync=True)
    # hue_scale = Unicode('linear').tag(sync=True)

    data = Dict(per_key_traits={
        'points': List(trait=Dict(per_key_traits={
            'index': Integer(),
            'smiles': Unicode(),
            'x': Any(),
            'y': Any(),
        }))
    }).tag(sync=True)

    savedSelected = List(trait=Integer()).tag(sync=True)

    def __init__(
        self,
        data: pd.DataFrame,
        smiles: str,
        x: str,
        y: str,
        hue: str = None,
        x_label: str = None,
        y_label: str = None,
        hue_label: str = None,
        x_date_format: str = None,
        y_date_format: str = None,
        **kwargs
    ):
        super().__init__(**kwargs)

        self._smiles_col = smiles
        self._x_col = x
        self._y_col = y
        self._hue = hue if hue else None

        if self._hue:
            self.hue_label = hue_label if hue_label else hue

        self.x_label = x_label if x_label else x
        self.y_label = y_label if y_label else y

        self._format_x_date = x_date_format if x_date_format else ''
        self._format_y_date = y_date_format if y_date_format else ''

        self._data = data
        self.data = self.prep_data_for_plot()

    def prep_data_for_plot(self):
        """Transforms and selects the data correctly for use by the plot.

        Returns:
            dict: Data in dict format to be used in plot.
        """
        # Check hue and convert data types
        if self._hue:
            data = pd.DataFrame({
                'smiles': self._data[self._smiles_col].values.copy(),
                'x': self._data[self._x_col].values.copy(),
                'y': self._data[self._y_col].values.copy(),
                'hue': self._data[self._hue].values.copy(),
            })
            # Detect the correct type of the hue column
            self.hue_type = re.sub('[0-9]', '', str(data['hue'].dtype))
            # Only use the hue_min and hue_max for the domain in float values
            if self.hue_type == 'float':
                self.hue_max = data['hue'].max()
                self.hue_min = data['hue'].min()
        else:
            data = pd.DataFrame({
                'smiles': self._data[self._smiles_col].values.copy(),
                'x': self._data[self._x_col].values.copy(),
                'y': self._data[self._y_col].values.copy()
            })

        x_type = re.sub('[0-9]', '', str(data['x'].dtype))
        if x_type not in ['int', 'float']:
            # Otherwise verify if x is a date column
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
                # If raise an exception/error the column cannot be a date type
                self.x_is_date = False

        y_type = re.sub('[0-9]', '', str(data['y'].dtype))
        if y_type not in ['int', 'float']:
            # Verify if y is a date column
            try:
                data['y'] = pd.to_datetime(
                    data['y']).apply(lambda x: x.__str__())
                self.y_is_date = True
                self.y_format_date_string = self._format_y_date
            except ValueError:
                self.y_is_date = False

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
