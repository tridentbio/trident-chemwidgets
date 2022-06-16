#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Trident Bioscience, Inc.
# Distributed under the terms of the Modified BSD License.

import os
from os.path import join as pjoin, isdir
import sys
from setuptools import setup
from jupyter_core.paths import jupyter_config_dir
import sysconfig
from jupyter_packaging import get_data_files

data_files_spec = [
    ('share/jupyter/nbextensions/trident_chemwidgets',
     'trident_chemwidgets/nbextension', '**'),
    ('share/jupyter/labextensions/trident-chemwidgets',
     'trident_chemwidgets/labextension', '**'),
    ('share/jupyter/labextensions/trident-chemwidgets', '.', 'install.json'),
    ('etc/jupyter/nbconfig/notebook.d', '.', 'trident_chemwidgets.json')
]

setup_args = dict(data_files=get_data_files(data_files_spec))


def create_local_assets_provider():
    """Method that create the assets folder for the external scripts
    and add the path for this folder in extra_static_paths in the config
    files for notebooks and jupyter lab. 
    """
    PACKAGE_DIR = sysconfig.get_paths()['purelib']
    JS_DIR = pjoin(PACKAGE_DIR, 'trident_chemwidgets', 'js')
    CONFIG_DIR = (
        pjoin(sys.prefix, 'etc', 'jupyter')
        if isdir(pjoin(sys.prefix, 'etc', 'jupyter'))
        else jupyter_config_dir()
    )

    # Create a jupyter lab config file
    lab_config_file = os.path.join(CONFIG_DIR, 'jupyter_lab_config.py')
    line = f"\nc.ServerApp.extra_static_paths.append(r'{JS_DIR}')"
    if os.path.exists(lab_config_file):
        with open(lab_config_file, 'r') as file:
            if line not in file.readlines():
                with open(lab_config_file, 'a') as file:
                    file.write(f"{line}")
    else:
        with open(os.path.join(CONFIG_DIR, 'jupyter_lab_config.py'), 'a') as file:
            file.write(f"{line}")

    # Create a jupyter notebook config file
    nb_config_file = os.path.join(CONFIG_DIR, 'jupyter_notebook_config.py')
    line = f"\nc.NotebookApp.extra_static_paths.append(r'{JS_DIR}')"
    if os.path.exists(nb_config_file):
        with open(nb_config_file, 'r') as file:
            if line not in file.readlines():
                with open(nb_config_file, 'a') as file:
                    file.write(f"{line}")
    else:
        with open(nb_config_file, 'a') as file:
            file.write(f"{line}")


if __name__ == '__main__':
    setup(**setup_args)
    create_local_assets_provider()
