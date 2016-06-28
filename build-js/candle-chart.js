// Generated by LiveScript 1.5.0
var helpers;
helpers = Chart.helpers;
Chart.defaults.foo = {
  hover: {
    mode: 'label'
  },
  scales: {
    xAxes: [{
      type: 'category',
      categoryPercentage: 0.8,
      barPercentage: 0.9,
      gridLines: {
        offsetGridLines: true
      }
    }],
    yAxes: [{
      type: 'linear'
    }]
  }
};
Chart.controllers.foo = Chart.DatasetController.extend({
  dataElementType: Chart.elements.Rectangle,
  initialize: function(chart, datasetIndex){
    Chart.DatasetController.prototype.initialize.call(this, chart, datasetIndex);
    this.getMeta().bar = true;
  },
  getBarCount: function(){
    var me, barCount;
    me = this;
    barCount = 0;
    helpers.each(me.chart.data.datasets, function(dataset, datasetIndex){
      var meta;
      meta = me.chart.getDatasetMeta(datasetIndex);
      if (meta.bar && me.chart.isDatasetVisible(datasetIndex)) {
        ++barCount;
      }
    }, me);
    return barCount;
  },
  update: function(reset){
    var me;
    me = this;
    helpers.each(me.getMeta().data, function(rectangle, index){
      me.updateElement(rectangle, index, reset);
    }, me);
  },
  updateElement: function(rectangle, index, reset){
    var me, meta, xScale, yScale, scaleBase, rectangleElementOptions, custom, dataset;
    me = this;
    meta = me.getMeta();
    xScale = me.getScaleForId(meta.xAxisID);
    yScale = me.getScaleForId(meta.yAxisID);
    yScale.min = yScale.min;
    scaleBase = yScale.getBasePixel();
    rectangleElementOptions = me.chart.options.elements.rectangle;
    custom = rectangle.custom || {};
    dataset = me.getDataset();
    helpers.extend(rectangle, {
      _xScale: xScale,
      _yScale: yScale,
      _datasetIndex: me.index,
      _index: index,
      _model: {
        x: me.calculateBarX(index, me.index),
        y: reset
          ? scaleBase
          : me.calculateBarY(index, me.index),
        label: me.chart.data.labels[index],
        datasetLabel: dataset.label,
        base: reset
          ? scaleBase
          : me.calculateBarBase(me.index, index),
        width: me.calculateBarWidth(index),
        backgroundColor: custom.backgroundColor
          ? custom.backgroundColor
          : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor),
        borderSkipped: custom.borderSkipped
          ? custom.borderSkipped
          : rectangleElementOptions.borderSkipped,
        borderColor: custom.borderColor
          ? custom.borderColor
          : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor),
        borderWidth: custom.borderWidth
          ? custom.borderWidth
          : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth)
      }
    });
    rectangle.pivot();
  },
  calculateBarBase: function(datasetIndex, index){
    var me, meta, yScale, value, base;
    me = this;
    meta = me.getMeta();
    yScale = me.getScaleForId(meta.yAxisID);
    value = me.getDataset().data[index];
    base = 0;
    console.log(value);
    return yScale.getPixelForValue(value[1]);
  },
  getRuler: function(index){
    var me, meta, xScale, datasetCount, tickWidth, categoryWidth, categorySpacing, fullBarWidth, perc, barWidth, barSpacing;
    me = this;
    meta = me.getMeta();
    xScale = me.getScaleForId(meta.xAxisID);
    datasetCount = me.getBarCount();
    tickWidth = undefined;
    if (xScale.options.type === 'category') {
      tickWidth = xScale.getPixelForTick(index + 1) - xScale.getPixelForTick(index);
    } else {
      tickWidth = xScale.width / xScale.ticks.length;
    }
    categoryWidth = tickWidth * xScale.options.categoryPercentage;
    categorySpacing = (tickWidth - tickWidth * xScale.options.categoryPercentage) / 2;
    fullBarWidth = categoryWidth / datasetCount;
    if (xScale.ticks.length !== me.chart.data.labels.length) {
      perc = xScale.ticks.length / me.chart.data.labels.length;
      fullBarWidth = fullBarWidth * perc;
    }
    barWidth = fullBarWidth * xScale.options.barPercentage;
    barSpacing = fullBarWidth - fullBarWidth * xScale.options.barPercentage;
    return {
      datasetCount: datasetCount,
      tickWidth: tickWidth,
      categoryWidth: categoryWidth,
      categorySpacing: categorySpacing,
      fullBarWidth: fullBarWidth,
      barWidth: barWidth,
      barSpacing: barSpacing
    };
  },
  calculateBarWidth: function(index){
    var xScale, ruler;
    xScale = this.getScaleForId(this.getMeta().xAxisID);
    ruler = this.getRuler(index);
    if (xScale.options.stacked) {
      return ruler.categoryWidth;
    } else {
      return ruler.barWidth;
    }
  },
  getBarIndex: function(datasetIndex){
    var barIndex, meta, j;
    barIndex = 0;
    meta = undefined;
    j = undefined;
    j = 0;
    while (j < datasetIndex) {
      meta = this.chart.getDatasetMeta(j);
      if (meta.bar && this.chart.isDatasetVisible(j)) {
        ++barIndex;
      }
      ++j;
    }
    return barIndex;
  },
  calculateBarX: function(index, datasetIndex){
    var me, meta, xScale, barIndex, ruler, leftTick;
    me = this;
    meta = me.getMeta();
    xScale = me.getScaleForId(meta.xAxisID);
    barIndex = me.getBarIndex(datasetIndex);
    ruler = me.getRuler(index);
    leftTick = xScale.getPixelForValue(null, index, datasetIndex, me.chart.isCombo);
    leftTick -= me.chart.isCombo ? ruler.tickWidth / 2 : 0;
    return leftTick + ruler.barWidth / 2 + ruler.categorySpacing + ruler.barWidth * barIndex + ruler.barSpacing / 2 + ruler.barSpacing * barIndex;
  },
  calculateBarY: function(index, datasetIndex){
    var me, meta, yScale, value;
    me = this;
    meta = me.getMeta();
    yScale = me.getScaleForId(meta.yAxisID);
    value = me.getDataset().data[index];
    return yScale.getPixelForValue(value[3]);
  },
  draw: function(ease){
    var me, easingDecimal;
    me = this;
    easingDecimal = ease || 1;
    helpers.each(me.getMeta().data, function(rectangle, index){
      var d;
      d = me.getDataset().data[index];
      if (d !== null && d !== undefined && !isNaN(d)) {
        rectangle.transition(easingDecimal).draw();
      }
    }, me);
  },
  setHoverStyle: function(rectangle){
    var dataset, index, custom, model;
    dataset = this.chart.data.datasets[rectangle._datasetIndex];
    index = rectangle._index;
    custom = rectangle.custom || {};
    model = rectangle._model;
    model.backgroundColor = custom.hoverBackgroundColor
      ? custom.hoverBackgroundColor
      : helpers.getValueAtIndexOrDefault(dataset.hoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
    model.borderColor = custom.hoverBorderColor
      ? custom.hoverBorderColor
      : helpers.getValueAtIndexOrDefault(dataset.hoverBorderColor, index, helpers.getHoverColor(model.borderColor));
    model.borderWidth = custom.hoverBorderWidth
      ? custom.hoverBorderWidth
      : helpers.getValueAtIndexOrDefault(dataset.hoverBorderWidth, index, model.borderWidth);
  },
  removeHoverStyle: function(rectangle){
    var dataset, index, custom, model, rectangleElementOptions;
    dataset = this.chart.data.datasets[rectangle._datasetIndex];
    index = rectangle._index;
    custom = rectangle.custom || {};
    model = rectangle._model;
    rectangleElementOptions = this.chart.options.elements.rectangle;
    model.backgroundColor = custom.backgroundColor
      ? custom.backgroundColor
      : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor);
    model.borderColor = custom.borderColor
      ? custom.borderColor
      : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor);
    model.borderWidth = custom.borderWidth
      ? custom.borderWidth
      : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth);
  }
});