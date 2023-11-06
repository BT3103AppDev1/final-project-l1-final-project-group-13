<template>
    <div id="groupMember">
        <img src="src/assets/profileIcon.png" alt="groupMemberPic" width="50" height="50" id="pic">
        <h2 id="name">{{ name }}</h2>
        <div id="contactDetails">
            <h3>{{ email }}</h3>
            <h3>{{ telegramHandle }}</h3>
        </div>
        <div id="details">
            <h3>{{ major }}</h3>
            <h3>{{ courses }}</h3>
            <h3>{{ timing }}</h3>
            <h3>{{ location }}</h3>
        </div>
    </div>
</template>
  
  <script>
  console.log("in App");
  export default {
    name: "TheHomePage",
    data() {
      return {
        name : 'Jason',
        email : 'myEmail@gmail.com',
        telegramHandle : '@helloWorld',
        courses : 'BT3103',
        major : 'Business Analytics',
        timing : 'Night, Noon',
        location : 'On campus, Online'
      }
    },
    methods: {
      test() {
        console.log('Hello');
      }
    }
  };
  </script>
  
  <style>
  #groupMember {
    width: 421px;
    height: 327px;
    flex-shrink: 0;
    border-radius: 20px;
    background: var(--lighter-yellow, #FFDE59);
  }
  #pic {
width: 152px;
height: 128px;
flex-shrink: 0;
mix-blend-mode: multiply;
  }
  </style>
  