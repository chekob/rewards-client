<template>
  <div>
    <v-dialog v-model="dSignOut" persistent max-width="400px">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title class="headline">
            <strong>Sign Out</strong>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <div>
            <v-icon @click="closeD">mdi-close</v-icon>
          </div>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <p>Are you sure to sign out?</p>
          </v-container>
        </v-card-text>
        <v-card-actions class="pb-6">
          <v-spacer></v-spacer>
          <v-btn color="success" class="mr-2" @click="fLogout">logout</v-btn>
          <v-btn class="mr-4" @click="closeD">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "sign-out-form",
  props: ["dialogSignOut"],
  created() {
    this.dSignOut = this.dialogSignOut;
  },
  data() {
    return {
      text: "User created successfully!",
      timeout: 3000,
      dSignOut: false
    };
  },
  methods: {
    ...mapActions(["logout"]),
    fLogout() {
      this.logout().then(() => {
        this.closeD();
      });
    },
    closeD() {
      this.dSignOut = false;
      this.$emit("closeDSOut", this.dSignOut);
    }
  }
};
</script>

<style>
</style>