<template>
    <div :id="id" @dragover.stop @dragstart="dragStart" class="task-card" draggable="true">
        <h1 class="task-card__title">Задача №{{id}}</h1>
        <p class="task-card__description">{{computedCardDescription}}</p>
        <h2 class="task-card__header">Начало</h2>
        <span class="task-card__info">{{computedStartTime}}</span>
        <h2 class="task-card__header"></h2>
        <span class="task-card__info">{{computedWastedTime}}</span>
        <span class="task-card__info" style="display: none">{{popUpFinishTime}}</span>
        <span class="task-card__info" style="display: none">{{popUpStartDate}}</span>
        <h2 class="task-card__header">Сделал</h2>
        <span class="task-card__info">{{computedExecutor}}</span>
        <div class="control-panel">
            <button class="control-panel__button"
                    onclick="PopUpShow(this.parentNode.parentNode.parentNode.id, this.parentNode.parentNode.id)">
              Редакт
            </button>
            <button class="control-panel__button" v-on:click="changeBoard(id)">Готово</button>
            <button class="control-panel__button" v-on:click="removeCard(id)">Удалить</button>
        </div>
    </div>
</template>

<script>
    import Card from "@/components/Card"
    import {eventBus} from "@/main"

    export default {
        name: "Card",
        props: ['id', 'cardDescription', 'executor'],
        data: function () {
            return {
                computedCardDescription: this.cardDescription,
                computedStartTime: '',
                popUpFinishTime: '',
                popUpStartDate: '',
                computedWastedTime: '',
                computedExecutor: this.executor,
            };
        },
        created() {
            eventBus.$on('needTime', () => {
                console.log('id', this.id)
                const card = document.getElementById(this.id)
                console.log('card', card)
                if (card !== null) {
                    const board_id = card.parentNode.id
                const board_num = board_id.slice(board_id.length - 1)

                if ((board_num === '2') && (!this.computedStartTime)) {
                    this.computedStartTime = Math.floor(Date.now() / 1000)
                    const today = new Date()

                    this.popUpStartDate = this.formatTime(today)
                    this.computedStartTime = this.formatTimeReadable(this.formatTime(today))

                }
                }
                
            })
            eventBus.$on('applyChanges', function (card_id) {
                const card = document.getElementById(card_id)
                const card_elements = card.children
                const card_description = document.getElementById('task-description').value
                const start_time = document.getElementById('task-start').value
                const executor = document.getElementById('in-charge').value
                const status = document.getElementById('task-status').value

                if (card_description)
                    card_elements[1].innerHTML = card_description
                if (start_time)
                    card_elements[3].innerHTML = Card.methods.formatTimeReadable(start_time)
                if (executor)
                    card_elements[9].innerHTML = executor
                if (card.parentNode.id !== status) {
                    document.getElementById(status).appendChild(card)

                    eventBus.$emit('needTime')
                    eventBus.$emit('backToPlan')
                    eventBus.$emit('makeCount')


                }
            })
        },
        methods: {
            dragStart: event => {
                const target = event.target

                event.dataTransfer.setData('card_id', target.id)
            },
            changeBoard: function (card_id) {
                const card = document.getElementById(card_id)
                const board_id = card.parentNode.id
                const board_num = board_id.slice(board_id.length - 1)

                document.getElementById(board_id.slice(0, -1) + (parseInt(board_num) + 1)).appendChild(card)

                eventBus.$emit('needTime')
                eventBus.$emit('backToPlan')
                eventBus.$emit('makeCount')
            },
            removeCard: function (card_id) {
                document.getElementById(card_id).remove()

                eventBus.$emit('makeCount')
            },
            formatTime: function (dateStamp) {
                let minutes = dateStamp.getMinutes()
                let hours = dateStamp.getHours()
                let day = dateStamp.getDate()
                let month = dateStamp.getMonth() + 1
                const year = dateStamp.getFullYear()

                if (minutes < 10) {
                    minutes = '0' + minutes
                }

                if (hours < 10) {
                    hours = '0' + hours
                }

                if (day < 10) {
                    day = '0' + day
                }

                if (month < 10) {
                    month = '0' + month
                }

                return year + '-' + month + '-' + day + 'T' + hours + ':' + minutes
            },
            formatTimeReadable(dateString) {
                return dateString.replace('-', '.').replace('-', '.').replace('T', ', ')
            }
        }
    }
</script>
