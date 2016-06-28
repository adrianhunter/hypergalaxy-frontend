m = require \mithril
iconBtn = require \polythene/icon-button/icon-button
toolbar = require \polythene/toolbar/toolbar
icons = require \../icons
SearchComp = require \./search
routes = require \../routes
utils = require \../misc/utils

btn = (icon)-> 
    m.component iconBtn,
        icon: 
            msvg: icon
    

toolbarRow = ({route})-> 
    [
        btn(icons['icon/menu'])
        m 'span.flex', route.label
    ]
    

const Header = {}
const Toolbar = {}

Toolbar.view = (ctr, {route} = {})->
    m.component toolbar,
        content: toolbarRow {route}

Header.view = ->
    route = utils.getCurrentRoute!
    m Toolbar, {route}


module.exports = Header