import VueYupValidation from './vue-yup-validation.vue'

export default {
    install: (app, options) => {
        app.component('VueYupValidation', VueYupValidation)
    }
}