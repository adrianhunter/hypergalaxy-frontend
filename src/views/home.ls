m = require \mithril

App = require \../components/app

const Home = {}

Home.view = ->
    m.component App, 
        m '#home-view', 'nice!'

module.exports = Home
