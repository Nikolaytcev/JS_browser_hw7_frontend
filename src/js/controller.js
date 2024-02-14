import Ticket from "./Ticket/ticket";
import Form from "./Dialog/form";

export default class Controller {
    constructor(container) {
        this.container = container;
    };

    loadTickets() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const data = JSON.parse(xhr.responseText);
                const tickets = document.querySelector('.tickets');
                tickets.querySelectorAll('.ticket').forEach(ticket => ticket.remove());
                data.forEach((ticket) => {
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
    };

    addTicket = () => {
        let form = document.querySelector('.form');
        if (form != null) {
            form.remove();
            return;
            };
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
            };
        const dialog = new Form();
        form = dialog.drowForm('Изменить тикет');
        document.body.appendChild(form);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (e.submitter.classList.contains('cancel-btn')) {
                form.remove();
                return;
            };
            if (e.submitter.classList.contains('create-btn')) {
                const formEl = e.target;
                const message = formEl.querySelector('.shot-description').value;
                if (message == '') {
                    alert("Поле 'Краткое описание' не заполнено");
                }
                else {
                    new Ticket().redactionTicket(ticketId, formEl);
                };
            };
        });
    };

    deleteDiolog(ticketId, ticket) {
        let dialogEl = document.querySelector('.dialog-delete');
        if (dialogEl != null) {
            dialogEl.remove();
            return;
            };
        const dialog = new Form();
        dialogEl = dialog.drowDelteForm();
        document.body.appendChild(dialogEl);
        
        dialogEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('cancel-btn')) {
            dialogEl.remove();
            return;
        };
        if (e.target.classlist.contains('create-btn')) {
            dialogEl.remove();
            ticket.deleteTicket(ticketId);
        };
    });
    };

    manageTickets = (e) => {
        const ticketEl = e.target.closest('.ticket');
        const ticket = new Ticket();
        if (e.target.classList.contains('check-image') || e.target.classList.contains('check')) {
            ticket.changeStatusTicket(ticketEl.id);
        }
        else if (e.target.classList.contains('delete-image') || e.target.classList.contains('delete')) {
            this.deleteDiolog(ticketEl.id, ticket)
        }
        else if (e.target.classList.contains('redaction-image') || e.target.classList.contains('redaction')) {
            this.redactionTicketForm(ticketEl.id);
        }
        else {
            const text = ticketEl.querySelector('.description');
            if (text.textContent == '') {
                text.style.display = 'block';
                ticket.getTicketAll(ticketEl.id);
            }
            else {
                text.textContent = '';
                text.style.display = 'none';
            };
        };
    }
}