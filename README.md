<br/><br/>

<div align="center">
    <img width="300px" src="./logo.svg"/>
</div>

<br/><br/>

<h1 align="center">Trident Chemwidgets</h1>

![License](https://img.shields.io/badge/license-BSD--3-lightgrey?style=for-the-badge)
![Version](https://img.shields.io/badge/version-0.1.0-blue?style=for-the-badge)
![PRs](https://img.shields.io/badge/PRs-welcome-green?style=for-the-badge)

<h4 align="center">
🚧 Under Development 🚧
</h4>

<p align="center">

The Trident Chemwidgets (TCW) package provides a set of Jupyter widgets to improve data visibility in cheminformatics and molecular machine learning. You can read more about the importance of data visibility for these applications in our blog post [here](example.com).

</p>

## Summary

- [About](#About)
- [Installation](#Installation)
- [Documentation](#Documentation)
- [Usage](#Usage)
<!-- - [Tests](#Tests) -->
<!-- - [Roadmap](#Roadmap) -->


## About

Trident Chemwidgets is a product of Trident Bioscience. Trident Bioscience builds machine learning applications for the biotech and pharmaceutical industries. If you're interested in learning more, you can visit us at [trident.bio](https://www.trident.bio) or email us at [info@trident.bio](mailto:info@trident.bio).

## Installation

---
### ⚠️ PRE-RELEASE NOTICE ⚠️

This package is currently pre-release. For the time being, please use the command to install locally. Once the package is released publicly on PyPI, these installation instructions will be removed.

### Requirements

- NodeJS
- Yarn

### Example of environment

Here is an example environment created using Conda to cover all the prerequisites. Please note that it is not the only way to prepare an environment, there is the possibility of installing the software globally on your local machine, but it is advisable to create an isolated environment.

```bash
$ conda create -n trident_chemwidgets-dev -c conda-forge nodejs yarn python jupyterlab
$ conda activate trident_chemwidgets-dev
```
And then run the following statement to install the python package:
```bash
pip install git+https://github.com/tridentbio/trident-chemwidgets.git
```

If you are using Jupyter Notebook 5.2 or earlier, you may also need to enable
the nbextension:
```bash
jupyter nbextension enable --py [--sys-prefix|--user|--system] trident-chemwidgets
```

<!-- You can install Trident Chemwidgets using `pip`:

```bash
pip install trident-chemwidgets
```

If you are using Jupyter Notebook 5.2 or earlier, you may also need to enable
the nbextension:
```bash
jupyter nbextension enable --py [--sys-prefix|--user|--system] trident-chemwidgets
``` -->

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
scatter = tcw.Scatter(data=data, smiles='smiles', x='mwt', y='logp', x_label='Molecular Weight', y_label='Log P')
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
