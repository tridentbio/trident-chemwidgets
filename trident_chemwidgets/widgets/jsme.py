from typing import Any, Dict, List
from ipywidgets import DOMWidget
from traitlets import Unicode, List as tList
from .._frontend import module_name, module_version


class JSME(DOMWidget):
    """Widget responsible for displaying JSME editor and
    syncing drawn molecule SMILES string to Python.

    Args:
        base_smiles (str): Base smiles used to generate an initial
            molecule in the jsme plot.

    Attributes:
        base_smiles (str): Base smiles that represents the molecule
            generated in jsme.
        smiles (List[str]): List of smiles strings saved by users
            after their creation.

    Examples:
        >>> import trident_chemwidgets as tcw
        >>> jsme = tcw.JSME()
        >>> jsme

        A depiction of the structure, and all others that have been
        added to the saved internal molecule list will be displayed
        in the gallery to the right. You can access the list of input
        smiles using the `smiles` property of the widget.

        >>> jsme.smiles
    """

    # Widget default attributes
    _model_name = Unicode('JsmeModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode('JsmeView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

    # Widget extra attributes
    base_smiles = Unicode().tag(sync=True)
    smiles = tList(trait=Unicode()).tag(sync=True)

    def __init__(self, base_smiles: str = '', **kwargs):
        """
        Args:
            smiles (str): SMILES string of the molecule that will be drawn.
        """
        super().__init__(**kwargs)
        self.base_smiles = base_smiles
        self.smiles = []
