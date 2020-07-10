<template>
    <main>
        <article id="main">
            <Add/>

            <article class="kanban">
                <section class="board board_plan">
                    <h1 class="board__title">План: {{quantity.for_board_1}}</h1>
                    <Board class="tasks_plan" id="board-1">
                        <Card id="1" cardDescription="1 задача" executor="Рома"></Card>
                        <Card id="2" cardDescription="2 задача" executor="Рома"></Card>
                    </Board>
                </section>

                <section class="board board_in-work">
                    <h1 class="board__title">В работе: {{quantity.for_board_2}}</h1>
                    <Board class="tasks_plan" id="board-2">
                        <Card id="3" cardDescription="3 задача" executor="Рома"></Card>
                    </Board>
                </section>

                <section class="board board_ready">
                    <h1 class="board__title">Готово: {{quantity.for_board_3}}</h1>
                    <Board class="tasks_plan" id="board-3"></Board>
                </section>
            </article>
        </article>

        <Redact/>
    </main>
</template>

<script>
    import Board from "@/components/Board"
    import Card from "@/components/Card"
    import Add from "@/components/Card-add"
    import Redact from "@/components/Card-edit"
    import {eventBus} from "@/main"


    export default {
        name: 'Main',
        components: {
            Redact,
            Board,
            Card,
            Add
        },
        data: function () {
            return {
                quantity: {
                    for_board_1: 2,
                    for_board_2: 0,
                    for_board_3: 0,
                }
            };
        },
        created() {
            eventBus.$on('makeCount', () => {
                this.countAll()
            })
        },
        methods: {
            count: function (board_id) {
                return document.getElementById(board_id).children.length
            },
            countAll: function () {
                this.quantity.for_board_1 = this.count("board-1")
                this.quantity.for_board_2 = this.count("board-2")
                this.quantity.for_board_3 = this.count("board-3")
            }
        }
    }
</script>
