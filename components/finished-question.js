

 Vue.component('finished-question', {
     template: `

 <div>
      <!-- QUESTIONN -->
      <div v-if="question.type != 'Tittel'" class="row" style="margin-bottom: 30px; font-family: 'Alfa Slab One', cursive; letter-spacing: 2px;">
          <div class="col-lg-11" style="padding-left: 8px; padding-top: 8px;">
              <div :style="{color: question.fColorHex}"  style="font-size: 1.5em; margin-left: 10px;" class="question-input">{{question.label}}</div>
          </div>
      </div>

      <!-- TITTEL -->
       <div v-if="question.type == 'Tittel'" class="row">
            <div class="row-fluid" style="padding: 0px">
                <div class="col-lg-12" style="display: block; width: 100%; padding: 20px; text-align: center;">
                    <div style="text-align: center; font-size: 1.9em; padding: 0px; margin: 0px;">{{question.label}}</div>
                </div>
            </div>
            <div class="row">
                <div v-if="question.desclabel != ''" class="col-lg-12" style="padding-bottom: 20px; text-align: center">
                    <div>{{question.desclabel}}</div>
                </div>
            </div>
       </div>

      <!-- QUESTIONN ALTERNATIVES -->
      <div class="row" v-if="question.type != 'Tittel'" style="padding-bottom: 40px;">
          <div v-for="(alt, index) in question.alternatives" :key="index" class="alternatives" >
              <!-- RADIOBUTTON -->
              <div v-if="alt.type == 'Radiobutton'" class="row">
                  <div class="col-lg-1" style="margin-left: 15px">
                      <input   type="radio" name="index"></input>
                  </div>
                  <div class="col-lg-10">
                      <div :style="{color: question.fColorHex}"  style="width: 90%">{{alt.label}}</div>
                  </div>
              </div>
              <!-- CHECKBOX -->
              <div v-if="alt.type == 'Checkbox'" class="row">
                  <div class="col-lg-1" style="margin-left: 15px">
                      <!-- the checkbox -->
                      <input
                          :style="{color: question.fColorHex}"
                          type="checkbox"
                          name="index">
                      </input>
                  </div>
                  <div class="col-lg-10">
                      <!-- the label -->
                      <div
                         style="width: 90%">
                         {{alt.label}}
                     </div>
                  </div>
              </div>
              <!-- TEXTFIELD -->
              <div v-if="alt.type == 'Textfield'" class="row textfield">

                  <div class="row" style="margin-bottom: 20px">

                      <div class="col-lg-10" style="padding-left: 48px">
                          <div style="width: 90%">
                            {{alt.label}}
                          </div>
                      </div>
                  </div>

                  <div class="col-lg-10"  style="margin-left: 15px">
                      <form class="pure-form">
                          <input type="text" style="width: 100%">
                      </form>
                  </div>
                  <div class="col-lg-1" >
                  </div>
              </div>
              <!-- TEXTAREA -->
              <div v-if="alt.type == 'Textarea'" class="row textarea">

                  <div v-if="alt.label !== ''" class="row" style="margin-bottom: 20px">

                      <div  class="col-lg-10" style="padding-left: 48px">
                          <div style="width: 90%">
                            {{alt.label}}
                          </div>
                      </div>
                  </div>

                  <div class="col-lg-10"  style="margin-left: 15px">
                      <form class="pure-form">
                          <textarea class="pure-input-1-2" :rows="alt.height" :cols="alt.width" style="width: auto"></textarea>
                      </form>
                  </div>
                  <div class="col-lg-1" >
                  </div>
              </div>
              <!-- LIST -->
              <div v-if="alt.type == 'List'" class="row">
                  <div class="col-lg-10" style="margin-left: 15px">
                      <form class="pure-form pure-form-stacked" >
                          <select id="" style="height: 35px;">
                              <option v-for="select in alt.select">{{select.option}}</option>
                          </select>
                      </form>
                  </div>
                  <div class="col-lg-1">
                  </div>
              </div>

            <!-- VIDEO -->
            <div v-if="alt.type == 'Video'" class="row video">
                <div class="row" style="margin-bottom: 20px">
                    <div class="col-lg-10" style="padding-left: 48px">
                        <div style="width: 90%">
                            {{alt.label}}
                        </div>
                    </div>
                </div>
                <div class="col-lg-10"  style="margin-left: 15px">
                    <iframe frameBorder="0" allowfullscreen height="300" style="width: 100%; border: none;" :src="alt.url.toString().replace('watch?v=','embed/')"></iframe>
                </div>
                <div class="col-lg-1" >
                </div>
            </div>

            <!-- TABLE -->
            <div class="col-lg-11">
                <table style="margin-left: 20px" class="table-bordered">
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


          </div>
      </div>

 </div>
     `,
     props: {
         question: { required: true }
     }
 })
