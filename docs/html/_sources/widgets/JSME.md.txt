# JSME

```{eval-rst}
.. autoclass:: trident_chemwidgets.JSME
   :members:
   :show-inheritance:
```

## Input

The JSME widget uses the JSME editor to provide an interface for molecular input by drawing. For an explanation of the JSME interface, please see the [JSME Help Page](https://jsme-editor.github.io/help.html).

## Interaction features

![JSME interface](../_static/img/JSME.png)

### Creating a list of SMILES strings
Once you draw a structure in the JSME interface, you can add it to the internal list of SMILES strings by clicking the `ADD TO SMILES LIST` button.

### Retrieving the list of SMILES strings

To retrieve these stored smiles strings, you can use the `smiles` attribute of the widget, as shown below:

```python
>>> import trident_chemwidgets as tcw
>>> jsme = tcw.JSME()
>>> jsme

# Edit within the window and save using the ADD TO SMILES LIST button
# Then retrieve the SMILES list by using

>>> jsme.smiles
```

### Using a `base_smiles` to quickly generate derivatives

If you want to generate a list of derivatives from a single molecule starting point, you can use the `base_smiles` argument to the JSME widget.
This keyword will automatically generate the molecule with that SMILES string in the input window.
From that base molecule, you can add atoms to create a derivative and add that derivative to the SMILES list.

If you want to reset your input window to the base SMILES value, click the `RESET TO BASE SMILES` button and continue generating derivatives.
Note that the window does not automatically reset to the base SMILES when a new SMILES is added to the list.
Additionally, if no `base_smiles` argument is provided, you can use the `RESET TO BASE SMILES` button to clear the input window.

## Example
 
See [Using the JSME widget](../examples/JSME_widget.ipynb).