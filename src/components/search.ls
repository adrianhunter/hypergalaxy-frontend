

m = require \mithril

search = require \polythene/search/search

iconButton = require 'polythene/icon-button/icon-button'

iconSearch = require 'mmsvg/google/msvg/action/search'
iconBack = require 'mmsvg/google/msvg/navigation/arrow-back'
iconClear = require 'mmsvg/google/msvg/content/clear'
shadow = require 'polythene/shadow/shadow'

const btnSearch = m.component iconButton,
    icon:
        msvg: iconSearch
const btnDismiss = m.component iconButton, 
    icon:
        msvg: iconBack
const btnClear = (ctrl) -> 
    m.component iconButton, 
        icon:
            msvg: iconClear
        events: 
            onclick: !-> 
                ctrl.query!value = ''
                m.redraw!
                ctrl.query!el.focus!

const Search = {}

Search.controller = ->
    query: m.prop!

Search.view = (ctrl)->
    m '.search-component', m.component search,
        type: 'fullwidth'
        textfield: 
            label: 'Search'
            value: -> ctrl.query()?.value || ''
            getState: ctrl.query
        buttons: 
            none: 
                before: btnSearch
            focus: 
                before: btnSearch
            focus_dirty: 
                before: btnDismiss
                after: btnClear ctrl
            dirty: 
                before: btnDismiss
        before: m.component shadow


module.exports = Search