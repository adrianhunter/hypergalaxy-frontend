routes = require \../routes
utils = {}
m = require 'mithril'


utils.getCurrentRoute = -> 
    foundRoute = {}
    routes.forEach (route)->
        if route.url.href is m.route!
            foundRoute := route
    foundRoute


utils.getCurrentRouteIndex = -> 
    index = 0
    routes.forEach (route, i)->
        if route.url.href is m.route!
            index := i
    index


module.exports = utils

