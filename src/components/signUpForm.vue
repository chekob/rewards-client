<template>
  <div>
    <v-dialog v-model="dSignUp" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closeD(false)">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title>
            <strong>Sign Up Form</strong>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="closeD(false)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-title>
          <v-container>
            <span class="headline">
              <strong>Sign up in Razz-Rewards to redeem prizes.</strong>
            </span>
          </v-container>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="user.name"
                :counter="10"
                :type="'text'"
                :rules="[rules.minName,rules.required]"
                label="Name *"
              ></v-text-field>

              <v-text-field
                v-model="user.email"
                :type="'text'"
                :rules="[rules.required, rules.email]"
                label="E-mail *"
                counter
              ></v-text-field>

              <v-text-field
                v-model="user.password"
                :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="showPwd ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                hint="At least 6 characters"
                counter
                @click:append="showPwd = !showPwd"
              ></v-text-field>

              <v-text-field
                v-model="rePwd"
                :append-icon="showRePwd ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min, rules.pwdMatch]"
                :type="showRePwd ? 'text' : 'password'"
                name="input-10-1"
                label="Confirm Password"
                hint="At least 6 characters"
                counter
                @click:append="showRePwd = !showRePwd"
              ></v-text-field>

              <v-checkbox
                v-model="checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="Do you agree? *"
                required
              ></v-checkbox>
            </v-form>
            <small>*indicates required field</small>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Submit</v-btn>
            <v-btn color="error" class="mr-4" @click="reset">Clear</v-btn>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
      <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import UserService from "../services/users.service";

export default {
  name: "sign-up-form",
  props: ["dialogSignUp"],
  created() {
    this.dSignUp = this.dialogSignUp;
  },
  data() {
    return {
      showPwd: false,
      showRePwd: false,
      snackbar: false,
      text: "",
      timeout: 3000,
      dSignUp: false,
      valid: true,
      rePwd: "",
      user: {
        name: "",
        email: "",
        password: ""
      },
      rules: {
        required: value => !!value || "Required.",
        minName: v => (v && v.length <= 10) || "Required",
        email: v => /.+@.+\..+/.test(v) || "E-mail must be valid",
        min: v => (v && v.length >= 6) || "Min 6 characters",
        pwdMatch: v => this.user.password === v || "Password dont match"
      },
      checkbox: false
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        UserService.findUser(this.user.email).then(
          result => {
            if (result) {
              this.snackbar = true;
              this.text = "User already exists!";
            } else {
              UserService.createUser(this.user).then(
                result => {
                  if (result === "ok") {
                    this.reset();
                    this.closeD(true);
                  }
                },
                error => {
                  console.log(error);
                }
              );
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    closeD(snack) {
      this.dSignUp = false;
      this.$emit("closeDSU", { dSignUp: this.dSignUp, snack: snack });
    }
  },
  computed: {}
};
</script>

<style>
</style>