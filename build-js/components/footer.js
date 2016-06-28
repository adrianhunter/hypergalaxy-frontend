// Generated by LiveScript 1.5.0
var m, tabs, icons, noTapDelay, utils, routes, iconButtons, Footer, configureFooter;
m = require('mithril');
tabs = require('polythene/tabs/tabs');
icons = require('../icons');
noTapDelay = require('polythene/common/no-tap-delay');
utils = require('../misc/utils');
routes = require('../routes');
iconButtons = routes.map(function(route){
  if (route.icon) {
    route.icon = {
      msvg: icons[route.icon]
    };
  }
  return route;
});
Footer = {};
Footer.controller = function(){
  var tabIndex;
  tabIndex = utils.getCurrentRouteIndex();
  return {
    currentTab: m.prop(tabIndex)
  };
};
Footer.view = function(ctrl){
  return m('.footer', {
    config: configureFooter
  }, [m.component(tabs, {
    buttons: iconButtons,
    selectedTab: ctrl.currentTab(),
    autofit: true,
    menu: true,
    hideIndicator: true
  })]);
};
configureFooter = function(el, isInit, context){
  if (isInit) {
    return;
  }
  return context.retain = true;
};
module.exports = Footer;