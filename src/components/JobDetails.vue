<template>
  <div v-if="currentJob.id" class="edit-form">
    <h2>Update Job</h2>
    <form>
      <div class="form-group mb-2">
        <label for="position">Position</label>
        <input
          type="text"
          class="form-control"
          id="position"
          v-model="currentJob.position"
        />
      </div>
      <div class="form-group mb-2">
        <label for="company">Company</label>
        <input
          type="text"
          class="form-control"
          id="company"
          v-model="currentJob.company"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentJob.description"
        />
      </div>

    </form>
    
    <div class="buttons-wrapper mt-3">
        <button class="btn btn-danger mr-2" @click="deleteJob">
          Delete
        </button>

        <button class="btn btn-success" @click="updateJob">
          Update
        </button>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import JobsService from "@/services/JobsService";
import Job from "@/types/Job";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "job-details",
  data() {
    return {
      currentJob: {} as Job,
    };
  },
  methods: {

    updateJob() {
      JobsService.update(this.currentJob.id, this.currentJob)
        .then((response: ResponseData) => {
          this.$router.push({ path: '/jobs' })
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    
    getJob(id: any) {
      JobsService.get(id)
        .then((response: ResponseData) => {
          this.currentJob = response.data;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    deleteJob() {
      JobsService.delete(this.currentJob.id)
        .then((response: ResponseData) => {
          this.$router.push({ path: '/jobs' })
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getJob(this.$route.params.id);
  },
});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
.edit-form form{
  padding: 15px;
  border: 1px solid #bfbfbf;
  border-radius: 5px;
}
.buttons-wrapper {
  display: flex;
  justify-content: space-between;
}

.buttons-wrapper button {
  width: 48%;
}
</style>
