/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/icons/cross.png
const cross_namespaceObject = __webpack_require__.p + "71f126ca324c5f02a33e.png";
;// CONCATENATED MODULE: ./src/icons/pencil.png
const pencil_namespaceObject = __webpack_require__.p + "48a509a89a20feb467d3.png";
;// CONCATENATED MODULE: ./src/icons/check.png
const check_namespaceObject = __webpack_require__.p + "b794e77d7945da4a05aa.png";
;// CONCATENATED MODULE: ./src/js/Ticket/ticket.js





class Ticket {
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
    ticketCheckImg.src = check_namespaceObject;
    ticketCheck.appendChild(ticketCheckImg);
    if (!data.status) {
      ticketCheckImg.style.display = "none";
    }
    const ticketRed = document.createElement("div");
    ticketRed.classList.add("ticket-circle");
    ticketRed.classList.add("redaction");
    const ticketRedImg = document.createElement("img");
    ticketRedImg.classList.add("redaction-image");
    ticketRedImg.src = pencil_namespaceObject;
    ticketRed.appendChild(ticketRedImg);
    const ticketDel = document.createElement("div");
    ticketDel.classList.add("ticket-circle");
    ticketDel.classList.add("delete");
    const ticketDelImg = document.createElement("img");
    ticketDelImg.classList.add("delete-image");
    ticketDelImg.src = cross_namespaceObject;
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
    xhr.open("DELETE", `http://localhost:7070?method=deleteTicket&id=${ticketId}`);
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
    xhr.open("PUT", `http://localhost:7070?method=changeStatusTicket&id=${ticketId}`);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
  }
  getTicketAll(ticketId) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      const tickets = document.querySelectorAll(".ticket");
      const ticketAll = JSON.parse(xhr.response);
      tickets.forEach(ticket => {
        if (ticket.id == ticketAll.id) {
          const form = document.querySelector('.form');
          if (form != null) {
            form.querySelector('.shot-description').value = ticketAll.name;
            form.querySelector('.detailed-description').value = ticketAll.description;
          }
          ticket.querySelector(".description").textContent = ticketAll.description;
        }
      });
    };
    xhr.open("GET", `http://localhost:7070?method=ticketById&id=${ticketId}`);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
  }
}
;// CONCATENATED MODULE: ./src/js/Dialog/form.js


class Form {
  constructor() {
    this.form;
  }
  drowForm(title) {
    const form = document.createElement('form');
    form.classList.add('form');
    form.method = 'POST';
    const formTitle = document.createElement('h3');
    formTitle.classList.add('form-title');
    formTitle.textContent = title;
    const shotTitle = document.createElement('span');
    shotTitle.classList.add('short-title');
    shotTitle.textContent = 'Краткое описание';
    const shotDesc = document.createElement('input');
    shotDesc.classList.add('shot-description');
    shotDesc.name = 'name';
    const detailedTitle = document.createElement('span');
    detailedTitle.classList.add('detailed-title');
    detailedTitle.textContent = 'Подробное описание';
    const detailedDesc = document.createElement('textarea');
    detailedDesc.classList.add('detailed-description');
    detailedDesc.name = 'description';
    const cancel = document.createElement('button');
    cancel.classList.add('cancel-btn');
    cancel.textContent = 'Отмена';
    const create = document.createElement('button');
    create.classList.add('create-btn');
    create.textContent = 'Ok';
    form.appendChild(formTitle);
    form.appendChild(shotTitle);
    form.appendChild(shotDesc);
    form.appendChild(detailedTitle);
    form.appendChild(detailedDesc);
    form.appendChild(cancel);
    form.appendChild(create);
    this.form = form;
    return form;
  }
  drowDelteForm() {
    const dialog = document.createElement('div');
    dialog.classList.add('dialog-delete');
    const dialogTitle = document.createElement('h3');
    dialogTitle.classList.add('form-title');
    dialogTitle.textContent = 'Удалить тикет';
    const dialogText = document.createElement('span');
    dialogText.classList.add('dialog-text');
    dialogText.textContent = 'Вы уверены, что хотите удалить тикет? Это действие необратимо.';
    const cancel = document.createElement('button');
    cancel.classList.add('cancel-btn');
    cancel.textContent = 'Отмена';
    const create = document.createElement('button');
    create.classList.add('create-btn');
    create.textContent = 'Ok';
    dialog.appendChild(dialogTitle);
    dialog.appendChild(dialogText);
    dialog.appendChild(cancel);
    dialog.appendChild(create);
    return dialog;
  }
  sendAndDeleteForm = e => {
    e.preventDefault();
    if (e.submitter.classList.contains('cancel-btn')) {
      this.form.remove();
      return;
    }
    ;
    if (e.submitter.classList.contains('create-btn')) {
      const form = e.target;
      const message = form.querySelector('.shot-description').value;
      if (message == '') {
        alert("Поле 'Краткое описание' не заполнено");
      } else {
        const body = new FormData(form);
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState !== 4) return;
          form.remove();
          new Controller().loadTickets();
        };
        xhr.open('POST', 'http://localhost:7070?method=createTicket');
        xhr.send(body);
      }
      ;
    }
    ;
  };
}
;// CONCATENATED MODULE: ./src/js/controller.js


class Controller {
  constructor(container) {
    this.container = container;
  }
  loadTickets() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          const tickets = document.querySelector('.tickets');
          tickets.querySelectorAll('.ticket').forEach(ticket => ticket.remove());
          data.forEach(ticket => {
            tickets.appendChild(new Ticket().drowTicket(ticket));
          });
        } catch (e) {
          console.error(e);
        }
      }
    });
    xhr.open('GET', 'http://localhost:7070?method=allTickets');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
  }
  addTicket = () => {
    let form = document.querySelector('.form');
    if (form != null) {
      form.remove();
      return;
    }
    ;
    const dialog = new Form();
    form = dialog.drowForm('Добавить тикет');
    document.body.appendChild(form);
    form.addEventListener('submit', dialog.sendAndDeleteForm);
  };
  redactionTicketForm(ticketId) {
    let form = document.querySelector('.form');
    if (form != null) {
      form.remove();
      return;
    }
    ;
    const dialog = new Form();
    form = dialog.drowForm('Изменить тикет');
    document.body.appendChild(form);
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (e.submitter.classList.contains('cancel-btn')) {
        form.remove();
        return;
      }
      ;
      if (e.submitter.classList.contains('create-btn')) {
        const formEl = e.target;
        const message = formEl.querySelector('.shot-description').value;
        if (message == '') {
          alert("Поле 'Краткое описание' не заполнено");
        } else {
          new Ticket().redactionTicket(ticketId, formEl);
        }
        ;
      }
      ;
    });
  }
  deleteDiolog(ticketId, ticket) {
    let dialogEl = document.querySelector('.dialog-delete');
    if (dialogEl != null) {
      dialogEl.remove();
      return;
    }
    ;
    const dialog = new Form();
    dialogEl = dialog.drowDelteForm();
    document.body.appendChild(dialogEl);
    dialogEl.addEventListener('click', e => {
      if (e.target.classList.contains('cancel-btn')) {
        dialogEl.remove();
        return;
      }
      ;
      if (e.target.classList.contains('create-btn')) {
        dialogEl.remove();
        ticket.deleteTicket(ticketId);
      }
      ;
    });
  }
  manageTickets = e => {
    const ticketEl = e.target.closest('.ticket');
    const ticket = new Ticket();
    if (e.target.classList.contains('check-image') || e.target.classList.contains('check')) {
      ticket.changeStatusTicket(ticketEl.id);
    } else if (e.target.classList.contains('delete-image') || e.target.classList.contains('delete')) {
      this.deleteDiolog(ticketEl.id, ticket);
    } else if (e.target.classList.contains('redaction-image') || e.target.classList.contains('redaction')) {
      ticket.getTicketAll(ticketEl.id);
      this.redactionTicketForm(ticketEl.id);
    } else {
      const text = ticketEl.querySelector('.description');
      if (text.textContent == '') {
        text.style.display = 'block';
        ticket.getTicketAll(ticketEl.id);
      } else {
        text.textContent = '';
        text.style.display = 'none';
      }
      ;
    }
    ;
  };
}
;// CONCATENATED MODULE: ./src/js/app.js

document.addEventListener("DOMContentLoaded", () => {
  const tickets = document.querySelector(".tickets");
  const addTicket = document.querySelector(".add-ticket");
  const controller = new Controller(tickets);
  controller.loadTickets();
  addTicket.addEventListener("click", controller.addTicket);
  tickets.addEventListener("click", controller.manageTickets);
});
;// CONCATENATED MODULE: ./src/index.js



// TODO: write your code in app.js
/******/ })()
;