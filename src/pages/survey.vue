<script>
  import layout from '../public/survey.json'
  import { DataService } from '../services/index'

  let id = 1

  export default {
    name: 'Home',

    data () {
      return {
        groupCurrent: [],
        groupDesired: [],
        separator: 'vertical',
        companyName: '',
        companyDepartment: '',
        layout
      }

    },

    methods: {
      uniqueIdentifier () {
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
        const formData = new FormData(evt.target)

        const submitResult = []

        submitResult.push(
          { "Bij welk bedrijf ben je werkzaam?": this.companyName.toLowerCase() },
          { "Bij welke team ben je werkzaam?": this.companyDepartment.toUpperCase() }
        )

        for (const [name, value] of formData.entries()) {
          submitResult.push({
            [name] : value
          })
        }
        DataService.submitSurvey(submitResult)
        this.refreshSurvey()
      },

      refreshSurvey(){
        window.scrollTo(0,0);
        this.groupCurrent = []
        this.groupDesired = []
        this.companyName = ''
        this.companyDepartment = ''
      }
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
      <q-form @submit="onSubmit">
        <template>
          <q-markup-table>
            <tr>
              <td>
                <div class="q-pa-sm">
                  <q-input square
                           outlined
                           required
                           v-model="companyName"
                           label="Company" />
                </div>
              </td>
              <td>
                <div class="q-pa-sm">
                  <q-input square
                           required
                           outlined
                           v-model="companyDepartment"
                           label="Company department" />
                </div>
              </td>
            </tr>
          </q-markup-table>

          <q-markup-table
            v-for="category in layout"
            class="table-category q-mt-xs"
            bordered
            :separator="separator"
            :key="uniqueIdentifier()"
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
                  <q-option-group
                    size="lg"
                    color="black"
                    type="radio"
                    v-model="groupCurrent[`${categoryIndex}-${category.subject}-current`]"
                    :options="[
                      { label:'', value:`${answer.answer}`, name:`${category.subject} [Huidige situatie]` }
                    ]"
                  />
                </td>
                <td class="column-desired">
                  <q-option-group
                    size="lg"
                    color="black"
                    type="radio"
                    v-model="groupDesired[`${categoryIndex}-${category.subject}-desired`]"
                    :options="[
                      { label: '',value:`${answer.answer}`, name:`${category.subject} [Gewenste situatie]` }
                    ]"
                  />
                </td>
              </tr>
            </template>
            </tbody>
          </q-markup-table>

        <q-btn class="form-button-submit"
               type="submit"
               label="Submit survey"
               color="secondary"/>

      </template>
      </q-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .form-button-submit{
    width: 50%;
    margin-left: 25%;
    margin-top: 20px;
  }


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
            font-family: Verdana, sans-serif;
          }

          &.column-answer {
            text-align: left;
            font-size: 24px;
            font-weight: bold;
            font-family: Verdana, sans-serif;
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
            font-family: Verdana, sans-serif;
            font-size: 16px;
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
