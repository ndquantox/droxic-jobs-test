<template>
  <div class="list row">
    <h2>Jobs List</h2>
    <div class="col-md-6">
      <div class="list-group">

        <div 
          class="list-item"
          :class="{ active: index == currentIndex }"
          v-for="(job, index) in displayedJobs"
          :key="index">
        {{ job.position }} at {{ job.company }}
        <img src="@/assets/info.svg" alt="info" @click="setActiveJob(job, index)">
        </div>

        <div class="pagination-wrapper mb-4">
          <button @click="backPage" v-if="jobs.length > 4">prev</button>
          <button
            v-for="job in Math.ceil(jobs.length / perPage)"
            :key="job"
            @click="() => goToPage(job)"
          >
            {{ job }}
          </button>
          <button @click="nextPage" v-if="jobs.length > 4">next</button>
        </div>
        
      </div>

      <button class="btn btn-sm btn-danger btn-remove" @click="removeAllJobs">
        Remove All
      </button>

      <JsonCSV :data="jobs" class="export mt-2">
        Export Jobs list
      </JsonCSV>
    </div>

    <div class="col-md-6">
      <div v-if="currentJob.id" class="detail-card">
        <router-link
          :to="'/jobs/' + currentJob.id"
          ><img src="@/assets/edit.svg" alt=""></router-link
        >
        <h4>Job Details</h4>
        <div class="job-item">
          <label><strong>Position:</strong></label> {{ currentJob.position }}
        </div>
        <div class="job-item">
          <label><strong>Company:</strong></label>
          {{ currentJob.company }}
        </div>
        <div class="job-item">
          <label><strong>Description:</strong></label>
          {{ currentJob.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import JobsService from "@/services/JobsService";
import 'vue-json-csv'
import Job from "@/types/Job";
import ResponseData from "@/types/ResponseData";
import JsonCSV from 'vue-json-csv'

export default defineComponent({
  name: "jobs-list",
  
  data() {
    return {
      jobs: [] as Job[],
      displayedJobs: [] as Job[],
      currentJob: {} as Job,
      currentIndex: -1,
      title: "",
      perPage: 4,
      page: 1
    };
  },
  components: {
    JsonCSV
  },
  methods: {
    retrieveJobs() {
      JobsService.getAll()
        .then((response: ResponseData) => {
          this.jobs = response.data;
          this.setPaginationData();
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveJobs();
      this.currentJob = {} as Job;
      this.currentIndex = -1;
    },

    setPaginationData() {
      this.displayedJobs = this.jobs.slice((this.page - 1) * this.perPage, this.page * this.perPage)
    },

    nextPage() {
      if (this.page !== Math.ceil(this.jobs.length / this.perPage)) {
        this.page += 1;
      }
      this.setPaginationData();
    },

    backPage() {
      if (this.page !== 1) {
        this.page -= 1;
      }
      this.setPaginationData();
    },

    goToPage(numPage: number) {
      this.page = numPage;
      this.setPaginationData();
    },

    setActiveJob(job: Job, index = -1) {
      this.currentJob = job;
      this.currentIndex = index;
    },

    removeAllJobs() {
      JobsService.deleteAll()
        .then((response: ResponseData) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveJobs();
  },
});
</script>

<style>
h2 {
  margin-bottom: 25px;
}

.list {
  text-align: center;
  max-width: 750px;
  margin: auto;
  margin-top: 40px;
}
.list-item {
  margin-bottom: 15px;
  border: 1px solid #bfbfbf;
  padding: 10px;
  border-radius: 5px;
  position: relative;
}
.list-item.active {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border: 2px solid #19c2bd;
}
.list-item img {
  position: absolute;
  width: 20px;
  right: 10px;
  top: 12px;
  cursor: pointer;
}
.detail-card {
  border: 1px solid #bfbfbf;
  padding: 15px;
  border-radius: 5px;
  position: relative;
}
.detail-card img {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
}
.job-item {
  margin-bottom: 7px;
}
.job-item:last-of-type {
  margin-bottom: 0;
}
.pagination-wrapper {
  text-align: center;
}
.pagination-wrapper button {
  margin-right: 10px;
  min-width: 40px;
  min-height: 40px;
  border: 1px solid #666;
  background-color: #ebebeb;
}
.btn-remove {
  width: 100%;
}
.export {
  width: 100%;
  height: 30px;
  background-color: #19c2bd;
  color: white;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
