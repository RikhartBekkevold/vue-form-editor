Vue.component('checkbox-question', {
    props: ['alternatives', 'question'],
    template: `
    <div>
        <div
            v-on:click="removeQuestionAlternative()"
            style="padding-top: 9px;"
            class="col-lg-1">
            <i class="glyphicon glyphicon-remove"></i>
        </div>
        <div style="padding-top: 7px;" v-on:click="cloneQuestionAlternative()" class="col-lg-1">
          <i style="margin-left: 0px; padding-left: 0px" class="fa fa-clone"></i>
        </div>
        <div class="col-lg-1" style="padding-top: 7px;">
            <input
                type="checkbox"
                name="index">
            </input>
        </div>
        <div class="col-lg-9">
            <input
                type="text"
                style="width: 90%"
                class="form-control"
                placeholder="alternativ"
                v-model="alternatives.label"
                @keyup.46="alternatives.label = ''"
                @keyup.enter="addQuestionAlternative($event)"
                >
            </input>
        </div>
    </div>
    `,
    methods: {
        addQuestionAlternative: function($event) {
            this.question.alternatives.push({type: "Checkbox", label: ''})
            // alert()
            indexOf(alternatives) + 1
            $event.target.focus()
        },
        removeQuestionAlternative: function() {
            this.question.alternatives.splice(this.question.alternatives.indexOf(this.alternatives), 1)
        },
        cloneQuestionAlternative: function() {
            var clonedQuestionAlternative = JSON.stringify(this.alternatives)
            clonedQuestionAlternative = JSON.parse(clonedQuestionAlternative)
            this.question.alternatives.splice(this.question.alternatives.indexOf(this.alternatives) + 1, 0, clonedQuestionAlternative)
        }
    }
})
