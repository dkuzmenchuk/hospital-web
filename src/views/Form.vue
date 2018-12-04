<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>SPECIALIZATION</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                           <v-select
                                   :items="specializations"
                                   label="Specialization"
                                   v-model="form.specialization"
                           ></v-select>
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>DOCTOR</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-select
                                    :items="doctors"
                                    label="Doctor"
                                    v-model="form.doctor"
                            ></v-select>
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>DATE</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-date-picker
                                    v-model="form.date"
                                    full-width
                                    landscape
                                    class="mt-3"
                            ></v-date-picker>
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>TIME</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            There will be time picker
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>PERSONAL DATA</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-text-field
                                    label="First Name"
                                    type="text"
                                    v-model="form.firstName"
                            ></v-text-field>
                            <v-text-field
                                    label="Middle Name"
                                    type="text"
                                    v-model="form.middleName"
                            ></v-text-field>
                            <v-text-field
                                    label="Last Name"
                                    type="text"
                                    v-model="form.lastName"
                            ></v-text-field>
                            <v-dialog
                                    ref="dobDialog"
                                    v-model="dobModal"
                                    :return-value.sync="form.dob"
                                    persistent
                                    lazy
                                    full-width
                                    width="290px"
                            >
                                <v-text-field
                                        slot="activator"
                                        v-model="form.dob"
                                        label="Date of Birth"
                                        readonly
                                ></v-text-field>
                                <v-date-picker v-model="form.dob" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="dobModal = false">Cancel</v-btn>
                                    <v-btn flat color="primary" @click="$refs.dobDialog.save(form.dob)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>
                            <v-select
                                    :items="genders"
                                    label="Gender"
                                    v-model="form.gender"
                            ></v-select>
                            <v-select
                                    :items="countries"
                                    label="Nationality"
                                    v-model="form.nationality"
                            ></v-select>
                            <v-text-field
                                    label="Address"
                                    type="text"
                                    v-model="form.address"
                            ></v-text-field>
                            <v-text-field
                                    label="Phone"
                                    type="text"
                                    v-model="form.phone"
                            ></v-text-field>
                            <v-text-field
                                    label="Email"
                                    type="text"
                                    v-model="form.email"
                            ></v-text-field>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'Form',
    data () {
      return {
        countries: [
          'Belarus',
          'Russia',
          'Ukraine'
        ],
        dobModal: false,
        genders: [
          'Male',
          'Female',
        ],
        form: {
          specialization: null,
          doctor: null,
          date: moment().format('YYYY-MM-DD'),
          firstName: '',
          lastName: '',
          middleName: '',
          dob: moment().format('YYYY-MM-DD'),
          nationality: null,
          gender: null,
          address: '',
          phone: '',
          email: '',
        },
        specializations: [
            'Abdominal Radiology Radiology-Diagnostic',
            'Addiction Psychiatry Psychiatry',
            'Adolescent Medicine Pediatrics',
            'Adult Cardiothoracic Anesthesiology Anesthesiology',
            'Adult Reconstructive Orthopaedics Orthopaedic Surgery',
            'Advanced Heart Failure & Transplant Cardiology Internal Medicine',
            'Allergy & Immunology',
            'Anesthesiology',
        ],
        doctors: [
          'Doctor 1',
          'Doctor 2',
          'Doctor 3',
          'Doctor 4',
          'Doctor 5',
        ]
      }
    },
    methods: {
      apply () {
        return true
      }
    }
  }
</script>

<style scoped>

</style>