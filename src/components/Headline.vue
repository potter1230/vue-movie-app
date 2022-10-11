<template>
    <div class="container">
        <h1>
            <strong>OMDb API</strong><br>
            <span>
                The Open<br>
                Movie Database
            </span>
        </h1>
        <p>
            The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are contributed and maintained by our users.<br>
            If you find this service useful, please consider making a one-time donation or become a patron.
        </p>
    </div>
</template>

<style lang="scss" scoped>

.container {margin-top: 40px;}
h1{
    line-height: 1;
    font-family: "Oswald", sans-serif;
    font-size: 80px;
    strong {
        color: $primary
    }
    span {
        text-transform: uppercase;
    }
}
p {
    margin: 30px 0;
    color: $gray-600;
}
</style>