// Register a global custom directive called v-focus
Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el, binding) {

        if(binding.value == true){
            el.focus()
            console.log(binding.value)
        }
        // console.log(binding.value)
        // if(binding.value == true) {
        //     console.log('true')
        //
        // }

  }
})



Vue.directive('demo', {
    inserted: function (el, binding) {
        console.log(binding.value.color) // => "white"
        console.log(binding.value.text)  // => "hello!"
    }
})
