import app from './app'
import base from './base';
import helper from './helper'
import model from './model'
import error from './error'

// add all imported language files
export default {
    ...app,
    ...base,
    ...helper,
    ...model,
    ...error
}