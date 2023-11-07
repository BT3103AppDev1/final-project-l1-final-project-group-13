<template>
    <div id="title">
      <h1>BT3103 Team 13</h1>
    </div>
  
    <div id="studygroupnavbar">
    <button id="homepagebutton">
          Home Page
      </button>
      <button id="calendarbutton">
          Calendar
      </button>
      <button id="filesbutton">
          Files 
      </button>
      <button id="requestsbutton">
          Requests
      </button>
    </div>
  
    <div id="studygroupinfo">
      <h2 id='description' class="description">Descrptiusgdbofs
        sdfsdsdsdnsd
      </h2>
      <h2 id="membercount">Team Members : {{ memberCount }} / {{ memberLimit }}</h2>
    </div>
  </template>
  
  <script>
  console.log("in App");
  export default {
    name: "TheStudyGroupPage",
    data() {
      return {
        memberCount : 3,
        memberLimit : 6,
      }
    },
  };
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 30px;
  }
  #nav {
    padding: 30px;
  }
  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }
  #nav a.router-link-exact-active {
    color: #0f56c7;
  }
  </style>
  