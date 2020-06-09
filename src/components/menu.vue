<script>
  import { DataService } from "../services";

  export default {
    name: 'Menu',

    data () {
      return {
        // Currently selected route
        route: 'home'
      }
    },

    computed: {
      tree () {
        // Create tree items for companies
        const companiesList = (DataService.summary || [])
          .map((company, ci) => {
            // Create tree items for company departments
            const children = company
                .departments
                .map((department, di) =>
                  ({
                    key: `c${ci}d${di}`,
                    label: department.name,
                    company: company.name
                  }))
            // Tree item representing the company,
            // with departments as child items
            return {
              key: `c${ci}`,
              label: company.name,
              isExpanded: false,
              children
            }
          })

        // Create tree, containing fixed menu items
        // and a list of companies retrieved from the survey
        return new Vue({
          data() {
            return {
            children: [
              {
                key: "1",
                icon: 'home',
                route: 'home',
                label: 'Home'
              },
              {
                key: "2",
                icon: 'done_all',
                route: 'survey',
                label: 'Survey'
              },
              ...companiesList
            ]
          }
        }
        })
      }
    },

    methods: {
      // Navigates to a route associated
      // with tree item
      goto (item, name) {
        // If tree item has navigable route, go there
        let route
        if (item.route) {
          route = { name: item.route }
        }

        // If tree item represents a department,
        // load department results
        if (name === "results") {
          route = {
            name: 'results',
            params: {
              company: item.company,
              department: item.label
            }
          }
        }

        if (name === "summary") {
          route = {
            name: 'summary',
            params: {
              company: item.company,
              department: item.label
            }
          }
        }

        // If navigable item, follow the route
        if (route) {
          this.$router
            .push(route)
            .catch((error = {}) => {
              if (error.name !== 'NavigationDuplicated') {
                console.error(error)
              }
            })
        } else {
          // Otherwise, if container route, toggle the children
          if (item.children) {
            item.isExpanded = !item.isExpanded
          }
        }
      },

      // Determines icon for the menu item.
      // If it has a fixed icon property, we use that.
      // For container items use icons to indicate expanded or collapsed state.
      getItemIcon (item) {
        if (item.icon) {
          return item.icon
        } else if (item.children) {
          return item.isExpanded ? 'expand_more' : 'chevron_right'
        } else {
          return 'widgets'
        }
      }
    },

    created () {
    }
  }

</script>

<template>
  <ul class="menu" style="list-style: none; padding-left: 5px; padding-right: 5px;">
    <li v-for="item in tree.children" :key="item.key">
      <div class="item row" >
        <q-btn class="full-width"
               align="left"
               :icon="getItemIcon(item)"
               :label="item.label"
               size="medium"
               :ripple="{ color: 'teal' }"
               @click="goto(item)"
               flat
        />
      </div>

      <ul v-if="item.children && item.isExpanded" class="submenu" style="list-style: none; padding-left: 10px;">
        <li v-for="child in item.children" :key="child.key">
          <div class="subitem row">
            <q-btn class="full-width"
                   align="left"
                   :label="child.label"
                   size="small"
                   :ripple="{ color: 'teal' }"
                   flat
            />
          </div>
          <ul style="list-style: none; padding-left: 10px">
            <li>
              <q-btn class="full-width"
                     align="left"
                     label="summary"
                     size="small"
                     icon="list_alt"
                     :ripple="{ color: 'teal' }"
                     flat
                     @click="goto(child,`summary`)"
              />
            </li>
            <li>
              <q-btn class="full-width"
                     align="left"
                     label="results"
                     size="small"
                     icon="assessment"
                     :ripple="{ color: 'teal' }"
                     flat
                     @click="goto(child,`results`)"
              />
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>

<style lang="scss">
  .menu {

    li {
      cursor: pointer;
    }

    .submenu {

      li {
        cursor: pointer;
      }
    }
  }
</style>





