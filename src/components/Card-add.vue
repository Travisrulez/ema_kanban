<template>
    <form @submit.prevent="addCard" action="" class="new-task">
        <label class="new-task__label"
               for="new-task-description">
            Новая задача
        </label>
        <input class="new-task__input" id="new-task-description" name="new-task-description" placeholder="Задача" required type="text" v-model="newCardDescription">
        <input class="new-task__submit material-icons" type="submit" value="group_add">
    </form>
</template>

<script>
    import Card from "@/components/Card"
    import Vue from 'vue'
    import {eventBus} from "@/main"

    let made_cards = 2

    export default {
        name: "Add",
        data: function () {
            return {
                newCardDescription: ""
            }
        },
        methods: {
            addCard: function () {
                made_cards++

                const componentClass = Vue.extend(Card)
                const instance = new componentClass({
                    propsData: {
                        id: made_cards.toString(),
                        cardDescription: this.newCardDescription,
                        executor: 'Рома'
                    }
                })

                instance.$mount()
                document.getElementById('board-1').appendChild(instance.$el)
                this.newCardDescription = ""

                eventBus.$emit('makeCount')
            }
        }
    }
</script>
