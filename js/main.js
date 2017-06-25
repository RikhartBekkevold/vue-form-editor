Vue.config.productionTip = false;

var app = new Vue({
    el: '#app',
    data: {
        price: 0,
        showModal: 'none',
        toggle: true,
        show: true,
        playAnimations: false,
        list:
            [
            {type: "Radiobutton", label: '', alternatives: [{type: "Radiobutton", label: ''}]},
            {type: "Checkbox", alternatives: [{type: "Checkbox", label: ''}]},
            {type: "Textfield", alternatives: [{type: "Textfield", label: ''}]},
            {type: "Textarea", alternatives: [{type: "Textarea", label: '', height: parseInt(document.getElementById("form").style.width), width: parseInt(document.getElementById("form").style.width)}]},
            {type: "List", label: '', alternatives: [{type: "List", label: '', select: [{option: ''}]}]},
            {type: "Video", label: '', alternatives: [{type: "Video", label: '', url: ''}]},
            {type: "Image", alternatives: [{type: "Image"}]},
            {type: "Audio", alternatives: [{type: "Audio"}]},
            {type: "Table", alternatives: [{type: "Table"}]}
            ],
        advancedList:
            [
            {type: "Tittel", label: '', desclabel: '', alternatives: [{type: "Tittel"}]}
            ],
        tabList: [{label: 'Edit', href: "#home", tabIsActive: false}, {label: 'Preview', href: "#menu1", tabIsActive: false}, {label: 'Templates', href: "#menu2", tabIsActive: false},
                    {label: 'Branching', href: "#menu3", tabIsActive: false}, {label: 'Form', href: "#menu4", tabIsActive: false}],
        formList:
            [
            //the forms initial state is empty
            ],
        formHeight: 800,
        addingQuestion: false //when adding question set to true, then directive has a if which prevents ...
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
            localStorage.setItem('form', JSON.stringify(this.formList));
            //   localStorage.setItem("username", "John");
          },
          deep: true
        }
    },
    methods: {
        //adds a question to the form
        addQuestion: function(type) {
            switch (type) {
                case "Radiobutton":
                    this.formList.push({type: "Radiobutton", label: '', alternatives: [{type: "Radiobutton", label: ''}]})
                    break;
                case "Checkbox":
                    this.formList.push({type: "Checkbox", label: '', alternatives: [{type: "Checkbox", label: ''}]})
                    break;
                case "Textfield":
                    this.formList.push({type: "Textfield", label: '', alternatives: [{type: "Textfield", label: ''}]})
                    break;
                case "Textarea":
                    this.formList.push({type: "Textarea", label: '', alternatives: [{type: "Textarea", label: '', height: 8, width: parseInt(document.getElementById("form").clientWidth) - (10 * (parseInt(document.getElementById("form").clientWidth)/100))}]})
                    console.log(parseInt(document.getElementById("form").clientWidth))
                    break;
                case "List":
                    this.formList.push({type: "List", label: '', alternatives: [{type: "List", label: '', select: [{option: ''}]}]})
                    break;
                case "Tittel":
                    this.formList.push({type: "Tittel", label: '', desclabel: '', alternatives: [{type: "Tittel"}]})
                    break;
                case "Table":
                    this.formList.push({type: "Table",
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
                    this.formList.push({type: "Video", label: '', alternatives: [{type: "Video", label: '', url: ''}]})
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
        focus: function(event) {

        },
        //returns the values to be cloned when dragged to another list
        clone: function(el) {
            if(el.type == 'Radiobutton' || el.type == 'Checkbox' || el.type == 'Textfield') {
                return {
                    type: el.type, label: '',
                    alternatives: [{type: el.type, label: ''}]
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
