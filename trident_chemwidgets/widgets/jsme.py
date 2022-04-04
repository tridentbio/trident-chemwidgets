from typing import Any, Dict, List
from ipywidgets import DOMWidget
from traitlets import Unicode, List as tList
from .._frontend import module_name, module_version


class JSME(DOMWidget):
    """Display the JSME editor and sync drawn molecule SMILES strings to
    Python.

    The JSME interface will be displayed to the left of the cell output, with a
    molecule gallery displayed to the right. The molecule gallery can show
    the structures designed and input by the user.

    Args:
        base_smiles (str): Base smiles used to generate an initial
            molecule in the JSME input window.

    Examples:
        >>> import trident_chemwidgets as tcw
        >>> jsme = tcw.JSME()
        >>> jsme

        A depiction of the structure, and all others that have been
        added to the saved internal molecule list will be displayed
        in the gallery to the right. You can access the list of input
        smiles using the `smiles` property of the widget.

        >>> jsme.smiles

        You can specify a `base_smiles` that will allow you to quickly
        generate derivatives. At any point, you can reset the input
        window to this predefined base smiles value by clicking the
        `RESET TO BASE SMILES` button beneath the input window.

        >>> jsme = tcw.JSME(base_smiles='CC(C)Cc1ccc(cc1)[C@@H](C)C(=O)O')
        >>> jsme
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
