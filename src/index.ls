noTapDelay = require \polythene/common/no-tap-delay

m = require \mithril
utils = require \./misc/utils
routes = require \./routes
window.routes = routes
moment = require \moment
Home = require \./views/home
Settings = require \./views/settings
Search = require \./views/search
Market = require \./views/market
window.moment = moment
window.m = m
window.utils = utils

m.route.mode = 'hash'

m.route document.body, "/",
    "/": Home
    "/market": Market
    "/settings": Settings
    "/search": Search