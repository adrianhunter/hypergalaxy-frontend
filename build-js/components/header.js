// Generated by LiveScript 1.5.0
var m, iconBtn, toolbar, icons, SearchComp, routes, utils, btn, toolbarRow, Header, Toolbar;
m = require('mithril');
iconBtn = require('polythene/icon-button/icon-button');
toolbar = require('polythene/toolbar/toolbar');
icons = require('../icons');
SearchComp = require('./search');
routes = require('../routes');
utils = require('../misc/utils');
btn = function(icon){
  return m.component(iconBtn, {
    icon: {
      msvg: icon
    }
  });
};
toolbarRow = function(arg$){
  var route;
  route = arg$.route;
  return [btn(icons['icon/menu']), m('span.flex', route.label)];
};
Header = {};
Toolbar = {};
Toolbar.view = function(ctr, arg$){
  var route;
  route = (arg$ != null
    ? arg$
    : {}).route;
  return m.component(toolbar, {
    content: toolbarRow({
      route: route
    })
  });
};
Header.view = function(){
  var route;
  route = utils.getCurrentRoute();
  return m(Toolbar, {
    route: route
  });
};
module.exports = Header;