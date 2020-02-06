<template>
  <div>
    <v-dialog v-model="dSignIn" persistent max-width="400px">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title class="headline">
            <strong>Sign In</strong>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <div>
            <v-icon @click="closeD">mdi-close</v-icon>
          </div>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="user.email"
                :type="'text'"
                :rules="[rules.required, rules.email]"
                label="E-mail *"
              ></v-text-field>

              <v-text-field
                v-model="user.password"
                :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required]"
                :type="showPwd ? 'text' : 'password'"
                name="input-10-1"
                label="Password *"
                @click:append="showPwd = !showPwd"
              ></v-text-field>
            </v-form>
            <p v-show="snackbar" class="red--text">{{text}}</p>
          </v-container>
        </v-card-text>
        <v-card-actions class="pb-6">
          <v-spacer></v-spacer>
          <v-btn :disabled="!valid" color="success" class="mr-2" @click="login">login</v-btn>
          <v-btn class="mr-4" @click="closeD">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
      <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "sign-in-form",
  props: ["dialogSignIn"],
  created() {
    this.dSignIn = this.dialogSignIn;
  },
  data() {
    return {
      showPwd: false,
      snackbar: false,
      text: "* The username or password is incorrect.",
      timeout: 3000,
      dSignIn: false,
      valid: true,
      user: {
        email: "",
        password: ""
      },
      rules: {
        required: value => !!value || "Required.",
        email: v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      }
    };
  },
  methods: {
    ...mapActions(["auth_login"]),
    login() {
      if (this.$refs.form.validate()) {
        // const { username, password } = this.user;
        // this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
        //   this.$router.push("/");
        // });
        this.auth_login(this.user).then(() => {
          if (this.isAuthenticated) {
            this.closeD();
          } else {
            this.snackbar = true;
          }
        });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    closeD() {
      this.dSignIn = false;
      this.snackbar = false;
      this.$emit("closeDSI", this.dSignIn);
    }
  },
  computed: mapGetters(["isAuthenticated"])
};
</script>

<style>
</style>