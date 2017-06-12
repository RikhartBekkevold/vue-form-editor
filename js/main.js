Vue.config.productionTip = false;
var app = new Vue({
    el: '#app',
    data: {
        price: 0,
        showModal: 'none',
        toggle: true,
        list:
            [
            {type: "Radiobutton", label: '', alternatives: [{type: "Radiobutton", label: ''}]},
            {type: "Checkbox", alternatives: [{type: "Checkbox"}]},
            {type: "Textfield", alternatives: [{type: "Textfield"}]},
            {type: "Textarea", alternatives: [{type: "Textarea"}]},
            {type: "List", alternatives: [{type: "List"}]},
            {type: "Video", alternatives: [{type: "Video"}]},
            {type: "Image", alternatives: [{type: "Image"}]},
            {type: "Audio", alternatives: [{type: "Audio"}]},
            {type: "Table", alternatives: [{type: "Table"}]}
            ],
        advancedList:
            [
            {type: "Tittel", label: '', desclabel: '', alternatives: [{type: "Tittel"}]}
            ],
        formList:
            [
            //the forms initial state is empty
            ]
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
                    this.formList.push({type: "Textfield", alternatives: [{type: "Textfield"}]})
                    break;
                case "Textarea":
                    this.formList.push({type: "Textarea", alternatives: [{type: "Textarea"}]})
                    break;
                case "Tittel":
                    this.formList.push({type: "Tittel", label: '', desclabel: '', alternatives: [{type: "Tittel"}]})
            }
        },
        //removes the question
        removeQuestion: function(question) {
            this.formList.splice(this.formList.indexOf(question), 1)
        },
        //adds a alternative to a question
        addQuestionAlternative: function(question) {
            switch (question.type) {
                case "Radiobutton":
                    question.alternatives.push({type: "Radiobutton",  label: ''})
                    break;
                case "Checkbox":
                    question.alternatives.push({type: "Checkbox", label: ''})
                    break;
                case "Textfield":
                    question.alternatives.push({type: "Textfield"})
                    break;
                case "Textarea":
                    question.alternatives.push({type: "Textarea"})
            }
        },
        //removes the alternative from the question
        removeQuestionAlternative: function(question, alternative) {
            question.alternatives.splice(question.alternatives.indexOf(alternative), 1)
        },
        //clones a question
        cloneQuestion: function(question) {
            var clonedQuestion = JSON.stringify(question)
            clonedQuestion = JSON.parse(clonedQuestion)
            this.formList.splice(this.formList.indexOf(question) + 1, 0, clonedQuestion)
        },
        //clones a question alternative
        cloneQuestionAlternative: function(question, alternative) {
            var clonedQuestionAlternative = JSON.stringify(alternative)
            clonedQuestionAlternative = JSON.parse(clonedQuestionAlternative)
            question.alternatives.splice(question.alternatives.indexOf(alternative) + 1, 0, clonedQuestionAlternative)
        },
        //delete entire form
        deleteForm: function() {
            this.formList = []
            this.showModal = 'none'
        },
        saveForm: function() {
            var d = JSON.stringify(this.formList)
            
            this.showModal = 'none'
        },
        //returns the values to be cloned/deep cloned
        clone: function(el){
            if(el.type != 'Tittel') {
                return {
                    type: el.type, label: '',
                    alternatives: [{type: el.type, label: ''}]
                }
            }
            else {
                return {
                    type: el.type,
                    label: '',
                    desclabel: '',
                    alternatives: [{type: el.type}]
                }
            }
        }
    }
})
