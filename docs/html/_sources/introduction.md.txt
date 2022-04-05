# Introduction

In cheminformatics, data visibility is paramount.
Unfortunately, the data science and machine learning tools currently available do not support chemical datasets well out of the box.
Standard plotting tools like Matplotlib, Seaborn, and Altair are great at showing data distributions, but come up short when connecting that data back to the underlying molecular structures.
Likewise, CSV inputs containing SMILES strings can be too cumbersome to test out one or two interesting corner-case molecules for your custom built ML model.

We created Trident Chemwidgets because were frustrated with the process of working with Chemical data in Python, and more specifically Jupyter.
Without the ability to quickly input interesting chemical structures and understand the patterns in chemistry space that were underlying our data, our ML model development workflow was more bloated and slower than it needed to be.

## Inputs

We wanted it to be as easy as possible to input new structures into a notebook without having to open an external program, draw the structures, export them to to SMILES, and input import them into your notebook.
In Chemwidgets, we provide an interface to the JSME molecule editor with a number of enhancements to make molecular input faster and easier.

- Check out the [JSME widget](./widgets/JSME.md)

## Data visualization

We're starting with two of the most common visualizations: histograms and scatter plots.
We provide widgets for each of these standard visualizations, but we couple them to interactive selection functionality that makes it easy for the user to subset their data and examine the molecular structures underpinning them.

- Check out the [Historgram widget](./widgets/Histogram.md)
- Check out the [Scatter widget](./widgets/Scatter.md)

## Outputs

Model interoperability is a growing concern in machine learning communities, but especially when it comes to models designed to create new drugs. We provide a widget to visualize a molecular structure overlayed with any form of data at the atom level. Our flexible interface allows the user to visualize and inspect attention scores, SHAP values, or almost any other per-atom model interoperability metric. 

- Check out the [InteractiveMolecule widget](./widgets/InteractiveMolecule.md)