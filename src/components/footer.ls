m = require \mithril
tabs = require \polythene/tabs/tabs
icons = require \../icons
noTapDelay = require \polythene/common/no-tap-delay

utils = require \../misc/utils
routes = require '../routes'

iconButtons = routes.map (route)-> 
    route.icon = msvg: icons[route.icon] if route.icon
    route

const Footer = {}

Footer.controller = ->
    tabIndex = utils.getCurrentRouteIndex!
    
    currentTab: m.prop(tabIndex)


Footer.view = (ctrl)->
    m '.footer', config: configureFooter,[
        m.component tabs,
            buttons: iconButtons
            selectedTab: ctrl.currentTab!
            autofit: true
            menu:true
            hideIndicator: true
    ] 

configureFooter = (el,isInit, context)->
    if isInit 
        return
    context.retain = true

module.exports = Footer
