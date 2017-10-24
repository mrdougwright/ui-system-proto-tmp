var exp = module.exports = {}

exp.map = function map (view, state, prop) {
  var inserted = {}
  var container = document.createElement('div')
  state.on(prop, function () { update() })

  function update () {
    var stateData = state[prop]
    for (var i = 0; i < stateData.length; ++i) {
      var elem = stateData[i]
      if (!elem.hasOwnProperty('id')) {
        throw new TypeError('Each object in the array must have an "id" property')
      }
      var existing = inserted[elem.id]
      if (existing) {
        if (container.children[i] !== existing) {
          container.insertBefore(existing, container.children[i])
        }
      } else {
        var newNode = view(elem, i)
        newNode.dataset['uzu_child_id'] = elem.id
        inserted[elem.id] = newNode
        if (container.children[i]) {
          container.insertBefore(newNode, children[i])
        } else {
          container.appendChild(newNode)
        }
      }
    }
    for (var i = stateData.length; i < container.children.length; ++i) {
      var id = container.children[i].dataset['uzu_child_id']
      delete inserted[id]
      container.removeChild(container.children[i])
    }
  }
  return container
}

//
//  const app = state({page: 'login'})
//  app.on('page', p => setURL)
//  state
//
// const router = dom.route({
//   '/login': loginView,
//   '/dashboard': dashboardView
// })
// router.go('/login')
// router.dom // -> loginView elm
//
// app.whenEqual('login', true, t => {
//   div.appendChild(login)
// })
// app.whenEqual('login', false, t => {
//   div.removeChild(login)
// })
//
exp.route = function route (routes) {
}