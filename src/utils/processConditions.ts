import { ISchema, IAnyObject } from '@/types'
import clone from 'nanoclone'

export function isObject (item: any) {
  return (item && typeof item === 'object' && !Array.isArray(item))
}

export function mergeDeep (target: IAnyObject, ...sources: IAnyObject[]) : IAnyObject {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    if (!source) return target

    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return mergeDeep(target, ...sources)
}

type ICondition = any
type IRequirment = any

export const processSchemaConditions = (schema: ISchema, data: IAnyObject) => {
  const newSchema = { ...schema }

  console.log(newSchema, data)

  if (schema.allOf) {
    schema.allOf.forEach(condition => processCondition(condition, data, newSchema))
  }

  if (schema.if) processCondition(schema, data, newSchema)

  Object.keys(schema.properties || {}).forEach(property => {
    if (schema.properties && schema.properties[property].type === 'object') {
      if (newSchema.properties && data && data[property]) newSchema.properties[property] = processSchemaConditions(schema.properties[property], data[property])
    }
  })

  return newSchema
}

const processCondition = (condition: ICondition, data: IAnyObject, newSchema: ISchema) => {
  // several requirments
  if (condition.if.allOf) {
    const requirments = condition.if.allOf

    if (requirments.every((requirment: IRequirment) => checkRequierment(requirment, data))) {
      applyCondition(newSchema, condition.then)
    }

    return
  }

  // needs one requirment
  if (condition.if.oneOf) {
    const requirments = condition.if.oneOf

    if (requirments.some((requirment: IRequirment) => checkRequierment(requirment, data))) {
      applyCondition(newSchema, condition.then)
    }

    return
  }

  // straighforward one requirment
  if (checkRequierment(condition.if, data)) applyCondition(newSchema, condition.then)
}

export const checkRequierment = (requirment: IRequirment, data: IAnyObject) => {
  // TODO: different types of requirments
  // TODO: allOf, oneOf
  console.log(requirment, data)

  let currentPath = requirment.not ? requirment.not.properties : requirment.properties
  let currentValue = data
  let currentParamName = Object.keys(currentPath)[0]

  while (currentParamName !== 'const' && currentParamName !== 'minLength') {
    if (typeof currentPath !== 'object') {
      console.warn('[JSON-SCHEMA] Invalid IF condition: ', requirment)

      return false
    }

    currentPath = currentPath[currentParamName]

    if (currentParamName !== 'properties') {
      if (typeof currentValue !== 'object') {
        console.warn('[JSON-SCHEMA] Invalid IF condition: ', requirment)

        return false
      }

      currentValue = currentValue[currentParamName]
    }

    currentParamName = Object.keys(currentPath)[0]
  }

  if (currentParamName === 'const') {
    return requirment.not ? currentPath.const !== currentValue : currentPath.const === currentValue
  }

  if (currentParamName === 'minLength') {
    return requirment.not
      ? currentPath.minLength > (currentValue || '').length
      : currentPath.minLength <= (currentValue || '').length
  }

  return false
}

const applyCondition = (schema: ISchema, then: ISchema) => {
  return mergeDeep(schema, then)
}
