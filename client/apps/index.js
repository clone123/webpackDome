/**
 * Created by huanghuanhuan on 2016/12/5 16:02
 */

import style from './style.less'
import template from './template.html'
import load  from './load/index'
import $ from 'jquery'


export default {
  template,
  data: function () {
    return {
      style,
      name: 'clone1'
    }
  },
  methods: {
    load: function () {
      console.log('loading!')
    }
  },
  components: {
    load
  }
}