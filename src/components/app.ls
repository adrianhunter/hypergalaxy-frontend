m = require \mithril

Footer = require \./footer
Header = require \./header

require 'polythene/layout/theme/theme'
require 'polythene/font-roboto/theme'

utils = require '../misc/utils'

App = {}

App.controller = ->
    currentRoute = utils.getCurrentRoute!
    App.vm?.init?!
    
    currentRoute: m.prop(currentRoute)
    
App.view = (ctrl, opts)~>
    if opts?.tag is 'div'
        if App.vm.currentTap?.id isnt opts.attrs?.id
            App.vm.addTap opts
    m '.app screen layout vertical',
        Header
        m '.content', App.vm.taps?!map (tap)->
            m "##{tap.attrs?.id}-tap ",
                class: "#{if App.vm.showTap! isnt tap.attrs.id then 'hidden' } tap-view",
                config:configureTap
            ,tap
        Footer
       
App.vm =
    taps: m.prop [] 
    init: ->
    showTap: m.prop!
    tapElements: {}
    addTapElement: (el)->
        App.vm.currentTap?.classList.add 'hidden'
    currentTap: null
    addTap:(newTap) ->
        currentTaps = @taps!
        tabAlreayExists = false
        for tab in currentTaps
            if tab.attrs?.id is newTap.attrs?.id
                tabAlreayExists = true
        if !tabAlreayExists
            currentTaps.push newTap
            @taps currentTaps
        @showTap newTap.attrs.id

configureTap = (el, isInit, context, foo)->
    context.retain = true
    if !isInit

        if el.id isnt App.vm.currentTap?.id
            App.vm.addTapElement el
    if el.id is App.vm.currentTap?.id
         App.vm.currentTap = el

    
    
window.App = App
module.exports = App