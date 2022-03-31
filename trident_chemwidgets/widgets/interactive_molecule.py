import pandas as pd
from typing import Any, Dict, List, Union
from ipywidgets import DOMWidget
from traitlets import Unicode, List as tList
from .._frontend import module_name, module_version


class InteractiveMolecule(DOMWidget):
    """Plot an interactive molecule where the user can select the atoms
    they want to view their details separately on a card.

    Args:
        smiles(str): Smiles string used to generate the atom view.
        data(Union[List[Dict[str, Any]], pd.DataFrame]): List of dicts or dataframe
            containing the data for each atom.
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
        """
        Args:
            smiles (str): SMILES string of the molecule that will be drawn.
            data (List[Dict[str, Any]]): list of atom features sorted
                by rdkit default atom order.
        """
        super().__init__(**kwargs)
        self.smiles = smiles

        if isinstance(data, list):
            self.data = data
        else:
            self.data = self.prepare_data(data)

    def prepare_data(self, data: pd.DataFrame) -> List:
        data_list = data.to_dict(orient='records')
        return data_list
