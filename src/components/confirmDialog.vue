<template>
  <!-- Confirm Dialog -->
  <div class="text-center">
    <v-dialog v-model="onDialog" width="500" persistent>
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title class="headline py-8">
            <div class="mx-auto">
              <strong>Are you Sure?</strong>
            </div>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <div>
            <v-icon @click="closeDialog">mdi-close</v-icon>
          </div>
        </v-toolbar>

        <div class="mx-auto" style="width:200px">
          <v-avatar size="200">
            <v-img :src="imageUrl" :alt="prizeDetail.image" cover />
          </v-avatar>
        </div>
        <v-card-text class="text-center body-1 pb-0 pt-5">Reedem for flyaway</v-card-text>
        <v-card-text class="text-center body-2">
          <strong>Quantity</strong>
          {{prizeDetail.quantity}}
        </v-card-text>
        <v-card-actions class="pb-5">
          <div class="mx-auto">
            <v-btn
              class="yellow darken-2 mx-2"
              width="100"
              rounded
              @click="updateQuantity(prizeDetail._id)"
              :disabled="prizeDetail.quantity == 0"
            >Yes</v-btn>
            <v-btn class="grey lighten-2 mx-2" width="100" rounded @click="closeDialog">Cancel</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import RewardsServices from "../services/rewards.services";

export default {
  props: ["dialog", "prize"],
  data() {
    return {
      onDialog: false,
      openS: false,
      openE: false
    };
  },
  created() {
    this.onDialog = this.dialog;
  },
  methods: {
    updateQuantity(id) {
      RewardsServices.updateQuantityById(id).then(result => {
        if (result) {
          this.openS = true;
        } else {
          this.openE = true;
        }
        this.closeDialog();
      });
    },
    closeDialog() {
      this.onDialog = false;
      this.$emit("closePrizeD", {
        onDialog: false,
        openS: this.openS,
        openE: this.openE
      });
    }
  },
  computed: {
    prizeDetail() {
      return this.prize;
    },
    imageUrl() {
      return require(`@/assets/img/${this.prizeDetail.image}.jpg`);
    }
  }
};
</script>

<style>
</style>