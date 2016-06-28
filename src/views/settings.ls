m = require \mithril

App = require \../components/app

const Settings = {}

Settings.view = ->
    m.component App,
        m '#settings-view', 'settings'
        



module.exports = Settings
