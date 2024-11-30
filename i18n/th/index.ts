import base from './base';
import helper from './helper'
import model from './model'
import app from './app'
import error from './error'
// add all imported language files
export default {
    ...base,
    ...helper,
    ...model,
    ...app,
    ...error
}