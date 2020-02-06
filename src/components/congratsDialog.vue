<template>
  <div>
    <!-- Congrats Dialog -->
    <div class="text-center">
      <v-dialog v-model="openSuccess" width="500">
        <v-card>
          <v-card-title class="headline pt-8 pb-4" primary-title>
            <strong class="mx-auto">Congratulation!</strong>
          </v-card-title>
          <v-card-text class="text-center body-1 pb-0 pt-5">You reedemed</v-card-text>
          <v-card-text class="text-center body-1">Flyaway.</v-card-text>
          <v-card-actions class="pb-8">
            <div class="mx-auto">
              <v-btn class="yellow darken-2 mx-2" rounded v-on:click="goTo()">More Prizes</v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <!-- Error Dialog -->
    <div class="text-center">
      <v-dialog v-model="openError" width="500">
        <v-card>
          <v-card-title class="headline pt-8 pb-4" primary-title>
            <strong class="mx-auto">Ups!</strong>
          </v-card-title>
          <v-card-text class="text-center body-1 pb-0 pt-5">Sorry your redeemed was not posible.</v-card-text>
          <v-card-text class="text-center body-1 pb-0">
            There is
            <strong>0</strong> left stock.
          </v-card-text>
          <v-card-text class="text-center body-1">Go to more prizes and try again.</v-card-text>
          <v-card-actions class="pb-8">
            <div class="mx-auto">
              <v-btn class="yellow darken-2 mx-2" rounded v-on:click="goTo()">More Prizes</v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  props: ["openS", "openE"],
  data() {
    return {
      openSuccess: false,
      openError: false
    };
  },
  created() {
    this.openSuccess = this.openS;
    this.openError = this.openE;
  },
  methods: {
    goTo() {
      this.openSuccess = false;
      this.openError = false;
      this.$emit("closeSE", false);
      this.$router.push({ name: "Rewards" });
    }
  }
};
</script>

<style>
</style>