# Installation

The simplest way to install Trident Chemwidgets is via pip:

```
pip install trident-chemwidgets
```

or via conda:

```
conda install -c conda-forge trident-chemwidgets
```

## JupyterLab activation

In most cases, the labextension should be autmatically installed and activated. You can
check if the `trident-chemwidgets` package is available by executing:

```
jupyter labextension list
```

The output of this command should include a line that states (depending on installed version number):

```
        trident-chemwidgets v0.1.1 enabled OK (python, trident_chemwidgets)
```

Note that `trident-chemwidgets` is listed as `enabled OK`.

If the labextesnion is not installed automatically, you can install it manually with:

```
jupyter labextension install trident-chemwidgets
```

## Notebook activation

If you installed via pip, and notebook version \< 5.3, you will also have to
install / configure the front-end extension as well. If you are using classic
notebook (as opposed to Jupyterlab), run:

```
jupyter nbextension install [--sys-prefix / --user / --system] --py trident-chemwidgets

jupyter nbextension enable [--sys-prefix / --user / --system] --py trident-chemwidgets
```

with the [appropriate flag].

## Installation issues

If you run into any problems installing or using Chemwidgets, please raise an issue on [GitHub](https://github.com/tridentbio/trident-chemwidgets/issues). We'll be happy to help or fix any bugs that arise.

% links

[appropriate flag]: https://jupyter-notebook.readthedocs.io/en/stable/extending/frontend_extensions.html#installing-and-enabling-extensions


### Common bugs on Windows:

#### `mkl-service`

If you receive a `UserWarning` regarding `mkl-service`, the recommended solution is to install the package through their own repository found at this link http://github.com/IntelPython/mkl-service.

You can choose between two options, installation through `pip`:

```
python -m pip install mkl-service
```

Or through conda:

```
conda install -c conda-forge mkl-service
```

Or:

```
conda install -c intel mkl-service
```