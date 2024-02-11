import cross from "../../icons/cross.png";
import pencil from "../../icons/pencil.png";
import check from "../../icons/check.png";

import "./ticket.css";
import Controller from "../controller";

export default class Ticket {
  constructor(data) {
    this.data = data;
  }

  drowTicket(data) {
    const ticket = document.createElement("ui");
    ticket.classList.add("ticket");
    ticket.id = data.id;

    const ticketCheck = document.createElement("div");
    ticketCheck.classList.add("ticket-circle");
    ticketCheck.classList.add("check");
    const ticketCheckImg = document.createElement("img");
    ticketCheckImg.classList.add("check-image");
    ticketCheckImg.src = check;
    ticketCheck.appendChild(ticketCheckImg);
    if (!data.status) {
      ticketCheckImg.style.display = "none";
    }

    const ticketRed = document.createElement("div");
    ticketRed.classList.add("ticket-circle");
    ticketRed.classList.add("redaction");
    const ticketRedImg = document.createElement("img");
    ticketRedImg.classList.add("redaction-image");
    ticketRedImg.src = pencil;
    ticketRed.appendChild(ticketRedImg);

    const ticketDel = document.createElement("div");
    ticketDel.classList.add("ticket-circle");
    ticketDel.classList.add("delete");
    const ticketDelImg = document.createElement("img");
    ticketDelImg.classList.add("delete-image");
    ticketDelImg.src = cross;
    ticketDel.appendChild(ticketDelImg);

    const ticketText = document.createElement("div");
    ticketText.classList.add("ticket-text");
    ticketText.textContent = data.name;

    const ticketDate = document.createElement("div");
    ticketDate.classList.add("ticket-date");
    ticketDate.textContent = data.created;

    const description = document.createElement("div");
    description.classList.add("description");

    ticket.appendChild(ticketCheck);
    ticket.appendChild(ticketText);
    ticket.appendChild(ticketDate);
    ticket.appendChild(ticketRed);
    ticket.appendChild(ticketDel);
    ticket.appendChild(description);

    return ticket;
  }

  deleteTicket(ticketId) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      console.log(xhr.response);
      new Controller().loadTickets();
    };
    xhr.open(
      "DELETE",
      `http://localhost:7070?method=deleteTicket&id=${ticketId}`
    );
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
  }

  redactionTicket(ticketId, form) {
    const body = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      form.remove();
      new Controller().loadTickets();
    };

    xhr.open("PUT", `http://localhost:7070?method=changeTicket&id=${ticketId}`);
    xhr.send(body);
  }

  changeStatusTicket(ticketId) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      console.log(xhr.response);
      new Controller().loadTickets();
    };

    xhr.open(
      "PUT",
      `http://localhost:7070?method=changeStatusTicket&id=${ticketId}`
    );
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
  }

  getTicketAll(ticketId) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      const tickets = document.querySelectorAll(".ticket");
      const ticketAll = JSON.parse(xhr.response);
      tickets.forEach((ticket) => {
        if (ticket.id == ticketAll.id) {
          ticket.querySelector(".description").textContent =
            ticketAll.description;
        }
      });
    };

    xhr.open("GET", `http://localhost:7070?method=ticketById&id=${ticketId}`);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
  }
}
