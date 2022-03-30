#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.

from __future__ import print_function
from glob import glob
import os
from os.path import join as pjoin, expanduser
from setuptools import setup, find_packages
from jupyter_packaging import (
    create_cmdclass,
    install_npm,
    ensure_targets,
    combine_commands,
    get_version,
    skip_if_exists
)
from jupyter_core.paths import jupyter_config_dir
import shutil

HERE = os.path.dirname(os.path.abspath(__file__))


def create_local_assets_provider():
    """Method that create the assets folder for the external scripts
    and add the path for this folder in extra_static_paths in the config
    files for notebooks and jupyter lab. 
    """
    CONFIG_DIR = jupyter_config_dir()
    ASSETS_DIR = os.path.join(expanduser('~'), '.trident_chemwidgets/')

    # Copy assets to the user .trident-chemwidgets
    shutil.copytree(
        os.path.join(HERE, 'js/'),
        ASSETS_DIR,
        dirs_exist_ok=True
    )

    # Convert the path for unix path convertion since
    # the windows use the backslashes 
    static_path = ASSETS_DIR.replace('\\', '/')

    # Create a jupyter lab config file
    with open(os.path.join(CONFIG_DIR, 'jupyter_lab_config.py'), 'w') as file:
        file.write(f"c.ServerApp.extra_static_paths = ['{static_path}']")

    # Create a jupyter notebook config file
    with open(os.path.join(CONFIG_DIR, 'jupyter_notebook_config.py'), 'w') as file:
        file.write(f"c.NotebookApp.extra_static_paths = ['{static_path}']")

create_local_assets_provider()

# The name of the project
name = 'trident_chemwidgets'
# Get the version
version = get_version(pjoin(HERE, name, '_version.py'))

# Representative files that should exist after a successful build
jstargets = [
    pjoin(HERE, name, 'nbextension', 'index.js'),
    pjoin(HERE, name, 'labextension', 'package.json'),
]

package_data_spec = {
    name: [
        'nbextension/**js*',
        'labextension/**'
    ]
}

data_files_spec = [
    ('share/jupyter/nbextensions/trident_chemwidgets', 'trident_chemwidgets/nbextension', '**'),
    ('share/jupyter/labextensions/trident-chemwidgets', 'trident_chemwidgets/labextension', '**'),
    ('share/jupyter/labextensions/trident-chemwidgets', '.', 'install.json'),
    ('etc/jupyter/nbconfig/notebook.d', '.', 'trident_chemwidgets.json'),
]


cmdclass = create_cmdclass('jsdeps', package_data_spec=package_data_spec,
    data_files_spec=data_files_spec)
npm_install = combine_commands(
    install_npm(HERE, build_cmd='build:prod'),
    ensure_targets(jstargets),
)
cmdclass['jsdeps'] = skip_if_exists(jstargets, npm_install)

setup_args = dict(
    name            = name,
    description     = 'Chemical widget set to work in jupyter notebook and lab.',
    version         = version,
    scripts         = glob(pjoin('scripts', '*')),
    cmdclass        = cmdclass,
    packages        = find_packages(),
    author          = 'Trident Bioscience, Inc.',
    author_email    = 'info@trident.bio',
    url             = 'https://github.com/tridentbio/trident-chemwidgets',
    license         = 'BSD',
    platforms       = "Linux, Mac OS X, Windows",
    keywords        = ['Jupyter', 'Widgets', 'IPython'],
    classifiers     = [
        'Intended Audience :: Developers',
        'Intended Audience :: Science/Research',
        'License :: OSI Approved :: BSD License',
        'Programming Language :: Python',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'Framework :: Jupyter',
    ],
    include_package_data = True,
    python_requires=">=3.6",
    install_requires = [
        'ipywidgets>=7.0.0',
    ],
    extras_require = {
        'test': [
            'pytest>=4.6',
            'pytest-cov',
            'nbval',
        ],
        'examples': [
            # Any requirements for the examples to run
        ],
        'docs': [
            'jupyter_sphinx',
            'nbsphinx',
            'nbsphinx-link',
            'pytest_check_links',
            'pypandoc',
            'recommonmark',
            'sphinx>=1.5',
            'sphinx-autobuild',
            'sphinx_rtd_theme',
            'furo',
        ],
    },
    entry_points = {
    },
)

if __name__ == '__main__':
    setup(**setup_args)
