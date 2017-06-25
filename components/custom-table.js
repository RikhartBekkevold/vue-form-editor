Vue.component('custom-table', {
  template: `

      <table class="table-bordered">
          <tr>
              <th v-for="row in alt.table">
                  {{row.row}}
              </th>
          </tr>
          <tr v-for="row in alt.table">
              <td v-for="col in row.cols">
                  {{col.name}}
              </td>
          </tr>
      </table>

  `,
  props: ['value'],
  methods: {
    updateValue: function (value) {


        // this.$emit('input', value)

    }
  }
})
