Vue.component('currency-input', {
  template: `
 	<input type="text" :value="value" @input="updateValue($event.target.value)">
  `,
  props: ['value'],
  methods: {
    updateValue: function (value) {


        this.$emit('input', value)

    }
  }
})
