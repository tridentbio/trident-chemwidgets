# Histogram

```{eval-rst}
.. autoclass:: trident_chemwidgets.Histogram
   :members: selection
   :show-inheritance:
```

## Interaction features

![Histogram interface](../_static/img/Histogram.png)

### Selecting data
Once the widget renders, click and drag within the plot area to select a subset of the data.
The selected data points will change color to teal.

### Displaying selected structures
Once a subset of the data has been selected, you can then press the `SHOW STRUCTURES` button to display a gallery of the selected structures in the space to the right of the plot.

### Saving selected subset to `selection` property
You can save the current selection of data by clicking `SAVE SELECTION`.
This action will make current subset of the data available using the `selection` property of the widget.
To clear the current selection, click anywhere in the plot area.
Note that if you clicked `SAVE SELECTION`, the reference to those data points will be saved until it is overwritten by the `SAVE SELECTION` button being clicked for a new selection.

## Example
 
See [Using the Histogram widget](../examples/Histogram_widget.ipynb).
