<template>
	<form @submit.prevent="submit">
		<slot :errors="errors"></slot>
	</form>
</template>

<script>
	import { isEqual } from "lodash";

	export default {
		data() {
			return {
				errors: {},
				oldValues: { ...this.values },
			};
		},
		name: "vue-yup-validation",
		props: {
			schema: {
				required: true,
				type: Object,
			},
			onSubmit: {
				required: true,
				type: Function,
			},
			values: {
				required: true,
				type: Object,
			},
			validFieldOnChange: {
				required: false,
				type: Boolean,
				default: true,
			},
		},
		methods: {
			validate(field) {
				return this.schema
					.validateAt(field, this.values)
					.then(() => {
						this.errors[field] = "";
					})
					.catch((err) => {
						this.errors[field] = err.message;
					});
			},
			validateForm() {
				this.errors = {};
				return this.schema
					.validate(this.values, { abortEarly: false })
					.then(() => {
						return true;
					})
					.catch((err) => {
						err.inner.forEach((error) => {
							this.errors[error.path] = error.message;
						});
						return false;
					});
			},
			async submit() {
				if (await this.validateForm()) {
					this.onSubmit(this.values);
				}
			},
		},
		watch: {
			values: {
				handler() {
					if (!this.validFieldOnChange) {
						return;
					}
					for (const propriety of Object.keys(this.values)) {
						if (!isEqual(this.oldValues[propriety], this.values[propriety])) {
							this.validate(propriety);
						}
					}
					this.oldValues = { ...this.values };
				},
				deep: true,
			},
		},
	};
</script>
