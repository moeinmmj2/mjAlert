async function createAlertBox() {
     let alertBox = document.querySelector('.alerts-box')
     if (!alertBox) {
          alertBox = document.createElement('div')
          document.body.appendChild(alertBox)
     }

     alertBox.classList
          .add(
               'alerts-box',
               mjAlert.defaults.dir == "ltr" ? "left-dir" : "right-dir",
               mjAlert.defaults.position == "bottom" ? "mj-pos-bottom" : "mj-pos-top",
               "mj-offsetY-" + mjAlert.defaults.offsetY,
               "mj-offsetX-" + mjAlert.defaults.offsetX,
          );

     return alertBox
}
async function createAlertItem({ type, title, message }) {
     let newAlert = document.createElement('div')
     newAlert.classList
          .add("notif-alert", type, "fade")

     let idAlert = createRandomId()
     newAlert.id = idAlert

     let alertItem = `
          <div class="notif-alert-items">
               <div class="notif-alert-text">
                    <div class="notif-alert-text-header">
                         <div class="notif-alert-icon">
                              <svg class="icon-success" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                   <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                   stroke="#35CB98" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                   <path d="M7.75 11.9999L10.58 14.8299L16.25 9.16992" stroke="#35CB98" stroke-width="1.5"
                                   stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                              <svg class="icon-error" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                   <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                   stroke="#FF6464" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                   <path d="M9.16992 14.8299L14.8299 9.16992" stroke="#FF6464" stroke-width="1.5"
                                   stroke-linecap="round" stroke-linejoin="round" />
                                   <path d="M14.8299 14.8299L9.16992 9.16992" stroke="#FF6464" stroke-width="1.5"
                                   stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                              <svg class="icon-warning bi bi-exclamation-circle-fill" xmlns="http://www.w3.org/2000/svg"
                                   width="16" height="16" fill="#ffc107" viewBox="0 0 16 16">
                                   <path
                                   d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z">
                                   </path>
                              </svg>
                              <svg class="icon-primary bi bi-exclamation-circle-fill" xmlns="http://www.w3.org/2000/svg"
                                   width="16" height="16" fill="#61AFFD" viewBox="0 0 16 16">
                                   <path
                                   d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z">
                                   </path>
                              </svg>
                         </div>
                         <p class="notif-alert-title">${title}</p>
                    </div>
                    <p class="notif-alert-message m-0 fs-14 text-gray">
                         ${message}
                    </p>
               </div>
               <div class="notif-alert-time-line">

               </div>
               <button class="notif-alert-close" onclick="removeAlert('${idAlert}')">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M5.17188 10.8286L10.8287 5.17176" stroke="#CAD4E4" stroke-width="1.5" stroke-linecap="round"
                              stroke-linejoin="round" />
                         <path d="M10.8287 10.8282L5.17188 5.17139" stroke="#CAD4E4" stroke-width="1.5" stroke-linecap="round"
                              stroke-linejoin="round" />
                    </svg>
               </button>
          </div>
     `
     newAlert.innerHTML = alertItem

     return newAlert
}

const mjAlert = async ({ type, title, message, time }) => {
     let alertBox = await createAlertBox()
     let alert = await createAlertItem({ type, title, message })
     alertBox.insertAdjacentElement("afterbegin", alert)
     setTimeout(() => {
          alert.classList.add('show')
     }, 50);
     setTimeout(() => {
          removeAlert(alert.id)
     }, time);
}

mjAlert.defaults = {
     dir: "rtl",        /* rtl or ltr */
     position: "top",  /* top or bottom */
     offsetY: 100,      /* top margin in position top and bottom margin in position bottom 0% to 200% (25% up) */
     offsetX: 100,     /* right margin in dir rtl and left margin in dir ltr 0% to 200% (25% up) */
     defaultX: 10,
}
mjAlert.option = ({ dir, position, offsetY , offsetX , defaultX  }) => {
     mjAlert.defaults={
          dir : dir || mjAlert.defaults.dir,
          position : position ||  mjAlert.defaults.position,
          offsetY : offsetY || mjAlert.defaults.offsetY,
          offsetX : offsetX || mjAlert.defaults.offsetX
     }
          
}
async function removeAlert(alertId) {
     let alertBox = await createAlertBox()
     let alert = document.getElementById(alertId)
     alert.classList.add('removed')
     setTimeout(() => {
          alert.remove()
          if (alertBox.children.length < 1) {
               alertBox.remove()
          }
     }, 500);
}

function createRandomId() {
     let alertId = "alert" + Math.floor(Math.random() * 13 * 1000)
     return alertId
}