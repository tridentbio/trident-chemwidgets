# Trident Chemwidgets

The Trident Chemwidgets (TCW) package provides a set of Jupyter widgets to improve data visibility in cheminformatics and molecular machine learning. You can read more about the importance of data visibility for these applications in our blog post [here](example.com).

## Installation

You can install Trident Chemwidgets using `pip`:

```bash
pip install trident-chemwidgets
```

If you are using Jupyter Notebook 5.2 or earlier, you may also need to enable
the nbextension:
```bash
jupyter nbextension enable --py [--sys-prefix|--user|--system] jsme_widget
```

## [Documentation](example.com)

Full documentation can be found on [Read the Docs](example.com).

## Usage

We suggest importing Trident Chemwidgets using the convention `tcw`, as shown below. 

```python
import trident_chemwidgets as tcw
```

### Input functions

#### JSME

To facilitate molecular input, TCW provides an interface to the [JSME Molecule Editor](https://jsme-editor.github.io/) with added functionality.

```python
editor = tcw.JSME()
editor
```

### Plotting functions

Understanding the distribution of your data is critical to many cheminformatic tasks. To this end, we supply a number of interactive plotting functions that allow you to display both the data and underlying molecular structures. You can even subset and save the data based on the property values for use in downstream analysis.

#### Histogram

For 1-dimensional datasets, TCW provides a histogram plot function:

```python
histogram = tcw.Histogram(data=data, smiles='smiles', x='mwt', x_label='Molecular Weight')
histogram
```

#### Scatter plot

For 2-dimensional datasets, TCW provides a scatter plot function:

```python
scatter = tcw.Histogram(data=data, smiles='smiles', x='mwt', y='logp', x_label='Molecular Weight', y_label='Log P')
```

### Output functions

#### Interactive molecule

To examine features at the atom level, TCW provides a function to plot a molecule and allow users to explore the atom-specific features:

```python
atoms_data = [
    {'Formal Charge': 0, 'Hybridization': 'SP3', 'Implicit Valence': 3},
    {'Formal Charge': 0, 'Hybridization': 'SP3', 'Implicit Valence': 2},
    {'Formal Charge': 0, 'Hybridization': 'SP3', 'Implicit Valence': 2},
    {'Formal Charge': 0, 'Hybridization': 'SP3', 'Implicit Valence': 2},
    {'Formal Charge': 0, 'Hybridization': 'SP3', 'Implicit Valence': 3}
]

mol = tcw.InteractiveMolecule('CCCCC', atoms_data=atoms_data)
mol
```

## About

Trident Chemwidgets is a product of Trident Bioscience. Trident Bioscience builds machine learning applications for the biotech and pharmaceutical industries. If you're interested in learning more, you can visit us at [trident.bio](https://www.trident.bio) or email us at [info@trident.bio](mailto:info@trident.bio).