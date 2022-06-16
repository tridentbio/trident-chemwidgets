# Trident Chemwidgets

The Trident Chemwidgets package contains Jupyter-based interactive [widgets] that provide an interface to chemical datasets.
This package includes widgets for chemical input, data distribution analysis and splitting, and atom-level visualizations.
The video below gives an overview of the included functionality.

<div style='text-align: center;'>
    <video width="350" height="350" controls loop autoplay playsinline>
        <source src="_static/video/chemwidgets_demo.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</div>

## Quickstart

To get started with trident_chemwidgets, install with pip:

```
pip install trident-chemwidgets
```

or with conda:

```
conda install -c conda-forge trident-chemwidgets
```

Then, if using Jupyter Lab, you may need to run:

```
jupyter labextension install trident-chemwidgets
```

If the widgets still are not usable after simple installation, check out [Installation](./installing.md).

## Contents

```{toctree}
:caption: Getting started
:maxdepth: 2

introduction
installing
```

```{toctree}
:caption: Usage
:maxdepth: 2

widgets/index
examples/index
```

```{toctree}
:caption: Development
:maxdepth: 2

develop-install
```

```{toctree}
:caption: API
:maxdepth: 2

modules
```

% links

[widgets]: https://jupyter.org/widgets.html
[notebook]: https://jupyter-notebook.readthedocs.io/en/latest/
