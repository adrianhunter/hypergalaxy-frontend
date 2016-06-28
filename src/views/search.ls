m = require \mithril

App = require \../components/app
SearchComp = require \../components/search


const Settings = {}

Settings.view = ->
    m.component App,
        m '#settings-view', [
            SearchComp
        ]
        



module.exports = Settings
