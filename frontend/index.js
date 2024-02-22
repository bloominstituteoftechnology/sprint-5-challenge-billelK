async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  const learnersPromise = await axios.get("http://localhost:3003/api/learners")
  const mentorsPromise = await axios.get("http://localhost:3003/api/mentors")
  
  Promise.all([learnersPromise, mentorsPromise])
    .then (res => {
      const infoP = document.querySelector(".info").textContent = "No learner is selected"

      let learnersArray = res[0].data
      let mentorsArray = res[1].data

      learnersArray.forEach(learnerObj => {
        let learnerMents = learnerObj.mentors
        for (let i = 0; i < learnerMents.length; i++) {
          let mentor = mentorsArray.find(mentor => mentor.id === learnerMents[i])
          learnerObj.mentors[i] =`${mentor.firstName} ${mentor.lastName}`
        }
      })
      
      learnersArray.forEach(learner => {
        learnerCardMaker(learner)
      })

      console.log(learnersArray)
    })
    .catch(error => console.log(error.message))

    function learnerCardMaker (learner) {
      const cardsDiv = document.querySelector(".cards")

        const card = document.createElement("div")
        card.className = "card"
        cardsDiv.appendChild(card)

          const fullName = document.createElement("h3")
          fullName.textContent = learner.fullName
          card.appendChild(fullName)

          const emailDiv = document.createElement("div")
          emailDiv.textContent = learner.email
          card.appendChild(emailDiv)

          const mentorsTitle = document.createElement("h4")
          mentorsTitle.className = "closed"
          mentorsTitle.innerHTML = `Mentors`
          card.appendChild(mentorsTitle)

          const mentorsList = document.createElement("ul")
          card.appendChild(mentorsList)

            learner.mentors.forEach(mentor => {
              const mentorFullname = document.createElement("li")
              mentorFullname.textContent = mentor
              mentorsList.appendChild(mentorFullname)
            })
      
      card.addEventListener("click", () => {
        let selectedCards = document.querySelectorAll(".selected")
        document.querySelector(".info").textContent = "No learner is selected".textContent = `The selected learner is ${learner.fullName}`

        card.classList.toggle("selected")
        
        selectedCards.forEach(card => {
          card.classList.remove("selected")
        })


      })

      mentorsTitle.addEventListener("click", () => {
        mentorsTitle.classList.toggle("open")
        document.querySelector(".card h4.closed ~ ul").style.display = "block"
      })
      // console.log(cardsDiv);
    }

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
