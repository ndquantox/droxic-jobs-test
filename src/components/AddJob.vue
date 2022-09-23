<template>
  <div class="submit-form">
    <h2>Add New Job</h2>
    <div v-if="!submitted">
      <div class="form-group">
        <label for="position">Position</label>
        <input
          type="text"
          class="form-control"
          id="position"
          required
          v-model="job.position"
          name="position"
        />
      </div>

      <div class="form-group">
        <label for="company">Company</label>
        <input
          class="form-control"
          id="company"
          required
          v-model="job.company"
          name="company"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="job.description"
          name="description"
        />
      </div>

      <button @click="saveJob" class="btn btn-success mt-3">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newJob">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import JobsService from "@/services/JobsService";
import Job from "@/types/Job";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "add-job",
  data() {
    return {
      job: {
        id: null,
        position: "",
        company: "",
        description: "",
      } as Job,
      submitted: false,
      perPage: 4
    };
  },
  methods: {
    saveJob() {
      let data = {
        position: this.job.position,
        company: this.job.company,
        description: this.job.description,
      };

      JobsService.create(data)
        .then((response: ResponseData) => {
          this.job.id = response.data.id;
          this.submitted = true;
          this.$router.push({ name: "jobs" });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    newJob() {
      this.submitted = false;
      this.job = {} as Job;
    },
  },
});
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}

.submit-form button{
  width: 100%;
}
</style>
