$(document).ready(function () {
  // check if car owner is logged in
  let isLoggedIn = localStorage.getItem("car-owner") ? true : false;

  if (isLoggedIn) {
    // append the dashboard link
    $("#nav-list").append(
      `<li class='nav-item'>
      <a class='nav-link' href="/dashboard">
      Dashboard
      </a>
       </li>`
    );
    // append the logout link
    $("#nav-list").append(
      `<li class='nav-item'>
       <a class='nav-link' href="/logout">
       Logout
       </a>
       </li>`
    );
  } else {
    // append the login link
    $("#nav-list").append(
      `
      <li class="nav-item"><a class="nav-link btn btn-danger" href="/login">Make your Orange traceable</a></li>
      `
    );
  }

  // working out the active links
  let links = document.querySelectorAll(".nav-link");
  let pathname = window.location.pathname;

  for (let i = 0; i < links.length; i++) {
    let link = links[i];
    let href = link.getAttribute("href");

    if (href === pathname) {
      link.parentElement.classList.add("active");
    }
  }
});
