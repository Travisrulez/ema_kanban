<template>
    <article class="modal" id="modal">
        <form @submit.prevent="apply" action="" class="redact">
            <button @submit.stop class="redact__button material-icons" onclick="PopUpHide()">clear
            </button>
            <label class="redact__label" for="task-description">Описание</label>
            <input class="redact__input" id="task-description" name="task-description" placeholder="Опсиание" required type="text">
            <label class="redact__label" for="task-status">Статус</label>
            <select class="redact__input" id="task-status" name="task-status">
                <option class="redact__input" value="board-1">План</option>
                <option class="redact__input" value="board-2">В работе</option>
                <option class="redact__input" value="board-3">Готово</option>
            </select>
            <label class="redact__label" for="in-charge">Сделал</label>
            <input class="redact__input" id="in-charge" name="in-charge" placeholder="Введите имя" type="text">
            <label class="redact__label" for="task-start">Начало</label>
            <input class="redact__input" id="task-start" name="task-start" type="datetime-local">
            <input class="redact__submit" type="submit" value="Сохранить"> <button @submit.stop class="redact__submit" onclick="PopUpHide()">Закрыть
            </button>
        </form>
    </article>
</template>

<script>
    import {eventBus} from "@/main";

    export default {
        name: "Redact",
        methods: {
            apply: function () {
                const board_id =  document.getElementsByClassName('modal')[0].id
                const card_id = board_id.slice(board_id.length - 1)

                console.log('apply', card_id, board_id)

                eventBus.$emit('applyChanges', card_id)
            }
        }
    }
</script>
