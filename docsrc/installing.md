# Installation

The simplest way to install Trident Chemwidgets is via pip:

```
pip install trident-chemwidgets
```

or via conda:

```
conda install -c conda-forge trident-chemwidgets
```

If you installed via pip, and notebook version \< 5.3, you will also have to
install / configure the front-end extension as well. If you are using classic
notebook (as opposed to Jupyterlab), run:

```
jupyter nbextension install [--sys-prefix / --user / --system] --py trident-chemwidgets

jupyter nbextension enable [--sys-prefix / --user / --system] --py trident-chemwidgets
```

with the [appropriate flag]. If you are using Jupyterlab, install the extension
with:

```
jupyter labextension install trident-chemwidgets
```

If you are installing using conda, these commands should be unnecessary, but if
you need to run them the commands should be the same (just make sure you choose the
`--sys-prefix` flag).

## Installation issues

If you run into any problems installing or using Chemwidgets, please raise an issue on [GitHub](https://github.com/tridentbio/trident-chemwidgets/issues). We'll be happy to help or fix any bugs that arise.

% links

[appropriate flag]: https://jupyter-notebook.readthedocs.io/en/stable/extending/frontend_extensions.html#installing-and-enabling-extensions


### Common bugs on Windows:

#### `mkl-service`

If you receive a `UserWarning` talking about mkl-service the most recommended solution to resolve is to install it through their own repository found at this link http://github.com/IntelPython/mkl-service.

In it, the user can choose between two options, the first is to install through pip:
```
python -m pip install mkl-service
```

The second and most recommended option is for those who use conda as an environment manager. You can install it using the following command:
```
conda install -c conda-forge mkl-service
```
Or:
```
conda install -c intel mkl-service
```