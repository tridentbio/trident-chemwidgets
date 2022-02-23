
# Trident Chemwidgets Development Guide

[![Build Status](https://travis-ci.org/tridentbio/trident-chemwidgets.svg?branch=master)](https://travis-ci.org/tridentbio/trident_chemwidgets)
[![codecov](https://codecov.io/gh/tridentbio/trident-chemwidgets/branch/master/graph/badge.svg)](https://codecov.io/gh/tridentbio/trident-chemwidgets)

## Development Guidelines

This package is developed on top of React and, as such, is organized by components. You can find the components in the `/src/components` directory.

Each widget should be built using the following conventions:

1. Inside the `src/widgets` directory create a new directory for the new widget
2. Inside new widget directory create: 
- `{WidgetName}Model.ts` - Contains information about the widget state and initial states.
- `{WidgetName}Widget.tsx`- Contains the entire html/view part of the widget. Here we create a standard react component and export it using withModelContext.
- `{WidgetName}View.ts` - Contains the view for Python to render in the notebook/lab. This file is responsible for assembling the component.
- `index.ts` file to export all 3 structures by default: Model, ModelState, and View.

To add a script, use the following snippet:

```javascript
const script = document.createElement('script');
script.src = src;
document.head.appendChild(script);
```

Since we don't have a `public/index.html`, this is the only way to embed external scripts. Ideally it's better to install via npm when possible.

## Development Installation

Create a dev environment:
```bash
conda create -n trident_chemwidgets-dev -c conda-forge nodejs yarn python jupyterlab
conda activate trident_chemwidgets-dev
```

Install the python. This will also build the TS package.
```bash
pip install -e ".[test, examples]"
```

When developing your extensions, you need to manually enable your extensions with the
notebook / lab frontend. For lab, this is done by the command:

```
jupyter labextension develop --overwrite .
yarn run build
```

For classic notebook, you need to run:

```
jupyter nbextension install --sys-prefix --symlink --overwrite --py trident_chemwidgets
jupyter nbextension enable --sys-prefix --py trident_chemwidgets
```

Note that the `--symlink` flag doesn't work on Windows, so you will here have to run
the `install` command every time that you rebuild your extension. For certain installations
you might also need another flag instead of `--sys-prefix`, but we won't cover the meaning
of those flags here.

### How to see your changes
#### Typescript:
If you use JupyterLab to develop then you can watch the source directory and run JupyterLab at the same time in different
terminals to watch for changes in the extension's source and automatically rebuild the widget.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
yarn run watch
# Run JupyterLab in another terminal
jupyter lab
```

After a change wait for the build to finish and then refresh your browser and the changes should take effect.

#### Python:
If you make a change to the python code then you will need to restart the notebook kernel to have it take effect.
