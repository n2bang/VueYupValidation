# Vue Yup Validation :heart_eyes:

## Sobre

Uma simples integração do Yup com vue 3

## Instalação

```bash
   npm install vue-yup-validation
```

## Como utilizar ?

```vue
   <template>
	<vue-yup-validation
		:schema="schema"
		@submit="submit"
		:values="values"
        :validFieldOnChange="true"
		v-slot="{ errors }"
	>
		<h2>Form</h2>
		<label for="fname">First name:</label>
		<br />
		<input type="text" id="fname" name="fname" v-model="values.fname" />
		<p>
			<span v-if="errors?.fname" class="errors"> {{ errors?.fname }} </span>
		</p>
		<label for="lname">Last name:</label>
		<br />
		<input type="text" id="lname" name="lname" v-model="values.lname" />
		<p>
			<span v-if="errors?.lname" class="errors"> {{ errors?.lname }} </span>
		</p>
		<input type="submit" value="Submit" />
	</vue-yup-validation>
</template>

<script>
	import * as yup from "yup";
	import VueYupValidation from "./components/index";
	export default {
		components: {
			VueYupValidation,
		},
		data() {
			return {
				schema: yup.object().shape({
					fname: yup.string().required().min(5),
					lname: yup.string().required().min(5),
				}),
				values: {
					fname: "",
					lname: "",
				},
			};
		},
		methods: {
			submit(values) {
				alert("success");
				console.log({ values });
			},
		},
	};
</script>

<style>
	.errors {
		color: red;
	}
</style>
```


