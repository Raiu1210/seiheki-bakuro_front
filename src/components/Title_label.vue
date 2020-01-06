<template>
    <h1>{{title}}</h1>
</template>

<script>
export default {
    props: {
        title: String
    }
}
</script>

<style>
  h1 {
    position: relative;
    color: #ff3cef;
    font-size: 20px;
    padding: 10px 0;
    text-align: center;
    margin: 1.5em 0;
  }
  h1:before {
    content: "";
    position: absolute;
    top: -8px;
    left: 50%;
    width: 150px;
    height: 58px;
    border-radius: 50%;
    border: 5px solid #f15ad8;
    border-left-color: transparent;
    border-right-color: transparent;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
</style>