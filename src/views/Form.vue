<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Specialization</v-toolbar-title>
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
                            <v-toolbar-title>Doctor</v-toolbar-title>
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
                            <v-toolbar-title>Date</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-date-picker
                                    v-model="form.date"
                                    full-width
                                    landscape
                                    :min="minDateOfVisit"
                                    class="mt-3"
                            ></v-date-picker>
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Time</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            There will be time picker
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Personal data</v-toolbar-title>
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
                                <v-date-picker
                                        :max="maxDobDate"
                                        v-model="form.dob"
                                        scrollable
                                >
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
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Service form</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-select
                                    :items="serviceForms"
                                    item-text="text"
                                    item-value="value"
                                    label="Service form"
                                    v-model="form.service"
                            ></v-select>
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-12"
                            v-if="isInsuranceService"
                    >
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Insurance details</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-select
                                    :items="insuranceCompanies"
                                    label="Insurance Company"
                                    v-model="form.insuranceCompany"
                            ></v-select>
                            <v-text-field
                                    label="Insurance policy number"
                                    type="text"
                                    v-model="form.insurancePolicyNumber"
                            ></v-text-field>
                            <v-dialog
                                    ref="insurancePolicyStartDate"
                                    v-model="insurancePolicyStartDateModal"
                                    :return-value.sync="form.insurancePolicyStartDate"
                                    persistent
                                    lazy
                                    full-width
                                    width="290px"
                            >
                                <v-text-field
                                        slot="activator"
                                        v-model="form.insurancePolicyStartDate"
                                        label="Insurance Policy Start Date"
                                        readonly
                                ></v-text-field>
                                <v-date-picker v-model="form.insurancePolicyStartDate" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="insurancePolicyStartDateModal = false">Cancel</v-btn>
                                    <v-btn flat color="primary" @click="$refs.insurancePolicyStartDate.save(form.insurancePolicyStartDate)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>
                            <v-dialog
                                    ref="insurancePolicyEndDate"
                                    v-model="insurancePolicyEndDateModal"
                                    :return-value.sync="form.insurancePolicyEndDate"
                                    persistent
                                    lazy
                                    full-width
                                    width="290px"
                            >
                                <v-text-field
                                        slot="activator"
                                        v-model="form.insurancePolicyEndDate"
                                        label="Insurance Policy End Date"
                                        readonly
                                ></v-text-field>
                                <v-date-picker
                                        :min="insurancePolicyEndDateMin"
                                        v-model="form.insurancePolicyEndDate"
                                        scrollable
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="insurancePolicyEndDateModal = false">Cancel</v-btn>
                                    <v-btn flat color="primary" @click="$refs.insurancePolicyEndDate.save(form.insurancePolicyEndDate)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-12"
                            v-if="isContractService"
                    >
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Contract details</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-text-field
                                    label="Enterprise name"
                                    type="text"
                                    v-model="form.contractEnterpriseName"
                            ></v-text-field>
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Notes</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-textarea
                                    auto-grow
                                    label="Notes"
                                    v-model="form.notes"
                            ></v-textarea>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
  import moment from 'moment'

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
          dob: null,
          nationality: null,
          gender: null,
          address: '',
          phone: '',
          email: '',
          service: null,
          notes: '',
          insuranceCompany: null,
          insurancePolicyNumber: '',
          insurancePolicyStartDate: null,
          insurancePolicyEndDate: null,
          contractEnterpriseName: ''
        },
        insuranceCompanies: [
          'Company 1',
          'Company 2',
          'Company 3',
          'Company 4',
          'Company 5',
        ],
        insurancePolicyEndDateModal: false,
        insurancePolicyStartDateModal: false,
        serviceForms: [
          {text: 'Paid', value: 'paid'},
          {text: 'Medical insurance', value: 'insurance'},
          {text: 'Under contract with the enterprise', value: 'contract'},
        ],
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
    computed: {
      insurancePolicyEndDateMin: function () {
        return this.form.insurancePolicyStartDate === null
          ? undefined
          : moment(this.form.insurancePolicyStartDate).add(1, 'day').format('YYYY-MM-DD')
      },
      isInsuranceService: function () {
        return this.form.service === 'insurance'
      },
      isContractService: function () {
        return this.form.service === 'contract'
      },
      maxDobDate: function () {
        return moment().format('YYYY-MM-DD')
      },
      minDateOfVisit: function () {
        return moment().format('YYYY-MM-DD')
      }
    },
    watch: {
      'form.service': function (currentService) {
        switch (currentService) {
          case 'paid': {
            this.resetContractInformation();
            this.resetInsuranceInformation();
            break;
          }
          case 'insurance': {
            this.resetContractInformation();
            break;
          }
          case 'contract': {
            this.resetInsuranceInformation();
            break;
          }
        }
      }
    },
    methods: {
      resetContractInformation () {
        this.form.contractEnterpriseName = ''
      },
      resetInsuranceInformation () {
        this.form.insuranceCompany = null;
        this.form.insurancePolicyNumber = '';
        this.form.insurancePolicyStartDate = null;
        this.form.insurancePolicyEndDate = null
      },
      apply () {
        return true
      }
    }
  }
</script>

<style scoped>

</style>
