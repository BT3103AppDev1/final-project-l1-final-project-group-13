<template>
<main>
    <h1 class="title">About Us</h1>
    <div class="layout">
      <h3><strong>What is StudyHive</strong></h3>
StudyHive is a collaborative online platform designed to facilitate seamless communication and knowledge sharing among students. Our website aims to provide a comprehensive solution for students who are looking to form study groups, access study materials, and stay updated on group activities.
<br><br>
<h3><strong>Our Purpose</strong></h3>
At StudyHive, our primary goal is to create a supportive and interactive learning environment for students. We understand the challenges faced by students when it comes to forming study groups and accessing relevant study materials. Therefore, our website offers a range of features to address these challenges and enhance the overall learning experience.
<br><br>
<h3><strong>Key Features</strong></h3>
<p><strong>Study Group Creation:</strong> StudyHive allows users to easily create and join study groups, enabling collaboration and knowledge sharing among peers.</p>
<p><strong>Shared Repository:</strong> Users can access a shared repository of study materials, allowing them to benefit from each other's learning notes and resources.</p>
<p><strong></strong>User Guide: For users who may need assistance in navigating the website, we provide a comprehensive user guide to ensure a smooth user experience.</p>
<p><strong></strong>Notifications: StudyHive keeps users informed about updates on their study groups, including changes to group members, files, and events.</p>
<br><br>
<h3><strong>Our Team</strong></h3>
StudyHive is developed and maintained by a dedicated team of professionals who are passionate about education and technology. Our team consists of experienced developers, designers, and educators who work tirelessly to ensure that StudyHive meets the needs of students and provides a user-friendly platform for effective collaboration.
<br><br>
<h3><strong>Join StudyHive Today</strong></h3>
We invite you to join StudyHive and become part of a vibrant community of students who are committed to academic excellence. Whether you are looking to form study groups, access study materials, or simply connect with like-minded individuals, StudyHive is here to support your educational journey.
    </div>
    <br><br>
    <h2 class="sub-title">FAQ</h2>
    <div class="layout">


<div 
        class="accordion" 
        v-for="(item, index) in faqItems" 
        :key="index"
        :class="{ active: item.active }"
        @click="toggleAccordion(index)"
      >
        <div class="accordion__question">
          <p>{{ item.question }}</p>
        </div>
        <div class="accordion__answer" v-show="item.active">
          <p>{{ item.answer }}</p>
        </div>
      </div>
    </div>
    <br><br><br>
</main>
</template>

<script>
export default {
  data() {
    return {
      faqItems: [
        { 
          question: 'How can users access different pages on the website?',
          answer: 'Users can easily access different pages on the website through the sidebar menu available on every page. This sidebar menu provides a convenient and user-friendly way to navigate through the website.',
          active: false
        },
        { 
          question: 'What are the privacy and security measures in place for user data?',
          answer: 'Only authorized users have access to their own user data, and access is denied for users attempting to log in with incorrect credentials. The management of user data complies with privacy regulations such as the General Data Protection Regulation (GDPR). Additionally, fine-grained access control rules ensure that specific data is only accessible by authorized users.',
          active: false
        },
        { 
          question: 'How is the information for users and study groups kept up-to-date?',
          answer: 'The information for users and study groups is synced and correctly reflects the current status. This ensures that users have the most accurate and up-to-date information about themselves and their study groups.',
          active: false
        },
        { 
          question: 'Can the web application handle multiple users simultaneously?',
          answer: 'Yes, the web application is designed to handle multiple users using it concurrently. This ensures that the application can accommodate a large number of users without any performance issues.',
          active: false
        },
        { 
          question: 'Is the web application compatible with different browsers and devices?',
          answer: 'Yes, the web application is designed to launch on different types of browsers and devices without affecting performance. This ensures that users can access the application seamlessly regardless of the browser or device they are using.',
          active: false
        }
      ]
    };
  },
  methods: {
    toggleAccordion(index) {
      this.faqItems[index].active = !this.faqItems[index].active;
    }
  }
};
</script>

<style>
.layout {
    display: flex;        /* Establishes a flex container */
    flex-direction: column;/* Stacks flex items vertically */
    justify-content: center;/* Centers flex items along the main axis */
    align-items: center;  /* Centers flex items along the cross axis */
    width: 100%;
    background: #FFF;
    border-radius: 20px;
    padding: 20px;       /* Add some padding */
  }
  
  /* If .layout is not the direct parent of the items you want to center,
     you may need to apply display: flex; justify-content: center; and
     align-items: center; to the direct parent elements as well. */
  
  .title {
    text-align: left;
    width: 100%;        /* Full width to center the text block */
  }

  .sub-title {
    text-align: left;
    width: 100%;        /* Full width to center the text block */
  }
  
  .accordion {
    width: 80%;          /* Set a width */
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    background: #F5F5F5;
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: add a subtle shadow */
  }
  
  .accordion__question p {
    text-align: center; /* Center the text inside each paragraph */
    font-size: large;
  }
  
  .accordion__answer p {
    text-align: center;
    margin: 5px;
    padding: 10px;
    font-size: medium;
    color: rgb(0, 0, 0);
    background: #FFF;
    border-radius: 10px;
  }
  
  .accordion:hover {
    cursor: pointer;
  }
</style>
  
