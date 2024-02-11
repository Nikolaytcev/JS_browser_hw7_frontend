import './form.css';

import Controller from '../controller';

export default class Form {
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
        cancel.textContent = 'Отмена'

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
    };

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
        cancel.textContent = 'Отмена'

        const create = document.createElement('button');
        create.classList.add('create-btn');
        create.textContent = 'Ok';

        dialog.appendChild(dialogTitle);
        dialog.appendChild(dialogText);
        dialog.appendChild(cancel);
        dialog.appendChild(create);

        return dialog;
    };

    sendAndDeleteForm = (e) => {
        e.preventDefault();
        if (e.submitter.classList.contains('cancel-btn')) {
            this.form.remove();
            return;
        };
        if (e.submitter.classList.contains('create-btn')) {
            const form = e.target;
            const message = form.querySelector('.shot-description').value;
            if (message == '') {
                alert("Поле 'Краткое описание' не заполнено");
            }
            else {
                const body = new FormData(form);
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState !== 4) return;
                    form.remove();
                    new Controller().loadTickets();
                  };

                xhr.open('POST', 'http://localhost:7070?method=createTicket');
                xhr.send(body);
            };
        };
    };
}