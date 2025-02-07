<template>
    <div>
        <h1>Bienvenido a Inertia.js con Vue.js</h1>
        <p>{{ message }}</p>
    </div>
</template>

<script>
export default {
    props: {
        message: String
    }
}
</script>

<style scoped>
h1 {
    color: #42b983;
}
</style>
</template>