Vue.config.productionTip = false;
Vue.component('flat-pickr', VueFlatpickr.default);

var app = new Vue({
    el: '#app',
    data: {
        currentPath: window.location.pathname,
        //GUI
        hideGUI: false,
        showModal: 'none',
        date: new Date(),
        // color
        colors: colorPickerDefaultProps,
        entireForm: true,
        nextPage: false,
        prevPage: false,
        //the state of the app is stored here and i localStorage
        preferences: {
            entireForm: true

        },

        currentPage: 1,
        //nrOfPages: 1,

        pages: ['1', '2', '3'],

        //operationType: ['removeQuestion', 'removeQuestionAlternative',  'typing', 'addQuestion', 'addAlternative' ],

        currentUserAction: 'addQuestion', //sett this string to new value when user performs action. this way we can see what prev action was and

        //time
        time: true,
        calendar: false,

        title: '',
        toggle: true,
        show: true,
        dragging: false,
        playAnimations: false,
        list:
            [
            {type: "Radiobutton", focused: false, bColorHex: '', label: '', alternatives: [{type: "Radiobutton", label: ''}]},
            {type: "Checkbox", focused: false, bColorHex: '', alternatives: [{type: "Checkbox", label: ''}]},
            {type: "Textfield", focused: false, bColorHex: '', alternatives: [{type: "Textfield", label: ''}]},
            {type: "Textarea", focused: false, bColorHex: '', alternatives: [{type: "Textarea", label: '', height: parseInt(document.getElementById("form").style.width), width: parseInt(document.getElementById("form").style.width)}]},
            {type: "List", focused: false, bColorHex: '', label: '', alternatives: [{type: "List", label: '', select: [{option: ''}]}]},
            {type: "Video", focused: false, bColorHex: '', label: '', alternatives: [{type: "Video", label: '', url: ''}]},
            {type: "Image", focused: false, bColorHex: '', alternatives: [{type: "Image"}]},
            {type: "Audio", focused: false, bColorHex: '', alternatives: [{type: "Audio"}]},
            {type: "Table", focused: false, bColorHex: '', alternatives: [{type: "Table"}]},
            {type: "Date", focused: false, bColorHex: '', date: null, alternatives: [{type: "Date", isTimeEnabled: this.time, isCalendarEnabled: this.calendar, label: ''}]}
            ],
        advancedList:
            [
            {type: "Tittel", focused: false, bColorHex: '', label: '', desclabel: '', alternatives: [{type: "Tittel"}]}
            ],
        formList: []
    },
    components: {
        'photoshop-picker': Photoshop,
        'swatches-picker': Swatch,
    },
    created() {
        var alt;
        var self = this;
        window.addEventListener('keydown', function(event) {
            if(event.keyCode == 18) {
                alt = true;
            }

            if (event.keyCode == 65 && alt == true) {
                self.showModal = 'delete'
            }
            else if(event.keyCode == 83 && alt == true) {
                self.deleteForm()
            }
        });

        window.addEventListener('keyup', function(event) {
            if(event.keyCode == 18) {    //event.ctrlKey
                alt = false;
            }
        });

        console.log(document.getElementById("form").clientWidth)
        console.log(parseInt(document.getElementById("form").clientWidth))
    },
    mounted() {
        console.log(document.getElementById("form").clientWidth)
        console.log( localStorage.getItem('form'))
        // if(typeof localStorage.getItem('form') == 'undefined') {
        //     console.log('das')
        //     // return
        // }
        var count = 1;
        if(localStorage.getItem('pageCount') != null) {
            var count = localStorage.getItem('pageCount')
            count++;
            localStorage.setItem('pageCount', count)
        }
        localStorage.setItem('pageCount', count)

        console.log('Number of times you have visited this site: ' + count)

        if(localStorage.getItem('form') == null) {
            console.log('null')
            return
            //if null create var with empty array?
            //den lagra tom array i GS?
        }
        this.formList = JSON.parse(localStorage.getItem('form'))
        // this.formList = JSON.parse(localStorage.getItem('form'))
    },
    watch: {
        formList: {
          handler: function() {
            //   console.log('change')
                // localStorage.form = this.formList;
            // if (!window.localStorage) {
            //     alert('This browser does not support Local Storage. Update your browser to store the forms temporary state.')
            //     return
            // }
            if(this.operationType != 'addQuestionAlternative') {
                localStorage.setItem('form', JSON.stringify(this.formList));
            }
            //   localStorage.setItem("username", "John");
          },
          deep: true
      },
      'colors.hex': {
          handler: function (colors) {
              var self = this;
              this.formList.forEach(function(item){
                  if(self.entireForm == true){
                      console.log('ds')
                      item.bColorHex = colors
                      console.log(colors)
                      var colorsString = JSON.stringify(colors).replace('#','')
                      console.log(colorsString)


                        var r = parseInt(colorsString.substr(1,2),16);
                        console.log(r)
                        var g = parseInt(colorsString.substr(3,2),16);
                        console.log(g)
                        var b = parseInt(colorsString.substr(5,2),16);
                        console.log(b)
                        var yiq = ((r*299)+(g*587)+(b*114))/1000;
                        console.log(yiq)
                        item.fColorHex = ((yiq >= 128) ? 'black' : 'white');
                        console.log(item.fColorHex)
                      return
                  }

                  if(item.focused == true) {
                      item.bColorHex = colors
                      console.log(colors)
                      var colorsString = JSON.stringify(colors).replace('#','')
                      console.log(colorsString)


                        var r = parseInt(colorsString.substr(1,2),16);
                        console.log(r)
                        var g = parseInt(colorsString.substr(3,2),16);
                        console.log(g)
                        var b = parseInt(colorsString.substr(5,2),16);
                        console.log(b)
                        var yiq = ((r*299)+(g*587)+(b*114))/1000;
                        console.log(yiq)
                        item.fColorHex = ((yiq >= 128) ? 'black' : 'white');
                        console.log(item.fColorHex)

                        //   item.fColorHex =  (parseInt(colorsString, 16) > 0xffffff/2) ? 'black':'white';
                        //   console.log(item.fColorHex)

                  }
              })
          },
          deep: true
      },
    //   'colors.a': {
    //       handler: function (colors) {
    //           this.formList.forEach(function(item){
    //               if(item.focused == true) {
    //                   item.opacity = colors
    //                   console.log(colors)
    //               }
    //           })
    //       },
    //       deep: true
    //   },
        'time': {
            handler: function (time) {
                this.formList.forEach(function(item){
                    if(item.focused == true && item.type == 'Date') {
                        item.alternatives.forEach(function(alt){
                            alt.isTimeEnabled = time

                            // console.log(alt.isTimeEnabled)
                            // var index = item.alternatives.indexOf(alt)
                            // var temp = item.alternatives.slice(alt)
                            // console.log(temp)
                            // console.log(index)
                            // var s = item.alternatives.splice(index, 0, temp)
                            // console.log(s)
                        })
                    }
                })
            },
            deep: true
        },
        'calendar': {
          handler: function (calendar) {
              this.formList.forEach(function(item){
                  if(item.focused == true && item.type == 'Date') {
                      item.alternatives.forEach(function(alt){
                          alt.isCalendarEnabled = calendar
                      })
                  }
              })
          },
          deep: true
        }
        //do different actions depending on what changed. this detects change. can it detect what changed?

    },
    computed: {
        nrOfPages: function(){
            return this.pages.length
        }
    },
    methods: {
        undo: function() {

        },
        redo: function() {

        },
        saveFormState: function() {
            //
        },
        focus: function(item) {
            //rest all focuses
            this.formList.forEach(function(item){
                item.focused = false
            })
            //focus the element
            item.focused = true
        },
        //adds a question to the form
        addQuestion: function(type) {
            switch (type) {
                case "Radiobutton":
                    this.formList.push({type: "Radiobutton", focused: false, bColorHex: '', fColorHex: '', label: '', alternatives: [{type: "Radiobutton", label: ''}]})
                    break;
                case "Checkbox":
                    this.formList.push({type: "Checkbox", focused: false, bColorHex: '', label: '', alternatives: [{type: "Checkbox", label: ''}]})
                    break;
                case "Textfield":
                    this.formList.push({type: "Textfield", focused: false, bColorHex: '', label: '', alternatives: [{type: "Textfield", label: ''}]})
                    break;
                case "Textarea":
                    this.formList.push({type: "Textarea", focused: false, bColorHex: '', label: '', alternatives: [{type: "Textarea", label: '', height: 8, width: 55}]})
                    //  width: parseInt(document.getElementById("form").clientWidth) - (10 * (parseInt(document.getElementById("form").clientWidth)/100))
                    // console.log(parseInt(document.getElementById("form").clientWidth))
                    break;
                case "List":
                    this.formList.push({type: "List", focused: false, bColorHex: '', label: '', alternatives: [{type: "List", label: '', select: [{option: ''}]}]})
                    break;
                case "Tittel":
                    this.formList.push({type: "Tittel", focused: false, bColorHex: '', label: '', desclabel: '', alternatives: [{type: "Tittel"}]})
                    break;
                case "Table":
                    this.formList.push({type: "Table",
                                        focused: false,
                                        bColorHex: '',
                                        label: '',
                                        alternatives: [{  type: "Table",
                                                          rows: ['row', 'row',],
                                                          columns:
                                                               [
                                                               { name: 'cell', name312: 'cell' },
                                                               { name: 'cell', name312: 'cell' },
                                                               { name: 'cell', name312: 'cell' },
                                                               { name: 'cell', name312: 'cell'}
                                                               ]
                                                      }]
                                      })
                    break;
                case "Video":
                    this.formList.push({type: "Video", focused: false, bColorHex: '', label: '', alternatives: [{type: "Video", label: '', url: '', visible: false}]})
            }
        },
        //removes the question
        removeQuestion: function(question) {
            this.formList.splice(this.formList.indexOf(question), 1)
        },
        //clones a question
        cloneQuestion: function(question) {
            var clonedQuestion = JSON.stringify(question)
            clonedQuestion = JSON.parse(clonedQuestion)
            this.formList.splice(this.formList.indexOf(question) + 1, 0, clonedQuestion)
        },
        //delete entire form
        deleteForm: function() {
            this.formList = []
            this.showModal = 'none'
        },
        saveForm: function() {
            var self = this;

            $.ajax({
                url: "php/saveForm.php",
                method: 'POST',
                data: {form: JSON.stringify(self.formList)},
                success: function(result) {
                    console.log(result)
                }
            })
        },
        //returns the values to be cloned when dragged to another list
        clone: function(el) {
            if(el.type == 'Radiobutton' || el.type == 'Checkbox' || el.type == 'Textfield') {
                return {
                    type: el.type, label: '',
                    alternatives: [{type: el.type, label: ''}]
                }
            }
            else if(el.type == 'Date') {
                return {
                    type: el.type, label: '', date: "today",
                    alternatives: [{type: el.type, isTimeEnabled: this.time, isCalendarEnabled: this.calendar, label: ''}]
                }
            }
            else if(el.type == 'List') {
                return {
                    type: el.type, label: '',
                    alternatives: [{type: el.type, label: '', select: [{option: ''}]}]
                }
            }
            else if(el.type == 'Tittel') {
                return {
                    type: el.type,
                    label: '',
                    desclabel: '',
                    alternatives: [{type: el.type}]
                }
            }
            else if(el.type == 'Video') {
                return {
                    type: el.type,
                    label: '',
                    alternatives: [{type: el.type, label: '', url: ''}]
                }
            }
            else if(el.type == 'Textarea') {
                return {
                    type: el.type,
                    label: '',
                    alternatives: [{type: el.type, label: '', height: 8, width: 55}]
                }
            }
        }
    }
})
