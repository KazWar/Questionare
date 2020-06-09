<script>
  import { DataService } from '../services/index'

  let id = 1

  export default {
    name: 'Results',

    data() {
      return {
        dense: false,
        posts : [],
        errors: [],
        columns: [
          {
            name: posts => posts.subject,
            required: true,
            label:'Question subject',
            field: posts => posts.subject,
            align:'left',
            sortable: true
          },
          { name: 'answers', align: 'left', label: 'Answers'},
          { name: 'counter', align: 'center', label: 'Counter'}
        ],
        pagination: {
          rowsPerPage: 5
        }
      }
    },

    computed: {
      company () {
        return this.$route.params.company
      },

      department () {
        return this.$route.params.department
      },

      results () {
        return DataService.getResults(this.company, this.department)
      }
    },

    methods: {
      uniqueIdentifier () {
        return id++
      }
    },

    mounted(){
      this.posts = this.results
    }
  }
</script>

<template>
  <div class="q-pa-lg">
    <q-markup-table class="table-company-info">
      <tr>
        <td>
          <div class="q-pa-sm">
            <q-input
              filled
              readonly
              square
              outlined
              class="input-label-company"
              label="Company Name"
              v-model="company"
              :dense="dense"/>
          </div>
        </td>
        <td>
          <div class="q-pa-sm">
            <q-input
              filled
              readonly
              square
              outlined
              class="input-label-company"
              label="Company department"
              v-model="department"
              :dense="dense" />
          </div>
        </td>
      </tr>
    </q-markup-table>


    <q-table
      class="table-results"
      :data="results"
      :columns="columns"
      row-key="posts.subject"
      :pagination.sync= pagination
      :rows-per-page-options="[5,10,20,0]"
      virtual-scroll
      title="Questionaire results">

      <template v-slot:header="props">
        <q-tr class="results-header">
          <q-th class="results-header-subject">
            Subject
          </q-th>
          <q-th class="results-header-answers">
            Answers
          </q-th>
          <q-th class="results-header-count">
            Count
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props" class="subject-color">
          <q-td class="subject-text" colspan="3">
            {{ props.row.subject}}
          </q-td>
        </q-tr>

        <q-tr class="results-row" :props="props" v-for="answer in props.row.answers" :key="uniqueIdentifier()">
          <template>
            <q-td> </q-td>
            <q-td class="results-row-answer">
              <div>{{ answer.answer }}</div>
            </q-td>
            <q-td>
              <div class="text-center">{{answer.counter}}</div>
            </q-td>
          </template>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<style lang="scss" scoped>
  .table-company-info{
    margin-bottom: 5px;
    padding: 2px;

    tr {
      td {
        .input-label-company {
          font-size: large;
        }
      }
    }
  }


  .subject-color{
    background: #b2d8d8;

    td {
      &.subject-text{
        font-size: medium;
        font-family: Verdana,sans-serif;
      }
    }
  }

  .table-results{
    font-family: Verdana, sans-serif;

    thead tr:first-child{
      background-color: #66b2b2;
    }

    tr{
      &.results-header{
        th {
          font-size: x-large;

          &.results-header-subject{
            width: 300px;
          }

          &.results-header-answers{
            text-align: left
          }

          &.results-header-count{
            width: 100px;
          }
        }
      }

      &.results-row{
        td{
          font-size: medium;

          &.results-row-answer{
          }
        }
      }
    }
  }
</style>
