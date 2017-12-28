// identifies insecure patterns in the models
const printMsgTxt = require('../helpers/printMsgTxt.js')

const list = {
  s0: {
    concept: 'device',
    layer: 'perception',
    suggestion: 'devices in the perception layer require physical security.'
  },
  s1: {
    concept: 'network connection',
    description: 'wireless',
    suggestion:
      'wireless connections are subject to information disclosure attacks. Use encrypted protocols.'
  }
}

module.exports = function suggestion (cy) {
  cy.elements().addClass('faded')

  cy.nodes().map(node => {
    let nd = node.data().asto
    if (nd.concept === list.s0.concept && nd.layer === list.s0.layer) {
      node.removeClass('faded')
      node.addClass('attention')
      printMsgTxt(`${node.data().id}: ${list.s0.suggestion}`)
    }

    if (
      nd.concept === list.s1.concept &&
      nd.description === list.s1.description
    ) {
      node.removeClass('faded')
      node.addClass('attention')
      printMsgTxt(`${node.data().id}: ${list.s1.suggestion}`)
    }
  })
}
