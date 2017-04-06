const immutable = require('immutable')
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')

function merge(a, b) {
  const ia = immutable.fromJS(a)
  const ib = immutable.fromJS(b)

  if (!ia || !ib) return a

  if (immutable.Map.isMap(ia) && immutable.Map.isMap(ib)) {
    return ia.mergeWith(merge, ib).toJS()
  }

  if (immutable.List.isList(ia) && immutable.List.isList(ib)) {
    return ia.concat(ib).toJS()
  }

  return a;
}

function processIncludes(ctx, parent, includes) {
  includes.forEach((includeFileName) => {
    const include = ctx.reader(path.join(ctx.pwd, includeFileName))
    parent = process(ctx, parent, include)
  })

  return parent
}

function process(ctx, parent, content) {
  if (content.includes) {
    content = processIncludes(ctx, content, content.includes)
    delete content.includes
  }

  return merge(parent, content)
}

function _readYAML(filePath) {
  const ctx = {
    pwd: path.dirname(filePath),
    reader: _readYAML,
  }
  let content

  try {
    content = yaml.safeLoad(fs.readFileSync(filePath))
  } catch (e) {
    console.error(filePath, 'failed')
    console.error(e)
    throw e
  }

  return process(ctx, {}, content)
}

function readYAML(filePath) {
  return yaml.dump(_readYAML(filePath))
}

function _readJSON(filePath) {
  const ctx = {
    pwd: path.dirname(filePath),
    reader: _readJSON,
  }
  const content = JSON.parse(fs.readFileSync(filePath))
  return process(ctx, {}, content)
}

function readJSON(filePath) {
  return json.stringify(_readJSON(filePath))
}

module.exports = {
  readYAML,
  readJSON,
}
