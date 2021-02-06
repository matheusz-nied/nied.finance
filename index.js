const Modal = {
    open(){
        document.querySelector
            ('.modal-overlay')
                .classList.add('active')
        
    },
    close(){
        document.querySelector
            ('.modal-overlay')
                .classList.remove('active')
    }
}

const Storage = {
    get(){
        return JSON.parse(localStorage.getItem("nied.finances:transactions")) || []
    },

    set(transactions) {
        localStorage.setItem("nied.finances:transactions", JSON.stringify(transactions))
    }
}

const Transaction = {
    all: Storage.get(),
    
    add(transaction){
        Transaction.all.push(transaction);
        App.reload()
    },

    remove(index){
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes(){
        //Somar as entradas
        let income = 0;
        Transaction.all.forEach(function (transaction) {
            if(transaction.amount > 0) {
                income += transaction.amount;
            }
        })
        return income;
    },
    expenses(){
        //somar as saidas
        let expense = 0;
        Transaction.all.forEach(function (transaction) {
            if(transaction.amount < 0) {
                expense += transaction.amount;
            }
        })

        return expense;
    },
    total(){
        // entradas - saidas
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {
    transactionContainer: document.querySelector('#tabela'),
    addTransactions(transaction, index) {
        // console.log(transaction);
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index;

        DOM.transactionContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction, index){
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            
            <td class="date">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
            <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="remover transação">
            </td>
              
        `;

        return html
    },
    updateBalance() {
        document
        .getElementById('incomeDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.incomes())

        document
        .getElementById('expenseDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.expenses())

        document
        .getElementById('totalDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.total())
    },
    clearTransactions() {
        DOM.transactionContainer.innerHTML = ""
    }
}

const Utils = {
    formatAmount(value){
        value = Number(value) * 100

        return value
    },

    formatDate(date){
        const splittedDate = date.split('-')
        
        return `${splittedDate[1]}/${splittedDate[2]}/${splittedDate[0]}`
    },

    formatCurrency(value){
        const signal = Number(value) < 0 ? '-' : '' 

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        
        return signal+ " " + value
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),
    getValues(){
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value

        }
    },

    formatData(){

    },

    validateFields(){
        const { description, amount, date } = Form.getValues()

        if(description.trim() === "" || amount.trim() === "" || date.trim() === "") {
            throw new Error("Por favor, preencha todos os campos");
        }
    },

    formatValues(){
        let { description, amount, date } = Form.getValues()

        amount =  Utils.formatAmount(amount)

        date = Utils.formatDate(date)

        return {
            description,
            amount,
            date
        }
        
    },
    clearFields(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.description.value = ""
    },
    saveTranslation(transaction) {
        Transaction.add(transaction)
    },
    submit(event) {
        event.preventDefault()

        try{
            Form.validateFields()
            //formatar os dados para salvar
            const transaction = Form.formatValues()
            //Salvar
            Form.saveTranslation(transaction)
            //apagar os dados do formulario
            Form.clearFields()
            //modal feche
            Modal.close()
            

         }catch (error) {
             alert(error.message)
         }

        //Form.formatData()

    }
}



const App = {
    init() {
        Storage.set(Transaction.all)
        
        Transaction.all.forEach((transaction, index) => {
            DOM.addTransactions(transaction, index)        
        })

        DOM.updateBalance()

        
    },
    reload() {
        DOM.clearTransactions()
        App.init()
    },
}


App.init()

//Transaction.remove(1)
// DOM.addTransactions({
//     id: 2,
//     description: 'Teste 1',
//     amount: 500000,
//     date: '28/01/2021'
// })
// DOM.addTransactions({
//     id: 2,
//     description: 'Teste 2',
//     amount: 500000,
//     date: '28/01/2021'
// })
// DOM.addTransactions({
//     id: 2,
//     description: 'Teste 3',
//     amount: 500000,
//     date: '28/01/2021'
// })