<template>
  <v-content class="pt-0">
    <p class="text-center my-6 title">Here is the full list of prizes that you can win.</p>
    <v-row no-gutters>
      <!-- Show Rewards -->
      <v-col
        cols="12"
        sm="4"
        class="px-3 py-3"
        v-for="(prize, index) in rewards"
        v-bind:item="prize"
        v-bind:index="index"
        v-bind:key="prize._id"
      >
        <v-card class="mx-auto" max-width="400" height="400">
          <v-img class="white--text align-end" height="200px" :src="prize.image"></v-img>
          <v-card-text class="text--primary">
            <h2 class="text-center my-8">{{prize.name}}</h2>
          </v-card-text>
          <v-card-actions>
            <v-btn
              rounded
              class="yellow darken-1 px-5 mx-auto"
              large
              v-on:click="prizeDetail(prize._id)"
            >Reedem</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
import RewardsServices from "../services/rewards.services";

export default {
  name: "RewardsComponent",
  data() {
    return {
      rewards: [],
      error: "",
      text: ""
    };
  },
  async created() {
    try {
      this.rewards = await RewardsServices.getRewards();
      this.rewards.map(prize => {
        prize.image = require(`@/assets/img/${prize.image}.jpg`);
      });
    } catch (error) {
      this.error = error.message;
    }
  },
  methods: {
    prizeDetail: function(id) {
      this.$router.push({
        name: "PrizeDetail",
        params: { id: id }
      });
    }
  }
};
</script>
