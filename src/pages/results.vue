<script>
  import { DataService } from '../services/data-service'

  let id = 1

  export default {
    name: 'Results',

    data() {
      return {
        posts: [],
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

    methods: {
      uniqueIdentifier () {
        return id++
      }
    },

    created() {
      DataService.getSummary()
          .then(() => this.posts = DataService.posts)
    }
  }
</script>

<template>
  <div class="q-pa-lg">
    <q-table
      style="height: 1600px"
      class="sticky-header"
      :data="posts"
      :columns="columns"
      row-key="posts.subject"
      :pagination.sync= pagination
      :rows-per-page-options="[5,10,20,0]"
      virtual-scroll
      title="Questionaire results">

      <template v-slot:header="props">
        <q-tr>
          <q-th style="width: 300px;">
            Subject
          </q-th>
          <q-th style="text-align: left">
            Answers
          </q-th>
          <q-th style="width: 100px">
            Count
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props" class="subject-color">
          <q-td colspan="3">
            {{ props.row.subject}}
          </q-td>
        </q-tr>

        <q-tr :props="props" v-for="answer in props.row.answers" :key="uniqueIdentifier()">
          <template>
            <q-td> </q-td>
            <q-td>
              <div class="text-left">{{ answer.answer }}</div>
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
  @import "../css/results.scss";
</style>
