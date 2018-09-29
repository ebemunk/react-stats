const _ = require('lodash')

const getName = node => {
  switch (node.name.type) {
    case 'JSXIdentifier':
      return node.name.name
    case 'JSXMemberExpression':
      return node.name.property.name
    default:
      console.log('getName couldnt handle', node)
      return
  }
}

const getValue = value => {
  if (!value) return value
  switch (value.type) {
    case 'RegExpLiteral':
    case 'NullLiteral':
    case 'StringLiteral':
    case 'BooleanLiteral':
    case 'NumericLiteral':
      return value.value
    case 'JSXExpressionContainer':
      return value.expression.type
    default:
      console.log('getValue couldnt handle', value.type)
      return
  }
}

const getAttribute = attr => {
  switch (attr.type) {
    case 'JSXAttribute':
      return {
        name: attr.name.name,
        value: getValue(attr.value),
      }
    case 'JSXSpreadAttribute':
      return {
        name: 'spread',
        value: attr.argument.name,
      }
    default:
      console.log('getAttribute couldnt handle', attr.type)
      return
  }
}

export default {
  JSXOpeningElement(path, state) {
    let kek = {
      tag: getName(path.node),
      props: path.node.attributes.map(getAttribute),
    }
    state.push(kek)
  },
}
