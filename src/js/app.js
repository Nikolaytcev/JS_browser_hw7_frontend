import Controller from "./controller";

document.addEventListener("DOMContentLoaded", () => {
  const tickets = document.querySelector(".tickets");
  const addTicket = document.querySelector(".add-ticket");
  const controller = new Controller(tickets);
  controller.loadTickets();

  addTicket.addEventListener("click", controller.addTicket);
  tickets.addEventListener("click", controller.manageTickets);
});
