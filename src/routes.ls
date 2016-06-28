m = require \mithril

routes = [
  * label: 'Home'
    url:
        href: '/'
        config: m.route
    icon: 'icon/settings'
  * label: 'explore'
    url:
        href: '/explore'
        config: m.route
    icon: 'icon/explore'
  * label: 'market'
    name: 'market'
    url:
        href: '/market'
        config: m.route
    icon: 'icon/market'
  * label: 'Settings'
    url:
        href: '/settings'
        config: m.route
    icon: 'icon/settings'
  * label: 'Search'
    url:
        href: '/search'
        config: m.route
    icon: 'icon/search'
]


module.exports = routes