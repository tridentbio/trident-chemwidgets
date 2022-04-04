# Developer install

To install a developer version of trident_chemwidgets, you will first need to clone
the repository:

```
git clone https://github.com/tridentbio/trident-chemwidgets
cd trident-chemwidgets
```

Next, install it with a development (ediatbel) installation using pip:

```
pip install -e .
```

If you are planning on working on the JS/frontend code, you should also perform
a link installation of the extension:

```
jupyter nbextension install [--sys-prefix / --user / --system] --symlink --py trident_chemwidgets

jupyter nbextension enable [--sys-prefix / --user / --system] --py trident_chemwidgets
```

with the [appropriate flag]. Or, if you are using Jupyterlab:

```
jupyter labextension install .
```

% links

[appropriate flag]: https://jupyter-notebook.readthedocs.io/en/stable/extending/frontend_extensions.html#installing-and-enabling-extensions
