AOS.init();
// You can also pass an optional settings object
// below listed default settings
AOS.init({
  
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 700, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});
function sendEmail(){
  Email.send({
    SecureToken : "44366c48-0de1-46ff-9c49-f76031abc60a",
    To : 'ahm.say14@gmail.com',
    From : document.getElementById("Email").value,
    Subject : "Message form Portfolio",
    Body : document.getElementById("message").value
}).then(
  message => alert("Message sent successfully !")
)};
