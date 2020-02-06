<template>
  <v-app>
    <v-app-bar app color="white">
      <div class="d-flex align-center">
        <v-btn text class="px-0 mx-0" v-on:click="goTo()">
          <v-img
            alt="Logo"
            class="shrink mr-2"
            contain
            src="@/assets/logo.png"
            transition="scale-transition"
            width="100"
          />
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <div v-show="!isAuthenticated">
        <v-btn text v-on:click="openSignIn" color="success">
          <span class="mr-2">Sign In</span>
        </v-btn>
        <v-btn text v-on:click="openSignUp" color="warning">
          <span class="mr-2">Sign up</span>
        </v-btn>
        <v-icon @click="goTo" class="ml-2" color="black">mdi-home</v-icon>
      </div>
      <div v-show="isAuthenticated">
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" class="ma-2" outlined>
              {{getUserName}}
              <v-icon right>mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-on:click="openSignOut">
              <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <v-content>
      <v-container>
        <v-card>
          <v-toolbar flat class="blue" height="150">
            <v-toolbar-title class="white--text mx-auto">
              <h2>Rewards</h2>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text class="grey lighten-3">
            <v-sheet class="mx-auto grey lighten-3">
              <router-view></router-view>

              <v-snackbar v-model="snackbar" :timeout="timeout">
                {{ text }}
                <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
              </v-snackbar>
            </v-sheet>
          </v-card-text>
        </v-card>

        <signUpForm :dialogSignUp="openDSignUp" v-if="openDSignUp" @closeDSU="closeDSU($event)"></signUpForm>
        <signInForm :dialogSignIn="openDSignIn" v-if="openDSignIn" @closeDSI="closeDSI($event)"></signInForm>

        <signOutForm
          :dialogSignOut="openDSignOut"
          v-if="openDSignOut"
          @closeDSOut="closeDSOut($event)"
        ></signOutForm>
      </v-container>
    </v-content>

    <v-card height="200px">
      <v-footer
        color="black lighten-2"
        v_bind:padless="false"
        v-bind:absolute="false"
        height="200px"
      >
        <v-row justify="center" no-gutters>
          <v-col class="py-4 text-center white--text" cols="12">
            <strong>Terms and Conditions | Privacy Policy | {{ new Date().getFullYear() }}</strong>
          </v-col>
        </v-row>
      </v-footer>
    </v-card>
  </v-app>
</template>

<script>
import SignUpForm from "./components/signUpForm";
import SignInForm from "./components/signInForm";
import SignOutForm from "./components/signOutForm";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: { SignUpForm, SignInForm, SignOutForm },
  data() {
    return {
      component: "PrizeDetail",
      openDSignUp: false,
      openDSignIn: false,
      openDSignOut: false,
      snackbar: false,
      timeout: 5000,
      text: "User created successfully!"
    };
  },
  created() {
    window.addEventListener(
      "beforeunload",
      () => {
        this.logout().then(() => {
          console.log("ok");
        });
      },
      false
    );
  },
  methods: {
    ...mapActions(["logout"]),
    openSignUp() {
      this.openDSignUp = true;
    },
    openSignIn() {
      this.openDSignIn = true;
    },
    openSignOut() {
      this.openDSignOut = true;
    },
    goTo() {
      this.$router.push({ name: "Rewards" });
    },
    closeDSU(event) {
      if (event.snack) {
        this.snackbar = event.snack;
      }
      this.openDSignUp = event.dSignUp;
    },
    closeDSI(event) {
      this.openDSignIn = event;
    },
    closeDSOut(event) {
      this.openDSignOut = event;
    }
  },
  computed: mapGetters(["isAuthenticated", "getUserName"])
};
</script>