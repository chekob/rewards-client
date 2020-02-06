<template>
  <v-container>
    <v-row justify="space-around">
      <v-col col="12" sm="6">
        <v-img :src="imgUrl" cover height="330" />
      </v-col>
      <v-col col="12" sm="6">
        <v-card class="mx-auto" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1 text-center mt-5">
                <strong>{{prizeDetail.name}}</strong>
              </v-list-item-title>
              <v-divider class="my-5 flex-out"></v-divider>
              <br />
              <v-btn
                rounded
                max-width="100"
                class="yellow darken-1 px-5 mx-auto"
                v-on:click="openModal(prizeDetail._id)"
                :disabled="prizeDetail.quantity == 0"
              >Reedem</v-btn>
              <v-divider class="my-5 flex-out"></v-divider>
              <p
                class="text-center"
                :class="{'red--text': (prizeDetail.quantity == 0)}"
              >{{prizeDetail.quantity}} left in stock</p>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-divider class="my-5"></v-divider>
    <v-row justify="space-around">
      <v-col col="12" sm="2">
        <h2>
          <strong>Description</strong>
        </h2>
      </v-col>
      <v-col col="12" sm="10">
        <p class="body-1">{{prizeDetail.description}}</p>
      </v-col>
    </v-row>

    <!-- Confirm Dialog -->
    <confirmDialog
      :dialog="dialog"
      :prize="prizeDetail"
      v-if="dialog"
      @closePrizeD="closePrizeD($event)"
    ></confirmDialog>

    <!-- Dialog Success or Error -->
    <congratsDialog :openS="openS" :openE="openE" @closeSE="closeSE($event)" v-if="openS || openE"></congratsDialog>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
      <v-btn color="green" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import RewardsServices from "../services/rewards.services";
import confirmDialog from "../components/confirmDialog";
import congratsDialog from "../components/congratsDialog";
import { mapGetters } from "vuex";

export default {
  name: "PrizeDetail",
  components: { confirmDialog, congratsDialog },
  data: () => ({
    prizeDetail: {},
    imgUrl: "",
    openS: false,
    openE: false,
    dialog: false,
    msn: "",
    error: "",
    quantity: 0,
    text: "",
    timeout: 3000,
    snackbar: false
  }),
  beforeRouteEnter(to, from, next) {
    RewardsServices.getRewardById(to.params.id).then(
      prize => {
        next(vm => {
          vm.setData(prize);
        });
      },
      error => {
        next(vm => {
          vm.setError(error);
        });
      }
    );
  },
  methods: {
    openModal() {
      if (this.isAuthenticated) {
        this.dialog = true;
      } else {
        this.text = "Sign in is necesary to redeem prizes!";
        this.snackbar = true;
      }
    },
    setData(prize) {
      this.prizeDetail = prize;
      this.imgUrl = require(`@/assets/img/${prize.image}.jpg`);
    },
    setQuantity(quantity) {
      this.quantity = quantity;
    },
    setError(err) {
      this.error = err;
    },
    closePrizeD(event) {
      this.dialog = event.onDialog;
      this.openS = event.openS;
      this.openE = event.openE;
    },
    closeSE(event) {
      this.openS = event;
      this.openE = event;
    }
  },
  updated() {
    RewardsServices.getRewardById(this.prizeDetail._id).then(
      result => {
        this.setData(result);
      },
      error => {
        this.setError(error);
      }
    );
  },
  computed: mapGetters(["isAuthenticated"])
};
</script>

<style>
.flex-out {
  flex: 1 0 100% !important;
}
</style>