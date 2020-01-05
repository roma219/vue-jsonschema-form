import { ISchema, IAnyObject } from '@/types'
import { mergeDeep } from './mergeDeep'

type AllOfCondition = {
  allOf: Array<SimpleCondition>
  then: IAnyObject
}

type OneOfCondition = {
  oneOf: Array<SimpleCondition>
  then: IAnyObject
}

type SimpleCondition = {
  if: any,
  then: IAnyObject
}

type ICondition = SimpleCondition | AllOfCondition | OneOfCondition

//  requirment types

type ConstRequirment = { const: any }

type MinLengthRequirment = { minLength: number }

type IRequirment = ConstRequirment | MinLengthRequirment

// type IRequirmentTree = {
//   properties: {
//     [key: string]: IRequirmentTree | ConstRequirment | MinLengthRequirment
//   },
//   not: undefined
// }

type IRequirmentTree = any

type BaseRequirment = {
  not: IRequirmentTree
} | IRequirmentTree

export const processSchemaConditions = (schema: ISchema, data: IAnyObject) => {
  const newSchema = { ...schema }

  if (schema.allOf) {
    schema.allOf.forEach(condition => processCondition(condition, data, newSchema))
  }

  if (schema.if) processCondition(schema as SimpleCondition, data, newSchema)

  Object.keys(schema.properties || {}).forEach(property => {
    if (schema.properties && schema.properties[property].type === 'object') {
      if (newSchema.properties && data && data[property]) newSchema.properties[property] = processSchemaConditions(schema.properties[property], data[property])
    }
  })

  return newSchema
}

const processCondition = (condition: SimpleCondition, data: IAnyObject, newSchema: ISchema) => {
  // several requirments
  if (condition.if.allOf) {
    const requirments = condition.if.allOf

    if (requirments.every((requirment: BaseRequirment) => checkRequierment(requirment, data))) {
      applyCondition(newSchema, condition.then)
    }

    return
  }

  // needs one requirment
  if (condition.if.oneOf) {
    const requirments = condition.if.oneOf

    if (requirments.some((requirment: BaseRequirment) => checkRequierment(requirment, data))) {
      applyCondition(newSchema, condition.then)
    }

    return
  }

  // straighforward one requirment
  if (checkRequierment(condition.if, data)) applyCondition(newSchema, condition.then)
}

export const checkRequierment = (requirment: BaseRequirment, data: IAnyObject = {}) => {
  // TODO: different types of requirments
  // TODO: allOf, oneOf
  // now only minLength and const are supported

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

  // return false
}

const applyCondition = (schema: ISchema, then: IAnyObject) => {
  return mergeDeep(schema, then)
}
