Vue.component('tab', {

    template: `
     <div v-show="isActive" id="tab">
        <slot></slot>
    </div>`,
    props: {
        name: { required: true },
        selected: { default: false }
    },
    data() {
        return {
            isActive: false,
            list: [{nr: '1'}, {nr: '2'}, {nr: '3'}, {nr: '4'}]
        }
    },
    mounted() {
        this.isActive = this.selected
    },
    methods: {
        

    }
})
