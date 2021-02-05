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



const Transaction = {
    all: [
        {        
            description: 'Luz',
            amount: -50000,
            date: '23/01/2021'
        },
        {       
            description: 'Website',
            amount: 500000,
            date: '28/01/2021'
        },
        {
            description: 'Internet',
            amount: -20000,
            date: '15/01/2021'
        },
        {
            description: 'App',
            amount: 200000,
            date: '15/01/2021'
        },
        {
            description: 'Carro',
            amount: -1000000,
            date: '15/01/2021'
        },
    ],
    
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
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        
        DOM.transactionContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction){
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            
            <td class="date">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
            <img src="./assets/minus.svg" alt="remover transação">
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

    },
    submit(event) {
        event.preventDefault()

        Form.validateFields()

        //Form.formatData()

    }
}

const App = {
    init() {
        Transaction.all.forEach(transaction => {
            DOM.addTransactions(transaction)        
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