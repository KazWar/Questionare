<script>
  import layout from '../public/survey.json'

  let id = 1

  export default {
    name: 'Home',

    data() {
      return {
        separator: 'vertical',
        companyName:'',
        companyDepartment:'',
        layout
      }
    },

    methods: {
      uniqueIdentifier() {
        return id++
      },

      getAnswerClass (answer) {
        return {
          'terrible': answer.rank == 1,
          'bad': answer.rank == 2,
          'mediocre': answer.rank == 3,
          'good': answer.rank == 4,
          'excellent': answer.rank == 5
        }
      },

      toggle (category) {
        Vue.set(category, 'isCollapsed', !category.isCollapsed)
      },

      onSubmit (evt) {
      }
    },

    created () {
    }
  }

</script>


<template>
  <div>
    <div class="q-pa-lg" style="background-color: #00cdcd; text-align: center">
      <span class="text-h2">
        CORECHANGE ORGANISATIE GROEISCAN
      </span>
    </div>
    <div class="table-container q-pb-sm">
      <template>
        <q-markup-table>
          <tr>
            <td>
              <div class="q-pa-sm">
                <q-input square outlined v-model="companyName" label="Company" />
              </div>
            </td>
            <td>
              <div class="q-pa-sm">
                <q-input square outlined v-model="companyDepartment" label="Company department" />
              </div>
            </td>
          </tr>
        </q-markup-table>

        <q-markup-table
          v-for="category in layout"
          class="table-category q-mt-xs"
          bordered
          :separator="separator"
          :square=true>
          <thead>
            <tr>
              <th class="column-answer">
                {{category.name}}
              </th>
              <th class="column-current">
                Zo is het nu
              </th>
              <th class="column-desired">
                Dit mag meer
              </th>
            </tr>
          </thead>

          <tbody>
          <template v-for="(category, categoryIndex) in category.subCategory">
            <tr class="row-category" @click="toggle(category)">
              <th class="header-subcategory" colspan="3">
                  {{category.subjectRank}}.{{category.subject}}
              </th>
            </tr>
            <tr
              v-for="(answer, answerIndex) in category.answers"
              class="answer"
              :class="getAnswerClass(answer)"
              :style="{ display: category.isCollapsed ? 'none' : '' }">
              <td class="column-answer">
                {{answer.answer}}
              </td>
              <td class="column-current">
                <q-radio v-model="answer.status" val="current" :name="`option-${categoryIndex}-${answerIndex}`"></q-radio>
              </td>
              <td class="column-desired">
                <q-radio v-model="answer.status" val="desired" :name="`option-${categoryIndex}-${answerIndex}`"></q-radio>
              </td>
            </tr>
          </template>
          </tbody>
        </q-markup-table>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .table-container {
    width: 100%;
    padding-left: 200px;
    padding-right: 200px;

    .table-category {

      .q-table {
        table-layout: fixed;
        width: 100%;

        .row-category {
          cursor: pointer;
        }

        th {
          &.header-subcategory {
            text-align: left;
            font-size: 18px;
            font-weight: bold;
          }

          &.column-answer {
            text-align: left;
            font-size: 24px;
            font-weight: bold;
          }

          &.column-current {
            width: 150px;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
          }

          &.column-desired {
            width: 150px;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
          }
        }

        td {
          &.column-answer {
            white-space: normal;
          }

          &.column-current {
            text-align: center;
          }

          &.column-desired {
            text-align: center;
          }
        }
      }
    }

    .answer {
      &.terrible {
        background-color: #F1948A;
      }

      &.bad {
        background-color: #F4D03F;
      }

      &.mediocre {
        background-color: #F5B041;
      }

      &.good {
        background-color: #ABEBC6;
      }

      &.excellent {
        background-color: #85C1E9;
      }
    }
  }
</style>
