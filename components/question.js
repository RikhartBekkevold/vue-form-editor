Vue.component('question', {
    template: `
    <div>
        <!-- QUESTIONN -->
        <div v-if="question.type !='Tittel'" class="row" style="margin-bottom: 50px;">
         <div class="col-lg-11">
            <input v-model="question.label" type="text" style="margin-left: 10px" class="form-control question-input" placeholder="Write your question here..."></input>
         </div>
         <div style="padding-top: 9px;" class="col-lg-1">
             <div style="border-bottom: 1px solid black" v-on:click="$emit('remove')">
                 <i class="glyphicon glyphicon-remove"></i>
             </div>
             <div style="padding-top: 10px;" v-on:click="$emit('clone')">
                 <i class="fa fa-clone"></i>
             </div>
         </div>
        </div>

        <!-- TITTEL -->
        <div v-if="question.type == 'Tittel'" class="row">
          <div class="col-lg-11">
            <input v-focus v-model="question.label" type="text" style="margin-left: 10px; font-size: 1.5em;" class="form-control question-input" placeholder="Write a title here..."></input>
            <div class="row">
                <div class="col-lg-1">
                    <i v-if="question.type == 'Tittel'" v-on:click="toggleTitleDesc = !toggleTitleDesc" style="padding-top: 9px; color: #4b4f56; margin-left: 10px;" class="fa fa-plus" aria-hidden="true"></i>
                </div>
                <div class="col-lg-11">
                    <input v-model="question.desclabel" v-bind:class="{hide: toggleTitleDesc}" type="text" style="margin-left: 10px;" class="form-control question-input" placeholder="Add a description here..."></input>
                </div>
            </div>
          </div>
          <div style="padding-top: 9px;" class="col-lg-1">
              <div style="border-bottom: 1px solid black" v-on:click="$emit('remove')">
                 <i class="glyphicon glyphicon-remove"></i>
             </div>
             <div style="padding-top: 10px;" v-on:click="$emit('clone')">
                 <i class="fa fa-clone"></i>
             </div>
          </div>
        </div>

        <!-- ALTERNATIVES -->
        <div class="row">
        <draggable  :move="checkMove" :options="{animation: 100, ghostClass: 'choosenDragClass', dragClass: 'sortable-ghost2'}" v-model="question.alternatives" @end="">
            <div v-for="(alt, index) in question.alternatives" :key="index" class="alternatives">

                <!-- RADIOBUTTON -->
                <div v-if="alt.type == 'Radiobutton'" class="row">
                    <div v-on:click="removeQuestionAlternative(question, alt)" style="padding-top: 9px;" class="col-lg-1">
                        <i class="glyphicon glyphicon-remove"></i>
                    </div>
                    <div style="padding-top: 9px;" v-on:click="cloneQuestionAlternative(question, alt)" class="col-lg-1">
                        <i style="margin-left: 0px; padding-left: 0px" class="fa fa-clone"></i>
                    </div>
                    <div class="col-lg-1" style="padding-top: 7px;">
                        <input type="radio" name="index"></input>
                    </div>
                    <div class="col-lg-9">
                        <input 	type="text"
                                class="form-control"
                                style="width: 90%"
                                placeholder="Alternative"
                                v-model="alt.label"
                                v-bind:ref="alt.type"
                                @keydown.38="focusPrev(index, alt.type)"
                                @keydown.40="focusNext(index, alt.type)"
                                v-focus
                                @keyup.46="alt.label = ''"
                                @keyup.enter="addQuestionAlternative(question)">
                        </input>
                    </div>
                </div>

                <!-- CHECKBOX -->
                <div v-if="alt.type == 'Checkbox'" class="row">
                    <div v-on:click="removeQuestionAlternative(question, alt)" style="padding-top: 9px;" class="col-lg-1">
                        <i class="glyphicon glyphicon-remove"></i>
                    </div>
                    <div style="padding-top: 9px;"  v-on:click="cloneQuestionAlternative(question, alt)" class="col-lg-1">
                        <i style="margin-left: 0px; padding-left: 0px" class="fa fa-clone"></i>
                    </div>
                    <div class="col-lg-1" style="padding-top: 7px;">
                        <input type="checkbox" name="index"></input>
                    </div>
                    <div class="col-lg-9">
                        <input 	type="text"
                                class="form-control"
                                style="width: 90%"
                                placeholder="Alternative"
                                v-model="alt.label"
                                v-bind:ref="alt.type"
                                v-focus
                                @keyup.46="alt.label = ''"
                                @keydown.38="focusPrev(index, 'Checkbox')"
                                @keydown.40="focusNext(index, 'Checkbox')"
                                @keyup.enter="addQuestionAlternative(question)">
                        </input>
                    </div>
                 </div>

                <!-- TEXTFIELD -->
                <div v-if="alt.type == 'Textfield'" class="row textfield">
                    <div class="row" style="margin-bottom: 20px">
                        <div class="col-lg-2">
                        </div>
                        <div class="col-lg-10" style="padding-left: 26px; padding-right: 35px;">
                            <input 	type="text"
                                    class="form-control"
                                    style="width: 90%"
                                    placeholder="Write an optional description here..."
                                    v-model="alt.label"
                                    v-bind:ref="alt.type"
                                    @keydown.38="focusPrev(index, alt.type)"
                                    @keydown.40="focusNext(index, alt.type)"
                                    v-focus
                                    @keyup.46="alt.label = ''"
                                    @keyup.enter="addQuestionAlternative(question)">
                            </input>
                        </div>
                    </div>
                    <div v-on:click="removeQuestionAlternative(question, alt)" style="padding-top: 9px;" class="col-lg-1">
                        <i class="glyphicon glyphicon-remove"></i>
                    </div>
                    <div style="padding-top: 9px;"  v-on:click="cloneQuestionAlternative(question, alt)" class="col-lg-1">
                        <i style="margin-left: 0px; padding-left: 0px" class="fa fa-clone"></i>
                    </div>
                    <div class="col-lg-9">
                        <form class="pure-form">
                            <input v-focus type="text" style="width: 100%">
                        </form>
                    </div>
                    <div class="col-lg-1">
                    </div>
                </div>

                <!-- TEXTAREA -->
                <div v-if="alt.type == 'Textarea'" class="row textarea">
                    <div class="row" style="margin-bottom: 20px">
                        <div class="col-lg-2">
                        </div>
                        <div class="col-lg-10" style="padding-left: 26px; padding-right: 35px;">
                            <input 	type="text"
                                    class="form-control"
                                    style="width: 90%"
                                    placeholder="Write an optional description here..."
                                    v-model="alt.label"
                                    v-bind:ref="'alt.type' + index"
                                    v-focus
                                    @keyup.46="alt.label = ''"
                                    @keyup.enter="addQuestionAlternative(alts)">
                            </input>
                        </div>
                    </div>
                    <div v-on:click="removeQuestionAlternative(question, alt)" style="padding-top: 9px;" class="col-lg-1">
                        <i class="glyphicon glyphicon-remove"></i>
                    </div>
                    <div style="padding-top: 9px;" v-on:click="cloneQuestionAlternative(question, alt)" class="col-lg-1">
                        <i style="margin-left: 0px; padding-left: 0px" class="fa fa-clone"></i>
                    </div>
                    <div class="col-lg-9">
                        <form class="pure-form">
                            <textarea :rows="alt.height" :cols="alt.width" v-focus class="pure-input" v-bind:style="{ width: width + 'px' }"></textarea>
                        </form>
                    </div>
                    <div class="col-lg-1">
                    </div>
                </div>

                <!-- LIST -->
                <div v-if="alt.type == 'List'" class="row">
                    <div class="row">
                        <div v-on:click="removeQuestionAlternative(question, alt)" style="padding-top: 9px; padding-left: 30px;" class="col-lg-1">
                            <i class="glyphicon glyphicon-remove"></i>
                        </div>
                        <div style="padding-top: 9px; padding-left: 30px;"  v-on:click="cloneQuestionAlternative(question, alt)" class="col-lg-1">
                            <i style="margin-left: 0px; padding-left: 0px" class="fa fa-clone"></i>
                        </div>
                        <div class="col-lg-10" style="padding-bottom: 30px;">
                            <form class="pure-form pure-form-stacked">
                                <select id="" style="height: 35px; min-width: 150px;">
                                    <option class="option" v-for="select in alt.select">{{select.option}}</option>
                                </select>
                            </form>
                        </div>
                    </div>
                    <div class="row" v-for="(select, index) in alt.select"  style="margin-top: 7px; margin-bottom: 0px">
                        <div class="col-lg-1">
                            <div v-on:click="removeQuestionAlternative(question, alt)" style="padding-top: 9px;" class="col-lg-1">
                                <i class="glyphicon glyphicon-remove"></i>
                            </div>

                        </div>
                        <div class="col-lg-1">
                            <div style="padding-top: 9px;" v-on:click="cloneQuestionAlternative(question, alt)" class="col-lg-1">
                                <i style="margin-left: 0px; padding-left: 0px" class="fa fa-clone"></i>
                            </div>
                        <!-- <i v-if="alt.select.indexOf(select) == alt.select.length - 1" style="color: #42b983" @click="addListOption(alt)" class="fa fa-plus" aria-hidden="true"></i> -->
                        </div>
                        <div class="col-lg-9" style="padding-left: 20px; margin: 0px">
                            <input
                                v-focus
                                v-bind:ref="alt.type"
                                @keydown.38="focusPrev(index, alt.type)"
                                @keydown.40="focusNext(index, alt.type)"
                                @keyup.46="select.option = ''"
                                @keyup.enter="addListOption(alt)"
                                v-model="select.option" class="form-control listinputfield" type="text" style="width: 100%" placeholder="Add option to list"></input>
                        </div>
                        <div class="col-lg-1">
                        </div>
                    </div>
                    <div class="row" style="margin-bottom: 30px">
                        <div class="col-lg-2">
                        </div>
                        <div class="col-lg-9" style="padding-left: 18px;">
                        </div>
                        <div class="col-lg-1">
                        </div>
                    </div>
                </div>

                <!-- VIDEO -->
                <div v-if="alt.type == 'Video'" class="row video">
                    <div class="row" style="margin-bottom: 20px">
                        <div class="col-lg-2">
                        </div>
                        <div class="col-lg-10" style="padding-left: 26px; padding-right: 35px;">
                            <input 	type="text"
                                    class="form-control"
                                    style="width: 90%"
                                    placeholder="Write an optional description here..."
                                    v-model="alt.label"
                                    v-bind:ref="'alt.type' + index"
                                    v-focus
                                    @keyup.46="alt.label = ''"
                                    @keyup.enter="addQuestionAlternative(question)">
                            </input>
                        </div>
                    </div>
                    <div v-on:click="removeQuestionAlternative(question, alt)" style="padding-top: 9px;" class="col-lg-1">
                        <i class="glyphicon glyphicon-remove"></i>
                    </div>
                    <div style="padding-top: 9px;" v-on:click="cloneQuestionAlternative(question, alt)" class="col-lg-1">
                        <i style="margin-left: 0px; padding-left: 0px" class="fa fa-clone"></i>
                    </div>
                    <div class="col-lg-9">
                        <form class="pure-form">
                            <input v-focus type="text" v-model="alt.url"  placeholder="Paste a video url here..." style="width: 100%">
                        </form>
                        <iframe v-if="alt.url != ''" width="" height="300" style="width: 100%" :src="alt.url.toString().replace('watch?v=','embed/')" frameBorder="0" allowfullscreen></iframe>
                    </div>
                    <div class="col-lg-1">
                    </div>
                </div>

                <!-- TABLE -->
                <div v-if="alt.type == 'Table'" class="row">
                    <div v-on:click="removeQuestionAlternative(question, alt)" style="padding-top: 9px;" class="col-lg-1">
                        <i class="glyphicon glyphicon-remove"></i>
                    </div>
                    <div style="padding-top: 9px;" v-on:click="cloneQuestionAlternative(question, alt)" class="col-lg-1">
                        <i style="margin-left: 0px; padding-left: 0px" class="fa fa-clone"></i>
                    </div>
                    <div class="col-lg-9">
                        <div class="row">
                            <div class="col-lg-1">
                                <i style="color: rgb(75, 79, 86); padding-top: 12px;" @click="addTableRow(alt)" class="fa fa-plus" aria-hidden="true"></i>
                            </div>
                            <div class="col-lg-11" style="  overflow-x: scroll;">
                                <table class="table-bordered">
                                    <thead>
                                        <tr>
                                            <th v-for="(row, key, index) in alt.rows">

                                                {{row}}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(column, index) in alt.columns">
                                            <td v-for="(item, key) in column">{{column[key]}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <i style="color: rgb(75, 79, 86);" @click="addTableColumn(alt)" class="fa fa-plus" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class="col-lg-1">
                    </div>
                </div>
            </div>
            </draggable>
        </div>

        <div class="row">
            <!--<button  class=""> -->

            <!-- </button> -->
            <button v-if="question.type != 'Tittel'" style="margin-top: 80px; margin-left: 10px;" v-on:click="addQuestionAlternative(question)" class="btn btn-default">
                <i style="color: #4b4f56" class="fa fa-plus" aria-hidden="true"></i>
            </button>
        </div>
    </div>
    `,
    props: {
        question: { required: true },
        toggle: { required: false }
    },
    data() {
        return {
            toggleTitleDesc: false,
            width: parseInt(document.getElementById("form").clientWidth) - (29 * (parseInt(document.getElementById("form").clientWidth)/100))
        }
    },
    created() {
        this.toggleTitleDesc = this.toggle;

        // var pixels = 10*(1000/100);
        //
        // 100
        // 10/100*
        //
        // parentwidth = 761
        //
        // document.querySelector('textarea').addEventListener('resize', function(event) {
        //     alert(event.target)
        // });


        // var tenPercentOfFormInPixels = 10 * (parseInt(document.getElementById("form").clientWidth)/100)
// 10 * 761/100;

        // alert(pixels); // will print "100"
    },
    computed: {
        embedURL: function() {
            // return this.question.alternatives[0].url
        }
    },
    filters: {
        formatURL: function(value) {
            if (!value) return ''
            value = value.toString();
            // return value.charAt(0).toUpperCase() + value.slice(1)
            value = value.replace('watch?v=','embed/');
            console.log(value);
            return value;
        }
        //the attr/bind always recieve the element as first argument?
        //fordelen med componenter. operasjoner her inne skjer på en og riktig component
    },
    //datasammenheng
    //må attache refs på elementet/html for at $refs skal funke?
    methods: {
        onDragEnd: function() {
            console.log()



        },
        // startDrag: function (evt) {
		// 	console.log(evt)
		// },
        checkMove: function(evt){
            // return (evt.draggedContext.element.name!=='apple');
            // console.log(evt);
        console.log(    evt.draggedContext.index); // dragged HTMLElement
        console.log(    evt.relatedContext.index); // dragged HTMLElement
    	// 	console.log(evt.draggedRect); // TextRectangle {left, top, right и bottom}
    	// console.log(	evt.related); // HTMLElement on which have guided
    	// 	console.log(evt.relatedRect); // TextRectangle

        },
        focusPrev: function(idx, prop) {
            Vue.nextTick(() => {
                if(idx >= 1) {
                    this.$refs[prop][idx-1].focus()
                }
            })
        },
        focusNext: function(idx, prop) {
            Vue.nextTick(() => {
                if(idx < this.question.alternatives.length-1) {
                    this.$refs[prop][idx+1].focus()
                }
            })
        },
        addQuestionAlternative: function(question) {
            switch (question.type) {
                case "Radiobutton":
                    var newLength = question.alternatives.push({type: "Radiobutton",  label: ''})
                    break;
                case "Checkbox":
                    question.alternatives.push({type: "Checkbox", label: ''})
                    break;
                case "Textfield":
                    question.alternatives.push({type: "Textfield", label: ''})
                    break;
                case "Textarea":
                    question.alternatives.push({type: "Textarea", label: '', height: 8, width: 55})
                    break;
                case "List":
                    question.alternatives.push({type: "List", label: '', select: [{option: ''}]})
                    break;
                case "Video":
                    question.alternatives.push({type: "Video", label: '', url: ''})
            }
        },
        removeQuestionAlternative: function(question, alternative) {
            question.alternatives.splice(question.alternatives.indexOf(alternative), 1)
        },
        addListOption: function(alternative) {
            alternative.select.push({option: ''})
        },
        addTableRow: function(alternative) {
            //add a new row at the end
            alternative.rows.push('row')
            //add a new column for that row at the end aswell
            // alternative.columns.push({ name: '111cqw11', name312: 'aaacceaaa' })
            alternative.columns.forEach(item => {

                var name = alternative.rows.length
                console.log(name)
                item['new' + name] = 'cell'
                //push another item to the end of each object
            })

        },
        addTableColumn: function(alternative) {

            var nrOfRows = alternative.rows.length;
            var nr = 0;
            var varName = 'cell' + nr;
            var objToPush = {};

            // alternative.columns.push({varName: 'new2', varsadde: 'new2'})
            for(var i = 0; i < nrOfRows; i++) {
                objToPush[varName] = 'cell'
                nr++
                varName = 'cell' + nr;
            }
            alternative.columns.push(objToPush)
            // alternative.columns.forEach(item => {


                //push the same number as the first, at the end of columns array


                // al
                // console.log(name)
                // item['new' + name] = 'new'
                //push another item to the end of each object
            // })
        },
        cloneQuestionAlternative: function(question, alternative) {
            var clonedQuestionAlternative = JSON.stringify(alternative)
            clonedQuestionAlternative = JSON.parse(clonedQuestionAlternative)
            question.alternatives.splice(question.alternatives.indexOf(alternative) + 1, 0, clonedQuestionAlternative)
        }
    }
})
