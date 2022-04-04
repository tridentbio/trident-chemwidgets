import pandas as pd
from typing import Any, Dict, List, Union
from ipywidgets import DOMWidget
from traitlets import Unicode, List as tList
from .._frontend import module_name, module_version


class InteractiveMolecule(DOMWidget):
    """Plot an interactive molecule where the user can view properties associated
    with each constituent atom.

    A drawing of the target molecule will be displayed to the left of the cell
    output, with a card displayed on the right. The user can click any atom in
    the structure and the details associated with that atom will be displayed
    in the card to the right.

    Args:
        smiles (str): Smiles string used to generate the atom view.
        data (Union[List[Dict[str, Any]], pd.DataFrame]): List of dicts or dataframe
            containing the data for each atom.

    Examples:
        >>> import trident_chemwidgets as tcw
        >>> atom_data = ... # Atom data in a list of dicts or pd.DataFrame
        >>> imol = tcw.InteractiveMolecule('CCCCC', data=atom_data)
        >>> imol # Plot the actual widget on the notebook/lab
    """

    # Widget default attributes
    _model_name = Unicode('InteractiveMoleculeModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode('InteractiveMoleculeView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

    # Widget extra attributes
    smiles = Unicode('').tag(sync=True)
    data = tList().tag(sync=True)

    def __init__(
        self,
        smiles: str,
        data: Union[List[Dict[str, Any]], pd.DataFrame] = [],
        **kwargs
    ):
        super().__init__(**kwargs)
        self.smiles = smiles

        if isinstance(data, list):
            self.data = data
        else:
            self.data = self.prepare_data(data)

    def prepare_data(self, data: pd.DataFrame) -> List:
        """Transforms a dataset from the dataframe format to a list
        of dictionaries that will be interpreted by React.

        Args:
            data (pd.DataFrame): Dataframe that will be transformed.

        Returns:
            List: List of data transformed to the correct format.
        """
        data_list = data.to_dict(orient='records')
        return data_list
