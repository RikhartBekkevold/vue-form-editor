Vue.component('tabs', {
    template:
    `<div id="formtabs">
        <ul class="nav nav-tabs">
          <li v-for="tab in tabs" @click="selectTab(tab)" :class="{'active': tab.isActive}"><a href="#">{{tab.name}}</a></li>
        </ul>
        <div class="tabs-content">
            <slot></slot>
        </div>
    </div>`,
    data() {
        return {
            tabs: []
        }
    },
    created() {
        this.tabs = this.$children;
    },
    methods: {
        selectTab: function(selectedTab){
            this.tabs.forEach(tab => {
                tab.isActive = (tab.name == selectedTab.name)
            })
        }
    }
})
