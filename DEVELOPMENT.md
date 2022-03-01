<br/><br/>

<div align="center">
    <img width="300px" src="./logo.svg"/>
</div>

<br/><br/>

# Trident Chemwidgets Development Guide

![License](https://img.shields.io/badge/license-BSD--3-lightgrey?style=for-the-badge)
![Version](https://img.shields.io/badge/version-0.1.0-blue?style=for-the-badge)

## Contributing

When contributing to this repository, please first discuss the change you wish to make via [issue](https://github.com/tridentbio/trident-chemwidgets/issues), email, or any other method with the owners of this repository before making a change.

Please note we have a code of conduct, please follow it in all your interactions with the project. All contributions that follow this code of conduct are welcome and encouraged.

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the `README.md` with details for installation, changes in the features, changes to the interface, this include new environment variables, useful file locations and new parameters.
3. Increase the version numbers in any example files and the `README.md` to the new version that this Pull Request would represent. The versioning scheme used in this project is the [Semantic Versioning](https://semver.org/).
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

## Git Pattern

Note that the project adopts the gitflow standard for its branches. New features must start with `feature/feature_name` while hotfixes must start with `hotfix/hotfix_name`. All features must be built from the develop branch, which contains updates. After the updates accumulate, a release is then created to merge into the master branch.

It's worth remembering that the commits follow the Conventional Commits pattern to keep an easy read and a pattern between them, it's normal that old commits don't necessarily follow this pattern, pull requests that don't use will not necessarily be refused, it's just a strong indication for use.

## Development Guidelines

This package is developed on top of React and, as such, is organized by components. You can find the components in the `/src/components` directory.

Each widget should be built using the following conventions:

1. Inside the `src/widgets` directory create a new directory for the new widget (the new directory must be created following the camelCase pattern, e.g. `lineplot => linePlot`).
2. Inside new widget directory create:
- `{WidgetName}Model.ts` - Contains information about the widget state and initial states.
- `{WidgetName}Widget.tsx`- Contains the entire html/view part of the widget. Here we create a standard react component and export it using withModelContext.
- `{WidgetName}View.ts` - Contains the view for Python to render in the notebook/lab. This file is responsible for assembling the component.
- `index.ts` file to export all 3 structures by default: Model, ModelState, and View.

To add an external script, use the following snippet:

```javascript
const script = document.createElement('script');
script.src = 'src_url';
document.head.appendChild(script);
```

Since we don't have a `public/index.html`, this is the only way to embed external scripts. Ideally it's better to install via npm when possible.

## Development Installation

Create a dev environment:
```bash
$ conda create -n trident_chemwidgets-dev -c conda-forge nodejs yarn python jupyterlab
$ conda activate trident_chemwidgets-dev
```

Install the python package. This will also build the TS package.
```bash
$ pip install -e ".[test, examples]"
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
$ yarn run watch
# Run JupyterLab in another terminal
$ jupyter lab
```

After a change wait for the build to finish and then refresh your browser and the changes should take effect.

#### Python:

If you make a change to the python code then you will need to restart the notebook kernel to have it take effect.
